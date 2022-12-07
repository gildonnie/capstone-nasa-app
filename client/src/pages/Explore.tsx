import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ExploreImg from '../images/explore.jpg';
import AsteroidPic from '../images/asteroid.jpg';
import AsteroidGame from '../images/asteroidGame.png';
import Mars from '../images/mars.jpg';
import Potd from '../images/potd.jpg';
import Nav from '../components/NavBar';

const Wrapper = styled.div`
  background-image: url(${ExploreImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
  .cards {
    display: flex;
    justify-content: center;
    align-items: center;
  }
 
`;

const Container = styled.div`
  margin-top: 4rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  div {
    margin-left: 2rem;
    filter: drop-shadow(0 0 .5rem #A27468);
    transition: .3s;
    border-radius: 1.5rem;
    &:hover {
      transform: scale(1.1);
      z-index: 2;
    }
  }
  .potd{
    background-image: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${Potd});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    // overflow: hidden;
  }
  .rover{
    background-image: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${Mars});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    // overflow: hidden;
  }
  .asteroid{
    background-image: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${AsteroidPic});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    // overflow: hidden;
   
  }
  .asteroidGame{
    background-image: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${AsteroidGame});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    // overflow: hidden;
   
  }
`;

const ExploreWrap = styled.div`
a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 19rem;
  height: 25rem;
  color: #ffff;
  text-decoration: none;
  // text-align: center;
  }
`;

function Explore() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Wrapper>
        <Nav />
        <Container className="cards">
          <motion.div
            initial={{ x: -700 }}
            animate={{ x: 0 }}
          >
            <ExploreWrap className="potd"><Link to="/apod">Picture of The Day</Link></ExploreWrap>
          </motion.div>
          <motion.div
            initial={{ y: 700 }}
            animate={{ y: 0 }}
          >
            <ExploreWrap className="rover"><Link to="/rover">Rovers</Link></ExploreWrap>
          </motion.div>
          <motion.div
            initial={{ x: 700 }}
            animate={{ x: 0 }}
          >
            <ExploreWrap className="asteroid"><Link to="/asteroid">Objects Near Earth</Link></ExploreWrap>
          </motion.div>
          <motion.div
            initial={{ x: 700 }}
            animate={{ x: 0 }}
          >
            <ExploreWrap className="asteroidGame"><Link to="/game">Asteroid Game</Link></ExploreWrap>
          </motion.div>
        </Container>
      </Wrapper>
    </motion.div>
  );
}

export default Explore;
