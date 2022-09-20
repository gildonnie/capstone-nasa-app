import React, { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { setData } from '../store/roverSlice';

const apiKey = process.env.REACT_APP_API_KEY;

function roverData() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function getRoverData() {
      const res = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/latest_photos?api_key=${apiKey}`);
      const dataRover = await res.json();
      dispatch(setData(dataRover));
    }
    getRoverData();
  }, [dispatch]);

  return (
    <>
    </>
  );
}

export default roverData;
