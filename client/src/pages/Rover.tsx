import React, { ChangeEvent, useState } from 'react';
import { shallowEqual } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ImageComponent from '../components/ImageComponent';
import RoverData from '../components/RoverData';
import { RootState } from '../store';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setRoverSettings } from '../store/roverSlice';
import RorverCameras from '../components/RoverCameras.json';
import MarsBack from '../images/marsBack.jpg';
import NavBar from '../components/NavBar';

const Wrapper = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${MarsBack});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 150vh;
  text-align: center;
  .body {
    text-align: center;
    display: flex;
    justify-content: center;
  }
  form {
    margin-top: -3rem;
  }
`;
const FieldWrap = styled.fieldset`
  background-color: rgb(211,114,58 , 0.3);
  width: 500px;
  border-radius: 1rem;
  border: 1px solid black;
  padding: .5rem;
  label {
    input {
      background: transparent;
      color: white;
      border: 1px solid white;
    }
    input[type="radio"] {
      appearance: none;
      font: inherit;
      color: currentColor;
      width: 1em;
      height: 1em;
      border: 0.15em solid currentColor;
      border-radius: 50%;
      transform: translateY(1.5em);
      display: grid;
    }
    
    input[type="radio"]::before {
      content: "";
      width: 0.65em;
      height: 0.65em;
      border-radius: 50%;
      transform: scale(0);
      transition: 120ms transform ease-in-out;
      background-color: #A27468;
    }
    
    input[type="radio"]:checked::before {
      transform: scale(1);
    }
    
    input[type="radio"]:focus {
      outline: max(2px, 0.15em) solid currentColor;
      outline-offset: max(2px, 0.15em);
    }
  }
 
`;

function Rover() {
  const [show, setShow] = useState(true);
  const { roverSettings, rovData } = useAppSelector((
    state: RootState,
  ) => state.rover, shallowEqual);
  const dispatch = useAppDispatch();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShow(false);
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
      (document.getElementById('FHAZ') as HTMLInputElement).style.display = 'block';
      (document.getElementById('RHAZ') as HTMLInputElement).style.display = 'block';
      (document.getElementById('MAST') as HTMLInputElement).style.display = 'block';
      (document.getElementById('CHEMCAM') as HTMLInputElement).style.display = 'block';
      (document.getElementById('MAHLI') as HTMLInputElement).style.display = 'block';
      (document.getElementById('MARDI') as HTMLInputElement).style.display = 'block';
      (document.getElementById('NAVCAM') as HTMLInputElement).style.display = 'block';
      (document.getElementById('PANCAM') as HTMLInputElement).style.display = 'none';
      (document.getElementById('MINITES') as HTMLInputElement).style.display = 'none';
      (document.getElementById('EDL_RUCAM') as HTMLInputElement).style.display = 'none';
      (document.getElementById('EDL_RDCAM') as HTMLInputElement).style.display = 'none';
      (document.getElementById('EDL_DDCAM') as HTMLInputElement).style.display = 'none';
      (document.getElementById('EDL_PUCAM1') as HTMLInputElement).style.display = 'none';
      (document.getElementById('EDL_PUCAM2') as HTMLInputElement).style.display = 'none';
      (document.getElementById('NAVCAM_LEFT') as HTMLInputElement).style.display = 'none';
      (document.getElementById('NAVCAM_RIGHT') as HTMLInputElement).style.display = 'none';
      (document.getElementById('MCZ_RIGHT') as HTMLInputElement).style.display = 'none';
      (document.getElementById('MCZ_LEFT') as HTMLInputElement).style.display = 'none';
      (document.getElementById('FRONT_HAZCAM_LEFT_A') as HTMLInputElement).style.display = 'none';
      (document.getElementById('FRONT_HAZCAM_RIGHT_A') as HTMLInputElement).style.display = 'none';
      (document.getElementById('REAR_HAZCAM_LEFT') as HTMLInputElement).style.display = 'none';
      (document.getElementById('REAR_HAZCAM_RIGHT') as HTMLInputElement).style.display = 'none';
      (document.getElementById('SKYCAM') as HTMLInputElement).style.display = 'none';
      (document.getElementById('SHERLOC_WATSON') as HTMLInputElement).style.display = 'none';
      break;
    case 'Opportunity':
    case 'Spirit':
      (document.getElementById('FHAZ') as HTMLInputElement).style.display = 'block';
      (document.getElementById('RHAZ') as HTMLInputElement).style.display = 'block';
      (document.getElementById('MAST') as HTMLInputElement).style.display = 'none';
      (document.getElementById('CHEMCAM') as HTMLInputElement).style.display = 'none';
      (document.getElementById('MAHLI') as HTMLInputElement).style.display = 'none';
      (document.getElementById('MARDI') as HTMLInputElement).style.display = 'none';
      (document.getElementById('NAVCAM') as HTMLInputElement).style.display = 'block';
      (document.getElementById('PANCAM') as HTMLInputElement).style.display = 'block';
      (document.getElementById('MINITES') as HTMLInputElement).style.display = 'block';
      (document.getElementById('EDL_RUCAM') as HTMLInputElement).style.display = 'none';
      (document.getElementById('EDL_RDCAM') as HTMLInputElement).style.display = 'none';
      (document.getElementById('EDL_DDCAM') as HTMLInputElement).style.display = 'none';
      (document.getElementById('EDL_PUCAM1') as HTMLInputElement).style.display = 'none';
      (document.getElementById('EDL_PUCAM2') as HTMLInputElement).style.display = 'none';
      (document.getElementById('NAVCAM_LEFT') as HTMLInputElement).style.display = 'none';
      (document.getElementById('NAVCAM_RIGHT') as HTMLInputElement).style.display = 'none';
      (document.getElementById('MCZ_RIGHT') as HTMLInputElement).style.display = 'none';
      (document.getElementById('MCZ_LEFT') as HTMLInputElement).style.display = 'none';
      (document.getElementById('FRONT_HAZCAM_LEFT_A') as HTMLInputElement).style.display = 'none';
      (document.getElementById('FRONT_HAZCAM_RIGHT_A') as HTMLInputElement).style.display = 'none';
      (document.getElementById('REAR_HAZCAM_LEFT') as HTMLInputElement).style.display = 'none';
      (document.getElementById('REAR_HAZCAM_RIGHT') as HTMLInputElement).style.display = 'none';
      (document.getElementById('SKYCAM') as HTMLInputElement).style.display = 'none';
      (document.getElementById('SHERLOC_WATSON') as HTMLInputElement).style.display = 'none';
      break;
    case 'Perseverance':
      (document.getElementById('FHAZ') as HTMLInputElement).style.display = 'none';
      (document.getElementById('RHAZ') as HTMLInputElement).style.display = 'none';
      (document.getElementById('MAST') as HTMLInputElement).style.display = 'none';
      (document.getElementById('CHEMCAM') as HTMLInputElement).style.display = 'none';
      (document.getElementById('MAHLI') as HTMLInputElement).style.display = 'none';
      (document.getElementById('MARDI') as HTMLInputElement).style.display = 'none';
      (document.getElementById('NAVCAM') as HTMLInputElement).style.display = 'none';
      (document.getElementById('PANCAM') as HTMLInputElement).style.display = 'none';
      (document.getElementById('MINITES') as HTMLInputElement).style.display = 'none';
      (document.getElementById('EDL_RUCAM') as HTMLInputElement).style.display = 'block';
      (document.getElementById('EDL_RDCAM') as HTMLInputElement).style.display = 'block';
      (document.getElementById('EDL_DDCAM') as HTMLInputElement).style.display = 'block';
      (document.getElementById('EDL_PUCAM1') as HTMLInputElement).style.display = 'block';
      (document.getElementById('EDL_PUCAM2') as HTMLInputElement).style.display = 'block';
      (document.getElementById('NAVCAM_LEFT') as HTMLInputElement).style.display = 'block';
      (document.getElementById('NAVCAM_RIGHT') as HTMLInputElement).style.display = 'block';
      (document.getElementById('MCZ_RIGHT') as HTMLInputElement).style.display = 'block';
      (document.getElementById('MCZ_LEFT') as HTMLInputElement).style.display = 'block';
      (document.getElementById('FRONT_HAZCAM_LEFT_A') as HTMLInputElement).style.display = 'block';
      (document.getElementById('FRONT_HAZCAM_RIGHT_A') as HTMLInputElement).style.display = 'block';
      (document.getElementById('REAR_HAZCAM_LEFT') as HTMLInputElement).style.display = 'block';
      (document.getElementById('REAR_HAZCAM_RIGHT') as HTMLInputElement).style.display = 'block';
      (document.getElementById('SKYCAM') as HTMLInputElement).style.display = 'block';
      (document.getElementById('SHERLOC_WATSON') as HTMLInputElement).style.display = 'block';
      break;
    default:
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <RoverData />
      <Wrapper>
        <NavBar />
        <div className="body">
          <form>
            <FieldWrap>
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
            </FieldWrap>
            {!show
              ? (
                <>
                  <FieldWrap>
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
                  </FieldWrap>
                  <FieldWrap>
                    <legend>Camera:</legend>
                    {regCameras.map((cameras) => (
                      <label id={cameras.Abbreviation} htmlFor={cameras.Abbreviation}>
                        <input
                          type="radio"
                          name="camera"
                          value={cameras.Abbreviation}
                          onChange={handleChange}
                        />
                        {cameras.Name}
                      </label>
                    ))}
                  </FieldWrap>
                  <FieldWrap>
                    <legend>Perserverance Cameras</legend>
                    {perserverance.map((cameras) => (
                      <label id={cameras.Abbreviation} htmlFor={cameras.Abbreviation}>
                        <input
                          type="radio"
                          name="camera"
                        // id={cameras.Abbreviation}
                          value={cameras.Abbreviation}
                          onChange={handleChange}
                        />
                        {cameras.Name}
                      </label>
                    ))}
                  </FieldWrap>

                </>
              ) : null}
          </form>
        </div>
        <ImageComponent />
      </Wrapper>
    </motion.div>
  );
}

export default Rover;
