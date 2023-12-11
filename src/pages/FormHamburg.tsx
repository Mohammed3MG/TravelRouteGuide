import { Card } from "react-bootstrap";
import MapWrapperHamburg from "../components/map/WrapperHamburg";
import AddressTable from "../components/address/AddressTable";

import port from "../assets/img/port.webp"; 
import ims from "../assets/img/ims.webp"; 
import reepa from "../assets/img/reeperbahn.webp"; 
import church from "../assets/img/church.webp"; 


const FormHamburg = () => {
  return (
    <section>
      <h2 className="text-center">Choose your addresses</h2>
      <Card>
        <Card.Header>Pick your addresses</Card.Header>
        <Card.Body>
          <div className="row">
            <div className="col-md-12">
              <p>
                Use the search box or browse in the map, then click your
                location to save it.
              </p>
            </div>
            <div className="col-md-6 mb-3">
              <MapWrapperHamburg />
            </div>
            <div className="col-md-6">
              <AddressTable mapPage={true} />
            </div>

            <div className="col-md-6">
              <h4>Places to visit in Hamburg</h4>

              <div className="row">
              <div className="col-md-6">
              <Card>
              <Card.Img variant="top" src={church} />
              <Card.Body>
              <Card.Title>St. Michael's Church</Card.Title>
              <Card.Text style={{textAlign: 'justify', fontSize:12}}>
              It's built in the 1750's in the Baroque style. Its viewing platforms in the 132-meter high tower offer an impeccable view of the city and the port.
              </Card.Text>
              </Card.Body>
              </Card>
              </div>

              <div className="col-md-6">
              <Card>
              <Card.Img variant="top" src={port} />
              <Card.Body>
              <Card.Title>The Port Of Hamburg</Card.Title>
              <Card.Text style={{textAlign: 'justify', fontSize:12}}>
              The Port of Hamburg, which is amongst the top places to see in the city is what is Hamburg famous for. It's attraction which gave the city its famous title of Gateway to Germany.
              </Card.Text>
              </Card.Body>
              </Card>
                </div>
                

              <div className="col-md-6">
              <Card style={{'marginTop': '15px' }}>
              <Card.Img variant="top" src={reepa} />
              <Card.Body>
              <Card.Title>The Reeperbahn</Card.Title>
              <Card.Text style={{textAlign: 'justify', fontSize:12}}>
              This place is the city’s number one entertainment district. It is home to various dance bars, a theatre, nightclubs and student clubs, all of which are lined up within 950 meters.
              </Card.Text>
              </Card.Body>
              </Card>
                </div>
                
                <div className="col-md-6">
              <Card style={{'marginTop': '15px' }}>
              <Card.Img variant="top" src={ims} />
              <Card.Body>
              <Card.Title>International Maritime Museum</Card.Title>
              <Card.Text style={{textAlign: 'justify', fontSize:12}}>
                This is the place to be. Located in a red brick building, this place exhibits more than 3,000 years of human connection to water.
                You can always stop by here for making your experience more illuminating and enlightening.
              </Card.Text>
              </Card.Body>
              </Card>
              </div>
          
            </div>
            </div>

          </div>
        </Card.Body>
      </Card>
    </section>
  );
};

export default FormHamburg;
