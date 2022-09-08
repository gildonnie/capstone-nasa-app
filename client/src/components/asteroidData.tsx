import React, { useEffect } from 'react';
import axios from 'axios';
import { useAppDispatch } from '../store/hooks';
import { setData } from '../store/asteroidSlice';

const apiKey = process.env.REACT_APP_API_KEY;

function asteroidData() {
  const startDate = '2022-09-08';
  const endDate = '2022-09-08';
  const dispatch = useAppDispatch();
  useEffect(() => {
    axios
      .get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`)
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

export default asteroidData;
