import React, { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { setData } from '../store/asteroidSlice';

const apiKey = process.env.REACT_APP_API_KEY;

function AsteroidData() {
  const startDate = '2022-09-08';
  const endDate = '2022-09-08';
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function getAsteroidData() {
      const res = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`);
      const dataAsteroid = await res.json();
      dispatch(setData(dataAsteroid));
    }
    getAsteroidData();
  }, [dispatch]);
  return (
    <>
    </>
  );
}

export default AsteroidData;
