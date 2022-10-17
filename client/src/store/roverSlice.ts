/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

type dataRoverTypes = {
  length: number;
  img_src: string
 }

type dataRover= {
  rData: dataRoverTypes[];
  rovData: {
    name: string,
    max_sol: string,
  }
  roverSettings: {
    rover: string,
    sol: string,
    camera: string,
  }
  loading: boolean;
  error: boolean;
}

const initialState = {
  rData: [],
  rovData: [],
  roverSettings: {
    rover: '',
    sol: '',
    camera: '',
  },
  loading: true,
  error: false,
} as unknown as dataRover;

export const roverSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData(state, { payload }) {
      state.rData = payload;
    },
    setRovData(state, { payload }) {
      state.rovData = payload;
    },
    setRoverSettings(state, { payload }) {
      state.roverSettings = payload;
    },
  },
});

export const { setData, setRoverSettings, setRovData } = roverSlice.actions;
export const getRover = (state: RootState) => state;
export default roverSlice.reducer;
