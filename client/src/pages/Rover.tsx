import React, { ChangeEvent } from 'react';
import { shallowEqual } from 'react-redux';
import Slider from '../components/Slider';
import RoverData from '../components/RoverData';
import { RootState } from '../store';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setRoverSettings } from '../store/roverSlice';
import RorverCameras from '../components/RoverCameras.json';

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

  const perserverance = RorverCameras.perserveranceCameras;
  const regCameras = RorverCameras.regularCameras;
  console.log(perserverance);
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
    case 'Perseverance':
      (document.getElementById('FHAZ') as HTMLInputElement).disabled = true;
      (document.getElementById('RHAZ') as HTMLInputElement).disabled = true;
      (document.getElementById('MAST') as HTMLInputElement).disabled = true;
      (document.getElementById('CHEMCAM') as HTMLInputElement).disabled = true;
      (document.getElementById('MAHLI') as HTMLInputElement).disabled = true;
      (document.getElementById('MARDI') as HTMLInputElement).disabled = true;
      (document.getElementById('NAVCAM') as HTMLInputElement).disabled = true;
      (document.getElementById('PANCAM') as HTMLInputElement).disabled = true;
      (document.getElementById('MINITES') as HTMLInputElement).disabled = true;
      (document.getElementById('EDL_RUCAM') as HTMLInputElement).disabled = false;
      (document.getElementById('EDL_RDCAM') as HTMLInputElement).disabled = false;
      (document.getElementById('EDL_DDCAM') as HTMLInputElement).disabled = false;
      (document.getElementById('EDL_PUCAM1') as HTMLInputElement).disabled = false;
      (document.getElementById('EDL_PUCAM2') as HTMLInputElement).disabled = false;
      (document.getElementById('NAVCAM_LEFT') as HTMLInputElement).disabled = false;
      (document.getElementById('NAVCAM_RIGHT') as HTMLInputElement).disabled = false;
      (document.getElementById('MCZ_RIGHT') as HTMLInputElement).disabled = false;
      (document.getElementById('MCZ_LEFT') as HTMLInputElement).disabled = false;
      (document.getElementById('FRONT_HAZCAM_LEFT_A') as HTMLInputElement).disabled = false;
      (document.getElementById('FRONT_HAZCAM_RIGHT_A') as HTMLInputElement).disabled = false;
      (document.getElementById('REAR_HAZCAM_LEFT') as HTMLInputElement).disabled = false;
      (document.getElementById('REAR_HAZCAM_RIGHT') as HTMLInputElement).disabled = false;
      (document.getElementById('SKYCAM') as HTMLInputElement).disabled = false;
      (document.getElementById('SHERLOC_WATSON') as HTMLInputElement).disabled = false;
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
            {regCameras.map((cameras) => (
              <label htmlFor={cameras.Abbreviation}>
                <input
                  type="radio"
                  name="camera"
                  id={cameras.Abbreviation}
                  value={cameras.Abbreviation}
                  onChange={handleChange}
                  disabled={disabled}
                />
                {cameras.Name}
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend>Perserverance Cameras</legend>
            {perserverance.map((cameras) => (
              <label htmlFor={cameras.Abbreviation}>
                <input
                  type="radio"
                  name="camera"
                  id={cameras.Abbreviation}
                  value={cameras.Abbreviation}
                  onChange={handleChange}
                  disabled={disabled}
                />
                {cameras.Name}
              </label>
            ))}
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
