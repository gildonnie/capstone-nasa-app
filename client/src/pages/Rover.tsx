import React from 'react';
import RoverData from '../components/RoverData';
import { RootState } from '../store';
import { useAppSelector } from '../store/hooks';

function Asteroid() {
  const { rData } = useAppSelector((state: RootState) => state.rover);
  console.log(rData);
  return (
    <RoverData />
  );
}

export default Asteroid;
