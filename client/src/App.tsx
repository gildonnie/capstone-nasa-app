import React from 'react';
import Apod from './pages/Apod';
import Asteroid from './pages/Asteroid';
import Rover from './components/roverData';

function App() {
  return (
    <>
      <Apod />
      <Asteroid />
      <Rover />
    </>
  );
}

export default App;
