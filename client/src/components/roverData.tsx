import React, { useEffect } from 'react';
import axios from 'axios';
import { useAppDispatch } from '../store/hooks';
import { setData } from '../store/roverSlice';

const apiKey = process.env.REACT_APP_API_KEY;

function roverData() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    axios
      .get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=${apiKey}`)
      .then((res) => {
        // console.log(res);
        dispatch(setData(res.data));
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  return (
    <>
    </>
  );
}

export default roverData;
