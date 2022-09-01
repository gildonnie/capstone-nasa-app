import React from 'react';
import Apod from './components/apodData';
import Asteroid from './components/asteroidData';
import Rover from './components/roverData';

function App() {
  return (
    <>
      <div>
        <p>test</p>
      </div>
      <Apod />
      <Asteroid />
      <Rover />
    </>
  );
}

export default App;
