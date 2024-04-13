import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sign } from 'crypto';

interface UserState {
  name: string;
  email: string;
  token: string;
  _id: string;
  role: string;
}

const initialState: UserState = {
  name: '',
  email: '',
  token: '',
  _id: '',
  role: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<UserState>) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state._id = action.payload._id;
      state.role = action.payload.role;
    },
    signOut(state) {
      state.name = '';
      state.email = '';
      state.token = '';
      state._id = '';
      state.role = '';
    },
  },
});

export const { signIn, signOut } = userSlice.actions;
export default userSlice;