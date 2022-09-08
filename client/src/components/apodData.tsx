import React, { useEffect } from 'react';
import axios from 'axios';
import { useAppDispatch } from '../store/hooks';
import { setData } from '../store/apodSlice';

const apiKey = process.env.REACT_APP_API_KEY;

function apodData() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    axios
      .get(
        (`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`),
      )
      .then((res) => {
        console.log(res.data);
        dispatch(setData(res.data));
      })
      .catch((err) => console.log(err));
  }, [dispatch]);
  return (
    <>
    </>
  );
}

export default apodData;
