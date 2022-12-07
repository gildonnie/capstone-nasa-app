import React from 'react';
import { useNavigate } from 'react-router-dom';

function StartGame() {
  const navigate = useNavigate();
  const GameStart = () => {
    navigate(0);
  };
  return (
    <>
      <div>StartGame</div>
      <button type="button" onClick={GameStart}>Start</button>
    </>
  );
}

export default StartGame;
