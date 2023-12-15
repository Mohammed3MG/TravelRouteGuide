import { configureStore } from "@reduxjs/toolkit";
import addressReducer from "./addressSlice";

// Configure the Redux store using the toolkit's configureStore function
export const store = configureStore({
  reducer: { address: addressReducer }, // Combine reducers, in this case, using the addressReducer for the 'address' slice
});

// Define types for the RootState and AppDispatch based on the configured store
export type RootState = ReturnType<typeof store.getState>; // Type representing the entire state of the Redux store
export type AppDispatch = typeof store.dispatch; // Type representing the dispatch function of the Redux store
