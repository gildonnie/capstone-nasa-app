import React, { ChangeEvent } from 'react';
import { shallowEqual } from 'react-redux';
import Slider from '../components/Slider';
import RoverData from '../components/RoverData';
import { RootState } from '../store';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setRoverSettings } from '../store/roverSlice';

function Rover() {
  const disabled = true;
  const { roverSettings, rovData } = useAppSelector((
    state: RootState,
  ) => state.rover, shallowEqual);
  const dispatch = useAppDispatch();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    dispatch(setRoverSettings({
      ...roverSettings,
      [name]: value,
    }));
  };

  const rover = rovData.name;
  switch (rover) {
    case 'Curiosity':
      (document.getElementById('FHAZ') as HTMLInputElement).disabled = false;
      (document.getElementById('RHAZ') as HTMLInputElement).disabled = false;
      (document.getElementById('MAST') as HTMLInputElement).disabled = false;
      (document.getElementById('CHEMCAM') as HTMLInputElement).disabled = false;
      (document.getElementById('MAHLI') as HTMLInputElement).disabled = false;
      (document.getElementById('MARDI') as HTMLInputElement).disabled = false;
      (document.getElementById('NAVCAM') as HTMLInputElement).disabled = false;
      (document.getElementById('PANCAM') as HTMLInputElement).disabled = true;
      (document.getElementById('MINITES') as HTMLInputElement).disabled = true;
      break;
    case 'Opportunity':
    case 'Spirit':
      (document.getElementById('FHAZ') as HTMLInputElement).disabled = false;
      (document.getElementById('RHAZ') as HTMLInputElement).disabled = false;
      (document.getElementById('MAST') as HTMLInputElement).disabled = true;
      (document.getElementById('CHEMCAM') as HTMLInputElement).disabled = true;
      (document.getElementById('MAHLI') as HTMLInputElement).disabled = true;
      (document.getElementById('MARDI') as HTMLInputElement).disabled = true;
      (document.getElementById('NAVCAM') as HTMLInputElement).disabled = false;
      (document.getElementById('PANCAM') as HTMLInputElement).disabled = false;
      (document.getElementById('MINITES') as HTMLInputElement).disabled = false;
      break;
    default:
  }
  return (
    <>
      <RoverData />
      <div>
        <form>
          <fieldset>
            <legend>Rover:</legend>
            <label htmlFor="curiosity">
              <input
                type="radio"
                name="rover"
                id="rover"
                value="curiosity"
                onChange={handleChange}
              />
              Curiosity
            </label>
            <label htmlFor="opportunity">
              <input
                type="radio"
                name="rover"
                id="rover"
                value="opportunity"
                onChange={handleChange}
              />
              Opportunity
            </label>
            <label htmlFor="spirit">
              <input
                type="radio"
                name="rover"
                id="rover"
                value="spirit"
                onChange={handleChange}
              />
              Spirit
            </label>
            <label htmlFor="perseverance">
              <input
                type="radio"
                name="rover"
                id="rover"
                value="Perseverance"
                onChange={handleChange}
              />
              Perseverance
            </label>
          </fieldset>
          <fieldset>
            <legend>Sol:</legend>
            <label htmlFor="sol">
              Enter Sol Date 0-
              {rovData.max_sol}
              {' '}
              <input
                type="text"
                name="sol"
                value={roverSettings.sol}
                id="date"
                onChange={handleChange}
              />
            </label>
          </fieldset>
          <fieldset>
            <legend>Camera:</legend>
            <label htmlFor="FHAZ">
              <input
                type="radio"
                name="camera"
                id="FHAZ"
                value="FHAZ"
                onChange={handleChange}
                disabled={disabled}
              />
              Front Hazard Avoidance Camera
            </label>
            <label htmlFor="RHAZ">
              <input
                type="radio"
                name="camera"
                id="RHAZ"
                value="RHAZ"
                onChange={handleChange}
                disabled={disabled}
              />
              Rear Hazard Avoidance Camera
            </label>
            <label htmlFor="MAST">
              <input
                type="radio"
                name="camera"
                id="MAST"
                value="MAST"
                onChange={handleChange}
                disabled={disabled}
              />
              Mast Camera
            </label>
            <label htmlFor="CHEMCAM">
              <input
                type="radio"
                name="camera"
                id="CHEMCAM"
                value="CHEMCAM"
                onChange={handleChange}
                disabled={disabled}
              />
              Chemistry and Camera Complex
            </label>
            <label htmlFor="MAHLI">
              <input
                type="radio"
                name="camera"
                id="MAHLI"
                value="MAHLI"
                onChange={handleChange}
                disabled={disabled}
              />
              Mars Hand Lens Imager
            </label>
            <label htmlFor="MARDI">
              <input
                type="radio"
                name="camera"
                id="MARDI"
                value="MARDI"
                onChange={handleChange}
                disabled={disabled}
              />
              Mars Descent Imager
            </label>
            <label htmlFor="NAVCAM">
              <input
                type="radio"
                name="camera"
                id="NAVCAM"
                value="NAVCAM"
                onChange={handleChange}
                disabled={disabled}
              />
              Navigation Camera
            </label>
            <label htmlFor="MAST">
              <input
                type="radio"
                name="camera"
                id="PANCAM"
                value="PANCAM"
                onChange={handleChange}
                disabled={disabled}
              />
              Panoramic Camera
            </label>
            <label htmlFor="MINITES">
              <input
                type="radio"
                name="camera"
                id="MINITES"
                value="MINITES"
                onChange={handleChange}
                disabled={disabled}
              />
              Miniature Thermal Emission Spectrometer (Mini-TES)
            </label>
          </fieldset>
        </form>
      </div>
      <div>
        {/* {rData.map((rovData) => (
          <p>
            {rovData.img_src}
          </p>
        ))} */}
      </div>
      <Slider />
    </>
  );
}

export default Rover;
