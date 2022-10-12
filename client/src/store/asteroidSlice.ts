/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

type orbitalProps = {
  first_observation_date: string
  last_observation_date: string
}
type mileProp = {
  estimated_diameter_max: number
  estimated_diameter_min: number
}
type diaProps = {
  miles: mileProp
}

type dataAsteroidTypes = {
  name: string
  is_potentially_hazardous_asteroid: boolean
  orbital_data: orbitalProps
  estimated_diameter: diaProps
  name_limited: string
  absolute_magnitude_h: number
  id: string
 }

type dataAsteroid = {
  asData: dataAsteroidTypes[];
  loading: boolean;
  error: boolean;
}

const initialState = {
  asData: [],
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
