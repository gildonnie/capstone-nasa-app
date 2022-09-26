/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

type dataRoverTypes = {
  rData: {}
 }

type dataRover= {
  rData: dataRoverTypes;
  roverSettings: {
    rover: string,
    sol: string,
    camera: string,
  }
  loading: boolean;
  error: boolean;
}

const initialState = {
  rData: {},
  roverSettings: {
    rover: '',
    sol: '',
    camera: '',
  },
  loading: true,
  error: false,
} as dataRover;

export const roverSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData(state, { payload }) {
      state.rData = payload;
    },
    SetRoverSettings(state, { payload }) {
      state.roverSettings = payload;
    },
  },
});

export const { setData } = roverSlice.actions;
export const getRover = (state: RootState) => state;
export default roverSlice.reducer;
