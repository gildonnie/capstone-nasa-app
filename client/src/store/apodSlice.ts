/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

type dataApodTypes = {
  title: string,
  explanation?: string,
  url: string
  date: string;
 }

type dataApod = {
  apData: dataApodTypes;
  newDate: string;
  input: string;
  favorite: dataApodTypes;
  loading: boolean;
  error: boolean;
}

const initialState = {
  apData: {},
  newDate: '',
  input: '',
  favorite: {},
  loading: true,
  error: false,
} as dataApod;

export const apodSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData(state, { payload }) {
      state.apData = payload;
    },
    setNewDate(state, { payload }) {
      state.newDate = payload;
    },
    setInput(state, { payload }) {
      state.input = payload;
    },
    setFavorite(state, { payload }) {
      state.favorite = payload;
    },
  },
});

export const {
  setData, setNewDate, setInput, setFavorite,
} = apodSlice.actions;
export const getApod = (state: RootState) => state;
export default apodSlice.reducer;
