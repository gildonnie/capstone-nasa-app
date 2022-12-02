import React from 'react';

const FPS = 30;
const SHIP_SIZE = 30;

const canv = document.getElementById('gameCanvas');
const ctx = canv.getContext('2d');

const ship = {
  x: canv.width / 2,
  y: canv.height / 2,
  r: SHIP_SIZE / 2,
  a: (90 / 180) * Math.PI,
};

function Game() {
  setInterval(Game, 1000 / FPS);

  // game space
  ctx.fillStyle = 'black';
  ctx.fillReact(0, 0, canv.width, canv.height);

  // ship
  ctx.strokeStyle = 'white';
  ctx.linewidth = SHIP_SIZE / 20;
  ctx.beginPath();
  ctx.moveTo( // front of ship
    ship.x + ship.r * Math.cos(ship.a),
    ship.y - ship.r * Math.sin(ship.a),
  );
  ctx.lineTo( // back of ship
    ship.x - ship.r * (Math.cos(ship.a) + Math.sin(ship.a)),
    ship.y + ship.r * (Math.sin(ship.a) - Math.cos(ship.a)),
  );
  ctx.stroke();

  return (
    <> </>
  );
}

export default Game;
