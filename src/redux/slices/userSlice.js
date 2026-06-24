import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => {
  try {
    const serializedState = localStorage.getItem('clubtyl_user');
    if (serializedState === null) {
      return { user: null, isAuthenticated: false };
    }
    return { user: JSON.parse(serializedState), isAuthenticated: true };
  } catch (err) {
    return { user: null, isAuthenticated: false };
  }
};

const initialState = getInitialState();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      try {
        localStorage.setItem('clubtyl_user', JSON.stringify(action.payload));
      } catch (err) {}
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      try {
        localStorage.removeItem('clubtyl_user');
      } catch (err) {}
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
