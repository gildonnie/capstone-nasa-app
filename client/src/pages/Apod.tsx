import React from 'react';
import { useAppSelector } from '../store/hooks';
import { RootState } from '../store';
import ApodData from '../components/apodData';

function Apod() {
  const { apData } = useAppSelector((state: RootState) => state.apod);
  return (
    <>
      <ApodData />
      <div>{apData && (<p>{apData.url}</p>)}</div>
    </>
  );
}

export default Apod;
