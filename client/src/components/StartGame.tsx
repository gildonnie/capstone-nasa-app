import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;
const Button = styled.button`
  width: 299px;
  height: 60px;
  color: red;
  background-color: transparent;
  cursor: pointer;
  border: 1px solid #00B2A7;
  color: #00B2A7;
  &:hover {
    cursor: pointer;
    border: 1px solid #96B1AD;
    color: #96B1AD;
  }
`;
function StartGame() {
  const navigate = useNavigate();
  const GameStart = () => {
    navigate(0);
  };
  return (
    <Container>
      <h1>Enter The Asteroid World</h1>
      <p>Are You Sure?</p>
      <Button type="button" onClick={GameStart}>Yes</Button>
      <Link to="/explore"><Button type="button">No, Run</Button></Link>
    </Container>
  );
}

export default StartGame;
