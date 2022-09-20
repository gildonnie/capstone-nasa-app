import React, { useEffect } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setData } from '../store/apodSlice';

const apiKey = process.env.REACT_APP_API_KEY;

function apodData() {
  const dispatch = useAppDispatch();
  const { newDate } = useAppSelector(
    (state) => state.apod,
  );

  useEffect(() => {
    axios
      .get(
        (`https://api.nasa.gov/planetary/apod?date=${newDate}&api_key=${apiKey}`),
      )
      .then((res) => {
        dispatch(setData(res.data));
      })
      .catch((err) => console.log(err));
  }, [dispatch, newDate]);
  return (
    <>
    </>
  );
}

export default apodData;
