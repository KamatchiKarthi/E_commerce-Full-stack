import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//retreive user info and token form localstroage if availble

const userFromStroage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

//check for an exisiting guest ID in the localStroage or genereate new one
// get stored guestId if exists
const storedGuestId = localStorage.getItem('guestId');

// either existing or generate new one
const initialGuestId = storedGuestId
  ? storedGuestId
  : `guest_${new Date().getTime()}`;

// save guestId if it was newly generated
if (!storedGuestId) {
  localStorage.setItem('guestId', initialGuestId);
}

//initail state
const initialState = {
  user: userFromStroage,
  guestId: initialGuestId,
  loading: false,
  error: null,
};

//async thunk for user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userDate, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        userDate
      );
      localStorage.setItem('userInfo', JSON.stringify(response.data.user));
      localStorage.setItem('userToken', response.data.token);

      return response.data.user; // retunr the user object from the response
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//async thunk for user registraction
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userDate, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
        userDate
      );
      localStorage.setItem('userInfo', JSON.stringify(response.data.user));
      localStorage.setItem('userToken', response.data.token);

      return response.data.user; // retunr the user object from the response
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//slice
const authSlic = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('userToken');
      localStorage.setItem('guestId', state.guestId);
    },
    generateNewGuestId: state => {
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.setItem('guestId', state.guestId);
    },
  },
  extraReducers: bulider => {
    bulider
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload.message;
      })
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload.message;
      });
  },
});

export const { logout, generateNewGuestId } = authSlic.actions;
export default authSlic.reducer;
