/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

type dataApodTypes = {
  title: string,
  explanation: string,
  url: string
 }

type dataApod = {
  apData: dataApodTypes;
  loading: boolean;
  error: boolean;
}

const initialState = {
  apData: {},
  loading: true,
  error: false,
} as dataApod;

// export const fetchData = createAsyncThunk(
//   'data/fetchData',
//   async () => {
//     const dataRes = await axios
//       .get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
//     console.log(dataRes);
//     return dataRes.data;
//   },
// );

export const apodSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData(state, { payload }) {
      state.apData = payload;
    },
  },
  // extraReducers(builder) {
  //   builder
  //     .addCase(fetchData.pending, (state) => {
  //       state.error = false;
  //       state.loading = true;
  //     })
  //     .addCase(fetchData.fulfilled, (state, { payload }) => {
  //       state.error = false;
  //       state.loading = false;
  //       state.data = payload;
  //     })
  //     .addCase(fetchData.rejected, (state) => {
  //       state.error = true;
  //       state.loading = false;
  //     });
  // },
});

export const { setData } = apodSlice.actions;
export const getApod = (state: RootState) => state;
export default apodSlice.reducer;
