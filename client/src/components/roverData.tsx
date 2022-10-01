import React, { useEffect } from 'react';
import { RootState } from '../store';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setData, setRovData } from '../store/roverSlice';

const apiKey = process.env.REACT_APP_API_KEY;

// rover names: curiosity, opportunity, spirit, perseverance
// sol are mars years = ranges from 0 to max found in endpoint

// camera = FHAZ Front Hazard Avoidance Camera
// RHAZ Rear Hazard Avoidance Camera
// MAST Mast Camera
// CHEMCAM Chemistry and Camera Complex
// MAHLI Mars Hand Lens Imager
// MARDI Mars Descent Imager
// NAVCAM Navigation Camera
// PANCAM Panoramic Camera
// MINITES Miniature Thermal Emission Spectrometer (Mini-TES)
function RoverData() {
  const { roverSettings } = useAppSelector((state: RootState) => state.rover);
  const dispatch = useAppDispatch();
  const { rover, sol, camera } = roverSettings;
  // const rover = 'curiosity';
  // const sol = '1000';
  // const camera = 'MAST';
  useEffect(() => {
    async function getRoverData() {
      const res = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&page=1&camera=${camera}&api_key=${apiKey}`);
      const dataRover = await res.json();
      // console.log(res, dataRover);
      dispatch(setData(dataRover.photos));
      console.log(dataRover.photos);
    }
    if (rover && sol && camera) {
      getRoverData();
    }
  }, [dispatch, roverSettings]);

  useEffect(() => {
    async function getRoverData() {
      const res = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}/?api_key=${apiKey}`);
      const dataRover = await res.json();
      // console.log(res, dataRover);
      dispatch(setRovData(dataRover.photo_manifest));
      console.log(dataRover.photo_manifest);
    }
    if (rover) {
      getRoverData();
    }
  }, [dispatch, roverSettings]);
  // https://api.nasa.gov/mars-photos/api/v1/manifests/{rover}/?api_key=${apiKey}
  return (
    <>
    </>
  );
}

export default RoverData;
