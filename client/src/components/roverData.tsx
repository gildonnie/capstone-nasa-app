import React, { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { setData } from '../store/roverSlice';

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
function roverData() {
  const dispatch = useAppDispatch();
  const rover = 'curiosity';
  const sol = '1000';
  const camera = 'MAST';
  useEffect(() => {
    async function getRoverData() {
      const res = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&api_key=${apiKey}`);
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
