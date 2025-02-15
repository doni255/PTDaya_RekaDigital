import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import url from "../../config";

const API_URL = url;

export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/customers`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createCustomer = createAsyncThunk(
  "customers/createCustomer",
  async (customerData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/customers`,
        customerData
      );
      console.log("✅ API Response:", response.data);
      return response.data;
    } catch (error) {
      // Extract only the relevant message
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred.";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "customers/deleteCustomer",
  async (customerId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/api/customers/${customerId}`);
      return customerId; // Return ID so we can remove from state
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const customerSlice = createSlice({
  name: "customers",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createCustomer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list.push(action.payload); // Append new customer to list
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (customer) => customer.id !== action.payload
        );
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default customerSlice.reducer;
