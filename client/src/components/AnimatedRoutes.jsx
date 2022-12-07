import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Apod from '../pages/Apod';
import Favorites from '../pages/Favorites';
import Asteroid from '../pages/Asteroid';
import Rover from '../pages/Rover';
import Home from '../pages/Home';
import Explore from '../pages/Explore';
import Signin from '../pages/Signin';
import Profile from '../pages/Profile';
import SignUp from '../pages/Signup';
import RovFavs from '../pages/RoverFavs';
import StartGame from './StartGame';
import { AuthProvider } from '../utils/AuthContext';
import PrivateRou from '../pages/PrivateRou';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <AuthProvider>
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home />} />
          <Route path="/apod" element={<Apod />} />
          <Route path="/asteroid" element={<Asteroid />} />
          <Route path="/rover" element={<Rover />} />
          <Route path="/game" element={<StartGame />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/profile" element={<PrivateRou />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/explore" element={<PrivateRou />}>
            <Route path="/explore" element={<Explore />} />
          </Route>
          <Route path="/favorites" element={<PrivateRou />}>
            <Route path="/favorites" element={<Favorites />} />
          </Route>
          <Route path="/rfavorites" element={<PrivateRou />}>
            <Route path="/rfavorites" element={<RovFavs />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </AuthProvider>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
