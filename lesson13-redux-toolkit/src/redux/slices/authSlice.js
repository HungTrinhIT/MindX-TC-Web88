import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: {},
  isAuthenticated: false,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async (payload, thunkAPI) => {
    try {
      // Call API
      const apiResponse = await axios.post(
        'http://localhost:8000/api/auth/login',
        payload
      );
      if (apiResponse.data?.accessToken) {
        localStorage.setItem('user', JSON.stringify(apiResponse.data));
      }

      return apiResponse.data;
    } catch (error) {
      thunkAPI.rejectWithValue('login failed');
      console.log('Something went wrongs', error);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
