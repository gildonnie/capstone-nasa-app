/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

type dataAsteroidTypes = {
  asData: {}
 }

type dataAsteroid = {
  asData: dataAsteroidTypes;
  loading: boolean;
  error: boolean;
}

const initialState = {
  asData: {},
  loading: true,
  error: false,
} as dataAsteroid;

export const asteroidSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData(state, { payload }) {
      state.asData = payload;
    },
  },
});

export const { setData } = asteroidSlice.actions;
export const getAsteroid = (state: RootState) => state;
export default asteroidSlice.reducer;
