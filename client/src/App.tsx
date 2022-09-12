import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import Apod from './pages/Apod';
// import Asteroid from './pages/Asteroid';
// import Rover from './components/roverData';
import GlobalStyle from './globalStyles';
import Home from './pages/home';
import Nav from './components/navBar';

function App() {
  return (
    <>
      <GlobalStyle />
      <Nav />
      <Routes>
        <Route index element={<Home />} />
        {/* <Apod />
        <Asteroid />
        <Rover /> */}
      </Routes>
    </>
  );
}

export default App;
