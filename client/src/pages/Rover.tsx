import React, { ChangeEvent, useState } from 'react';
import RoverData from '../components/RoverData';
// import { RootState } from '../store';
// import { useAppSelector } from '../store/hooks';

function Asteroid() {
  // const { rData } = useAppSelector((state: RootState) => state.rover.rData);

  const [roverSettings, SetRoverSettings] = useState({
    rover: '',
    sol: '',
    camera: '',
  });
  const handleClick = (e: ChangeEvent<HTMLInputElement>) => SetRoverSettings({
    ...roverSettings,
    rover: e.currentTarget.value,
    sol: '',
    camera: '',
  });
  const handleClick2 = (e: ChangeEvent<HTMLInputElement>) => SetRoverSettings({
    ...roverSettings,
    rover: roverSettings.rover,
    sol: e.currentTarget.value,
    camera: '',
  });
  const handleClick3 = (e: ChangeEvent<HTMLInputElement>) => SetRoverSettings({
    ...roverSettings,
    rover: roverSettings.rover,
    sol: roverSettings.sol,
    camera: e.currentTarget.value,
  });
  console.log(roverSettings);
  // console.log(rData);
  return (
    <>
      <RoverData />
      <div>
        <form>
          <label htmlFor="curiosity">
            <input
              type="radio"
              name="rovers"
              id="rover"
              value="curiosity"
              onChange={handleClick}
            />
            Curiosity
          </label>
          <label htmlFor="opportunity">
            <input
              type="radio"
              name="rovers"
              id="rover"
              value="opportunity"
              onChange={handleClick}
            />
            Opportunity
          </label>
          <label htmlFor="spirit">
            <input
              type="radio"
              name="rovers"
              id="rover"
              value="spirit"
              onChange={handleClick}
            />
            Spirit
          </label>
          <label htmlFor="perseverance">
            <input
              type="radio"
              name="rovers"
              id="rover"
              value="Perseverance"
              onChange={handleClick}
            />
            Perseverance
          </label>
        </form>
        <form>
          <label htmlFor="1000">
            <input
              type="radio"
              name="sol"
              id="sol"
              value="1000"
              onChange={handleClick2}
            />
            1000
          </label>
          <label htmlFor="999">
            <input
              type="radio"
              name="sol"
              id="sol"
              value="999"
              onChange={handleClick2}
            />
            999
          </label>
        </form>
        <form>
          <label htmlFor="MAHLI">
            <input
              type="radio"
              name="camera"
              id="camera"
              value="MAHLI"
              onChange={handleClick3}
            />
            MAHLI
          </label>
          <label htmlFor="MAST">
            <input
              type="radio"
              name="camera"
              id="camera"
              value="MAST"
              onChange={handleClick3}
            />
            MAST
          </label>
        </form>
        {/* <button type="button">curiosity</button>
        <button type="button">opportunity</button>
        <button type="button">spirit</button>
        <button type="button">perseverance</button>
      </div>
      <div>
        <button type="button">10</button>
        <button type="button">9</button>
        <button type="button">8</button>
      </div>
      <div>
        <button type="button">MAST</button>
        <button type="button">MAHLI</button>
        <button type="button">PANCAM</button> */}
      </div>
    </>
  );
}

export default Asteroid;
