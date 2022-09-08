import { configureStore } from '@reduxjs/toolkit';
import apodSlice from './apodSlice';
import asteroidSlice from './asteroidSlice';
import roverSlice from './roverSlice';

export const store = configureStore({
  reducer: {
    apod: apodSlice,
    asteroid: asteroidSlice,
    rover: roverSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
