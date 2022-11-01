import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import BackgroundVid from '../videos/blackHole.webm';
import EarthSpin from '../videos/earthSpin.gif';

const Main = styled.div`
  width: 100%
  height: 100vh;
`;

const Wrapper = styled.video`
  position: fixed;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
`;

const EarthWrap = styled.div`
  postion: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: #25120F;
  div {
    filter: drop-shadow(0 0 .1rem #FEF1DC);
    text-align: center;
    margin-top: -1rem;
    h1 {
      margin-top: -20rem;
      margin-bottom: 13rem;
    }
  }
`;

const EarthButton = styled.img`
  opacity: 0.50;
  filter: drop-shadow(0 0 0.75rem #FEF1DC);
  transition: .3s;
  &:hover {
    transform: scale(1.1);
    z-index: 2;
    opacity: 0.8;
  }
`;

function Login() {
  return (
    <Main>
      <Wrapper autoPlay loop muted>
        <source src={BackgroundVid} type="video/webm" />
      </Wrapper>
      <motion.div>
        <EarthWrap>
          <div>
            <h1>In Progress...</h1>
            <h2>GO BACK BEFORE ITS TOO LATE!</h2>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ scale: 8 }}
            // transition={{ delay: 0.09 }}
          >
            <Link to="/"><EarthButton src={EarthSpin} alt="earth spinning gif" /></Link>
          </motion.div>
        </EarthWrap>
      </motion.div>
    </Main>
  );
}
export default Login;
