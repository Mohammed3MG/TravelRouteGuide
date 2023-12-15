import { Fragment, useCallback, useEffect, useState } from "react";
import { GoogleMap } from "@react-google-maps/api"; 
import IAddress from "../../types/IAddress";
import MapHelperHamburg from "../../helpers/MapHelperHamburg";
import { v4 as uuidV4 } from "uuid";
import Search from "./Search";
import Markers from "./Markers";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addAddress } from "../../store/addressSlice";
import Locate from "./Locate";
import TextHelper from "../../helpers/TextHelper";

interface Props {
  onShowAlert: (style: string, text: string) => void;
}

const MapHamburg = (props: Props) => {
  //DISPATCH REDUX ACTION
  const dispatch = useAppDispatch();

  //LOAD ADDRESSESS
  const addressState = useAppSelector((state) => state.address);

  //MAP LOAD
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const mapLoadHandler = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  //MAP UNMOUNT
  const mapUnmountHandler = useCallback(() => {
    setMap(null);
  }, []);

  //MAP PAN TO
  const mapPanToAddressHandler = useCallback(
    (address: IAddress) => {
      if (map) {
        MapHelperHamburg.mapPanToAddress(map, address);
      }
    },
    [map]
  );

  //SETS MAP CENTER
  const [mapCenter, setMapCenter] = useState(MapHelperHamburg.center);
  useEffect(() => {
    const addresses = addressState.addresses;
    if (addresses.length > 0) {
      const lastAddress = addresses[addressState.selected];
      setMapCenter({ lat: lastAddress.lat, lng: lastAddress.lng });
      mapPanToAddressHandler(lastAddress);
    }
  }, [addressState, mapPanToAddressHandler]);

  //GETS PROPS
  const { onShowAlert } = props;
  
  //MAP CLICK
  const mapClickHandler = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const id = uuidV4();
        const address: IAddress = {
          id: id,
          address: id,
          clicked: true,
          lat: event.latLng?.lat(),
          lng: event.latLng?.lng(),
        };
        //Adds address to addresses list
        dispatch(addAddress(address));
        //Center in click
        mapPanToAddressHandler(address);
        
        //Show success
        const addressName = `Address ${TextHelper.getLetter(addressState.count)}`;
        onShowAlert("success", `${addressName} was added successfully.`);
      }
    },
    [dispatch, mapPanToAddressHandler, onShowAlert, addressState.count]
  );

  return (
    <Fragment>
      {/* <h1 className={classes.mapTitle}>
        Distance Calculator
        <span role="img" aria-label="map">
          🗺️
        </span>
      </h1> */}
      <GoogleMap
        mapContainerStyle={MapHelperHamburg.mapContainerStyle}
        zoom={MapHelperHamburg.initialMapZoomLevel}
        center={mapCenter}
        options={MapHelperHamburg.options}
        onLoad={mapLoadHandler}
        onUnmount={mapUnmountHandler}
        onClick={mapClickHandler}
      >
        <Search onSelectPlace={mapPanToAddressHandler} onShowAlert={props.onShowAlert}/>
        <Locate onLocate={mapPanToAddressHandler} onShowAlert={props.onShowAlert}/>
        <Markers />
      </GoogleMap>
    </Fragment>
  );
};

export default MapHamburg;
