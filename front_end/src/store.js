import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./features/customerSlice";

// Debug Log: Ensure Redux Store is Initializing
console.log("🛠 Initializing Redux Store...");

export const store = configureStore({
  reducer: {
    customers: customerReducer,
  },
});
