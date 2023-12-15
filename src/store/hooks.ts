import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Custom hook to provide strongly-typed access to the Redux store's dispatch function
export const useAppDispatch: () => AppDispatch = useDispatch;

// Custom hook to provide strongly-typed access to the Redux store's state
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
