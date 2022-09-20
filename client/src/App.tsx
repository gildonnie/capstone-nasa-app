import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Apod from './pages/Apod';
import Favorites from './pages/favorties';
// import Asteroid from './pages/Asteroid';
// import Rover from './components/roverData';
import GlobalStyle from './globalStyles';
import Home from './pages/home';
import Explore from './pages/Explore';
import Nav from './components/navBar';

function App() {
  return (
    <>
      <GlobalStyle />
      <Nav />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/apod" element={<Apod />} />
        <Route path="/favorites" element={<Favorites />} />
        {/* <Asteroid />
        <Rover /> */}
      </Routes>
    </>
  );
}

export default App;
