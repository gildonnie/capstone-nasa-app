import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Apod from '../pages/Apod';
import Favorites from '../pages/Favorites';
import Asteroid from '../pages/Asteroid';
import Rover from '../pages/Rover';
import Home from '../pages/Home';
import Explore from '../pages/Explore';
import Login from '../pages/Login';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route index element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/apod" element={<Apod />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/asteroid" element={<Asteroid />} />
        <Route path="/rover" element={<Rover />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
