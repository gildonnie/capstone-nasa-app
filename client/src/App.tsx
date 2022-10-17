import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Apod from './pages/Apod';
import Favorites from './pages/Favorites';
import Asteroid from './pages/Asteroid';
import Rover from './pages/Rover';
import GlobalStyle from './globalStyles';
import Home from './pages/Home';
import Explore from './pages/Explore';
// import Nav from './components/NavBar';

function App() {
  return (
    <>
      <GlobalStyle />
      {/* <Nav /> */}
      <Routes>
        <Route index element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/apod" element={<Apod />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/asteroid" element={<Asteroid />} />
        <Route path="/rover" element={<Rover />} />
      </Routes>
    </>
  );
}

export default App;
