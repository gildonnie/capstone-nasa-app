import React, { useEffect } from 'react';
import { RootState } from '../store';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setData, setRovData } from '../store/roverSlice';

const apiKey = process.env.REACT_APP_API_KEY;

function RoverData() {
  const { roverSettings } = useAppSelector((state: RootState) => state.rover);
  const dispatch = useAppDispatch();
  const { rover, sol, camera } = roverSettings;
  useEffect(() => {
    async function getRoverData() {
      const res = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&api_key=${apiKey}`);
      const dataRover = await res.json();
      dispatch(setData(dataRover.photos));
    }
    if (rover && sol && camera) {
      getRoverData();
    }
  }, [dispatch, roverSettings]);

  useEffect(() => {
    async function getRoverData() {
      const res = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}/?api_key=${apiKey}`);
      const dataRover = await res.json();
      console.log(dataRover);
      dispatch(setRovData(dataRover.photo_manifest));
    }
    if (rover) {
      getRoverData();
    }
  }, [dispatch, roverSettings]);
  return (
    <>
    </>
  );
}

export default RoverData;
