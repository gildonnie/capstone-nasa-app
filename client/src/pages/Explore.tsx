import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ExploreImg from '../images/explore.jpg';
import AsteroidPic from '../images/asteroid.jpg';
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
  grid-template-columns: 1fr 1fr 1fr;
  div {
    margin-left: 8rem;
    filter: drop-shadow(0 0 .5rem #A27468);
    transition: .3s;
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
    overflow: hidden;
  }
  .rover{
    background-image: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${Mars});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
  }
  .asteroid{
    background-image: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${AsteroidPic});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
   
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
  }
`;

function Explore() {
  return (
    <Wrapper>
      <Nav />
      <Container className="cards">
        <ExploreWrap className="potd"><Link to="/apod">Picture of The Day</Link></ExploreWrap>
        <ExploreWrap className="rover"><Link to="/rover">Rovers</Link></ExploreWrap>
        <ExploreWrap className="asteroid"><Link to="/asteroid">Objects Near Earth</Link></ExploreWrap>
      </Container>
    </Wrapper>
  );
}

export default Explore;
