import React, { useEffect } from 'react';
// import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setData } from '../store/apodSlice';

const apiKey = process.env.REACT_APP_API_KEY;

function apodData() {
  const dispatch = useAppDispatch();
  const newDate = useAppSelector(
    (state) => state.apod.newDate,
  );

  useEffect(() => {
    async function getApodData() {
      const res = await fetch(`https://api.nasa.gov/planetary/apod?date=${newDate}&api_key=${apiKey}`);
      const dataApod = await res.json();
      dispatch(setData(dataApod));
    }
    getApodData();
  }, [dispatch, newDate]);
  return (
    <>
    </>
  );
}

export default apodData;
