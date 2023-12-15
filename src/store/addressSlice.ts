import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import IAddress from "../types/IAddress";

// Define the structure of the AddressState
interface AddressState {
  addresses: IAddress[];
  selected: number;
  count: number;
}

// Function to load addresses from local storage
const loadFromLocalStorage = () => {
  try {
    const serializedStore = window.localStorage.getItem("address");
    if (serializedStore === null) return [];
    const data = JSON.parse(serializedStore);
    return data;
  } catch (e) {
    console.log("Error loading from local storage:", e);
    return [];
  }
};

// Function to get the length of addresses from local storage
const getLocalStorageLength = () => {
  const addresses = loadFromLocalStorage();
  return addresses.length;
};

// Initial state for the address slice
const initialState: AddressState = {
  addresses: loadFromLocalStorage(),
  selected: 0,
  count: getLocalStorageLength(),
};

// Create a slice for the address state
export const addressSlice = createSlice({
  name: "address",
  initialState: initialState,
  reducers: {
    // Add address
    addAddress: (state, action: PayloadAction<IAddress>) => {
      // Function to check if an address is already in the array
      const sameAddress = (address1: IAddress, address2: IAddress) => {
        if (address1.address === address2.address) return true;
        if (address1.lat === address2.lat) return true;
        if (address1.lng === address2.lng) return true;
        return false;
      };
      
      // Check if the address is not already in the array
      const notInArray =
        state.addresses.find((address) =>
          sameAddress(action.payload, address)
        ) === undefined;

      // If the address is not in the array
      if (notInArray) {
        // Update count
        state.count += 1;
        // Add to array
        state.addresses = state.addresses.concat(action.payload);
        // Update selected
        state.selected = state.addresses.length - 1;
        // Update local storage
        window.localStorage.setItem("address", JSON.stringify(state.addresses));
      }
    },
    // Remove address
    removeAddress: (state, action: PayloadAction<string>) => {
      // If there is only one element
      if (state.count === 1) {
        // Update count
        state.count = 0;
        // Empty array
        state.addresses = [];
        // Update selected
        state.selected = 0;
        // Update local storage
        window.localStorage.setItem("address", JSON.stringify(state.addresses));
      }
      // More than 1 address
      else {
        // Update count
        state.count -= 1;
        // Remove from array
        state.addresses = state.addresses.filter(
          (address) => address.id !== action.payload
        );
        // Update selected
        state.selected = state.addresses.length - 1;
        // Update local storage
        window.localStorage.setItem("address", JSON.stringify(state.addresses));
      }
    },
    // Empty addresses
    emptyAddresses: (state) => {
      // Update count
      state.count = 0;
      // Empty array
      state.addresses = [];
      // Update selected
      state.selected = 0;
      // Update local storage
      window.localStorage.setItem("address", JSON.stringify(state.addresses));
    },
    // Set selected
    setSelectedAddress: (state, action: PayloadAction<number>) => {
      // Update selected
      state.selected = action.payload;
    },
  },
});

// Export actions and reducer from the address slice
export const { addAddress, removeAddress, emptyAddresses, setSelectedAddress } =
  addressSlice.actions;

// Select addresses from the state
export const selectAddress = (state: RootState) =>
  state.address.addresses.values;

// Export the reducer
export default addressSlice.reducer;
