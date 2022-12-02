import React from 'react';
// import Canvas from './RenderingCnvs';
import laserFX from '../sounds/laser.m4a';
import explodeFX from '../sounds/explode.m4a';
import hitFX from '../sounds/hit.m4a';
import muiscHigh from '../sounds/music-high.m4a';
import musicLow from '../sounds/music-low.m4a';
import thrustFX from '../sounds/thrust.m4a';

const FPS = 30; // frames /sec
// ship
const SHIP_SIZE = 30; // ship in px
const TURN_SPEED = 360; // speed in degress /sec
const SHIP_THRUST = 5; // acc of ship px/sec/sec
const FRICTION = 0.7; // friction coef of space
// ship explosion
const SHIP_EXPLODE_DUR = 0.3; // duration of ship explosion
const SHIP_INV_DUR = 0.3; // duration of ship invinsibilty
const SHIP_BLINK_DUR = 0.3; // duration of ship blink during inv

// ship lasers
const LASER_MAX = 10; // num of lasers on screen
const LASER_SPEED = 500; // laser speed px/sec
const LASER_DIST = 0.6; // max dist laser can go
const LASER_EXPLODE_DUR = 0.1; // duration of laser

// game pts
const ROID_PTS_LGE = 20; // points scored for large asteroid
const ROID_PTS_MED = 50; // points scored for medium asteroid
const ROID_PTS_SML = 100; // points scored for small asteroid
const SAVE_KEY_SCORE = 'highscore'; // store in local storage

// roids
const ROIDS_NUM = 1; // number of asteroids at the beginning
const ROIDS_SIZE = 100; // starting size of asteroid in px
const ROIDS_SPD = 50; // max starting speed of asteroid in px/sec
const ROIDS_VERT = 10; // average of vertices on each asteroid
const ROIDS_JAG = 0.5; // jaggedness of asteroids
const SHOW_BOUNDING = false;// show bounding boxes

// game prams
const TEXT_FADE_TIME = 2.5; // text fade time in secs
const TEXT_SIZE = 40; // text font size in pxs
const GAME_LIVES = 3; // number of lives
const SOUND_ON = false;
const MUSIC_ON = false;

const canv = document.getElementById('canvas');
const ctx = canv.getContext('2d');

function Sound(src, maxStreams = 1, vol = 1.0) {
  this.streamNum = 0;
  this.streams = [];
  for (let i = 0; i < maxStreams; i += 1) {
    this.streams.push(new Audio(src));
    this.streams[i].volume = vol;
  }
  this.play = function () {
    if (SOUND_ON) {
      this.streamNum = (this.streamNum + 1) % maxStreams;
      this.streams[this.streamNum].play();
    }
  };
  this.stop = function () {
    this.streams[this.streamNum].pause();
    this.streams[this.streamNum].currentTime = 0;
  };
}

function Music(srcLow, srcHigh) {
  this.soundLow = new Audio(srcLow);
  this.soundHigh = new Audio(srcHigh);
  this.low = true;
  this.tempo = 1.0; // secs/beat
  this.beatTime = 0; // frames left until next beat

  this.play = function () {
    if (MUSIC_ON) {
      if (this.low) {
        this.soundLow.play();
      } else {
        this.soundHigh.play();
      }
      this.low = !this.low;
    }
  };

  this.setAsteroidRatio = function (ratio) {
    this.tempo = 1.0 - 0.75 * (1.0 - ratio);
  };
  this.tick = function () {
    if (this.beatTime === 0) {
      this.play();
      this.beatTime = Math.ceil(this.tempo * FPS);
    } else {
      this.beatTime -= 1;
    }
  };
}
// set up sound effects
const fxLaser = new Sound(laserFX, 5, 0.25);
const fxExplode = new Sound(explodeFX, 1, 0.50);
const fxHit = new Sound(hitFX, 5);
const fxThrust = new Sound(thrustFX, 1, 0.15);

// set up music
const music = new Music(musicLow, muiscHigh);
let roidsLeft;
let roidsTotal;

// set up game params
let level;
let roids;
let ship;
let text;
let textAlpha;
let lives;
let score;
let scoreHigh;

function newShip() {
  return {
    x: canv.width / 2,
    y: canv.height / 2,
    r: SHIP_SIZE / 2,
    a: (90 / 180) * Math.PI,
    explodeTime: 0,
    rot: 0,
    blinkTime: Math.ceil(SHIP_BLINK_DUR * FPS),
    blinkNum: Math.ceil(SHIP_INV_DUR * FPS),
    thrusting: false,
    canShoot: true,
    dead: false,
    lasers: [],
    thrust: {
      x: 0,
      y: 0,
    },
  };
}

function newAsteroid(x, y, r) {
  const lvlMulti = 1 + 0.1 * level;
  const roid = {
    x,
    y,
    xv: Math.random() * ((ROIDS_SPD * lvlMulti) / FPS) * (Math.random() < 0.5 ? 1 : -1),
    yv: Math.random() * ((ROIDS_SPD * lvlMulti) / FPS) * (Math.random() < 0.5 ? 1 : -1),
    r,
    a: Math.random() * Math.PI * 2,
    vert: Math.floor(Math.random() * (ROIDS_VERT + 1) + ROIDS_VERT / 2),
    offs: [],
  };
  // make vertez offset array
  for (let i = 0; i < roid.vert; i += 1) {
    roid.offs.push(Math.random() * ROIDS_JAG * 2 + 1 - ROIDS_JAG);
  }
  return roid;
}

function distBetweenPoints(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function drawShip(x, y, a, color = 'white') {
  ctx.strokeStyle = color;
  ctx.lineWidth = SHIP_SIZE / 20;
  ctx.beginPath();
  ctx.moveTo( // nose of ship
    x + (4 / 3) * ship.r * Math.cos(a),
    y - (4 / 3) * ship.r * Math.sin(a),
  );
  ctx.lineTo( // back left of ship
    x - ship.r * ((2 / 3) * Math.cos(a) + Math.sin(a)),
    y + ship.r * ((2 / 3) * Math.sin(a) - Math.cos(a)),
  );
  ctx.lineTo( // back right of  ship
    x - ship.r * ((2 / 3) * Math.cos(a) - Math.sin(a)),
    y + ship.r * ((2 / 3) * Math.sin(a) + Math.cos(a)),
  );
  ctx.closePath();
  ctx.stroke();
}

function explodeShip() {
  ship.explodeTime = Math.ceil(SHIP_EXPLODE_DUR * FPS);
  fxExplode.play();
}

function gameOver() {
  // todo gameover
  ship.dead = true;
  text = 'Game Over';
  textAlpha = 1.0;
}

function creatAsteroids() {
  roids = [];
  roidsTotal = ROIDS_NUM + level * 7;
  roidsLeft = roidsTotal;
  let x;
  let y;
  for (let i = 0; i < ROIDS_NUM + level; i += 1) {
    do {
      x = Math.floor(Math.random() * canv.width);
      y = Math.floor(Math.random() * canv.height);
    } while (distBetweenPoints(ship.x, ship.y, x, y) < ROIDS_SIZE * 2 + ship.r);
    roids.push(newAsteroid(x, y, Math.ceil(ROIDS_SIZE / 2)));
  }
}

function newLevel() {
  text = `level ${level + 1}`;
  textAlpha = 1.0;
  creatAsteroids();
}

function newGame() {
  level = 0;
  lives = GAME_LIVES;
  score = 0;
  ship = newShip();
  // get high score from local storage
  const scoreStr = localStorage.getItem(SAVE_KEY_SCORE);
  console.log(scoreStr);
  if (scoreStr === null) {
    scoreHigh = 0;
  } else {
    scoreHigh = parseInt(scoreStr, 10);
  }
  newLevel();
}

newGame();

function destroyAsteroid(i) {
  const { x } = roids[i];
  const { y } = roids[i];
  const { r } = roids[i];

  // split the asteroid in 2
  if (r === Math.ceil(ROIDS_SIZE / 2)) {
    roids.push(newAsteroid(x, y, Math.ceil(ROIDS_SIZE / 4)));
    roids.push(newAsteroid(x, y, Math.ceil(ROIDS_SIZE / 4)));
    score += ROID_PTS_LGE;
  } else if (r === Math.ceil(ROIDS_SIZE / 4)) {
    roids.push(newAsteroid(x, y, Math.ceil(ROIDS_SIZE / 8)));
    roids.push(newAsteroid(x, y, Math.ceil(ROIDS_SIZE / 8)));
    score += ROID_PTS_MED;
  } else {
    score += ROID_PTS_SML;
  }

  if (score > scoreHigh) {
    scoreHigh = score;
    localStorage.setItem(SAVE_KEY_SCORE, scoreHigh);
  }

  // destory the small asteroid
  roids.splice(i, 1);
  fxHit.play();

  // calculate rate of asteroids for music tempo
  roidsLeft -= 1;
  music.setAsteroidRatio(roidsLeft === 0 ? 1 : roidsLeft / roidsTotal);

  // new level when no asteroids are left
  if (roids.length === 0) {
    level += 1;
    newLevel();
  }
}

function shootLaser() {
  // create laser obj
  if (ship.canShoot && ship.lasers.length < LASER_MAX) {
    ship.lasers.push({ // nose of ship
      x: ship.x + (4 / 3) * ship.r * Math.cos(ship.a),
      y: ship.y - (4 / 3) * ship.r * Math.sin(ship.a),
      xv: (LASER_SPEED * Math.cos(ship.a)) / FPS,
      yv: (-LASER_SPEED * Math.sin(ship.a)) / FPS,
      dist: 0,
      explodeTimeLaser: 0,
    });
    fxLaser.play();
  }
  // stop shooting
  ship.canShoot = false;
}

// event handlers

function keyDown(/** @type {keyboardEvent} */ ev) {
  if (ship.dead) {
    return;
  }
  switch (ev.keyCode) {
    case 32: // spacebar shooting laser
      shootLaser();
      break;
    case 37: // left rotation
      ship.rot = (TURN_SPEED / 360) * (Math.PI / FPS);
      break;
    case 38: // up thrust
      ship.thrusting = true;
      break;
    case 39: // right rotation
      ship.rot = (-TURN_SPEED / 360) * (Math.PI / FPS);
      break;
    default:
  }
}

function keyUp(/** @type {keyboardEvent} */ ev) {
  if (ship.dead) {
    return;
  }
  switch (ev.keyCode) {
    case 32: // spacebar shooting laser allow shooting
      ship.canShoot = true;
      break;
    case 37: // left stop rotation
      ship.rot = 0;
      break;
    case 38: // up stop thrust
      ship.thrusting = false;
      break;
    case 39: // right stop rotation
      ship.rot = 0;
      break;
    default:
  }
}
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function AsteroidGame() {
  const blinkOn = ship.blinkNum % 2 === 0;
  const exploding = ship.explodeTime > 0;

  // tick the music
  music.tick();
  // thrusting
  if (ship.thrusting && !ship.dead) {
    ship.thrust.x += SHIP_THRUST * (Math.cos(ship.a) / FPS);
    ship.thrust.y -= SHIP_THRUST * (Math.sin(ship.a) / FPS);
    fxThrust.play();
  } else {
    ship.thrust.x -= FRICTION * (ship.thrust.x / FPS);
    ship.thrust.y -= FRICTION * (ship.thrust.y / FPS);
    fxThrust.stop();
  }

  // edges of screen
  if (ship.x < 0 - ship.r) {
    ship.x = canv.width + ship.r;
  } else if (ship.x > canv.width + ship.r) {
    ship.x = 0 - ship.r;
  }

  if (ship.y < 0 - ship.r) {
    ship.y = canv.height + ship.r;
  } else if (ship.y > canv.width + ship.r) {
    ship.y = 0 - ship.r;
  }

  // game space
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canv.width, canv.height);

  // ship
  if (!exploding) {
    if (blinkOn && !ship.dead) {
      drawShip(ship.x, ship.y, ship.a);
    }
    // boudning circle of roids
    if (SHOW_BOUNDING) {
      ctx.strokeStyle = 'lime';
      ctx.beginPath();
      ctx.arc(ship.x, ship.y, ship.r, 0, Math.PI * 2, false);
      ctx.stroke();
    }

    // handle blinking
    if (ship.blinkNum > 0) {
      // reudce the blink time
      ship.blinkTime -= 1;
      if (ship.blinkTime === 0) {
        ship.blinkTime = Math.ceil(SHIP_BLINK_DUR * FPS);
        ship.blinkNum -= 1;
      }
    }
  } else {
    // draw explosion
    ctx.fillStyle = 'darkred';
    ctx.beginPath();
    ctx.arc(ship.x, ship.y, ship.r * 1.7, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(ship.x, ship.y, ship.r * 1.4, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.fillStyle = 'orange';
    ctx.beginPath();
    ctx.arc(ship.x, ship.y, ship.r * 1.1, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(ship.x, ship.y, ship.r * 0.8, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(ship.x, ship.y, ship.r * 0.5, 0, Math.PI * 2, false);
    ctx.fill();
  }

  // dawing lasers
  for (let i = 0; i < ship.lasers.length; i += 1) {
    if (ship.lasers[i].explodeTimeLaser === 0) {
      ctx.fillStyle = 'salmon';
      ctx.beginPath();
      ctx.arc(ship.lasers[i].x, ship.lasers[i].y, SHIP_SIZE / 15, 0, Math.PI * 2, false);
      ctx.fill();
    } else {
      // draw the explosion
      ctx.fillStyle = 'oragnered';
      ctx.beginPath();
      ctx.arc(ship.lasers[i].x, ship.lasers[i].y, ship.r * 0.75, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.fillStyle = 'salmon';
      ctx.beginPath();
      ctx.arc(ship.lasers[i].x, ship.lasers[i].y, ship.r * 0.5, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.fillStyle = 'pink';
      ctx.beginPath();
      ctx.arc(ship.lasers[i].x, ship.lasers[i].y, ship.r * 0.25, 0, Math.PI * 2, false);
      ctx.fill();
    }
  }

  // draw game text
  if (textAlpha >= 0) {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = `rgba(255, 255, 255, ${textAlpha})`;
    ctx.font = `small-caps ${TEXT_SIZE}px sans-serif`;
    ctx.fillText(text, canv.width / 2, canv.height * 0.75);
    textAlpha -= (1.0 / TEXT_FADE_TIME / FPS);
  } else if (ship.dead) {
    newGame();
  }
  // draw lives
  let lifeColor;
  for (let i = 0; i < lives; i += 1) {
    lifeColor = exploding && i === lives - 1 ? 'red' : 'white';
    drawShip(SHIP_SIZE + i * SHIP_SIZE * 1.2, SHIP_SIZE, 0.5 * Math.PI, lifeColor);
  }

  // draw score.
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.font = `small-caps ${TEXT_SIZE}px sans-serif`;
  ctx.fillText(score, canv.width - SHIP_SIZE / 2, SHIP_SIZE);

  // draw high score
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.font = `small-caps ${(TEXT_SIZE * 0.75)}px sans-serif`;
  ctx.fillText(`Top ${scoreHigh}`, canv.width / 2, SHIP_SIZE);

  // detect laser hits roids
  let ax;
  let ay;
  let ar;
  let lx;
  let ly;
  for (let i = roids.length - 1; i >= 0; i -= 1) {
    // grab asteroid properties
    ax = roids[i].x;
    ay = roids[i].y;
    ar = roids[i].r;

    // lop over the lasers
    for (let j = ship.lasers.length - 1; j >= 0; j -= 1) {
      lx = ship.lasers[j].x;
      ly = ship.lasers[j].y;
      // detect hits
      if (ship.lasers[j].explodeTimeLaser === 0 && distBetweenPoints(ax, ay, lx, ly) < ar) {
        // destory the asteroid and activate laser explosion
        destroyAsteroid(i);
        ship.lasers[j].explodeTimeLaser = Math.ceil(LASER_EXPLODE_DUR * FPS);
        break;
      }
    }
  }
  // drawing asteroids
  let x;
  let y;
  let r;
  let a;
  let vert;
  let offs;
  for (let i = 0; i < roids.length; i += 1) {
    ctx.strokeStyle = 'red';
    ctx.lineWidth = SHIP_SIZE / 20;
    // get asteroid properties
    x = roids[i].x;
    y = roids[i].y;
    r = roids[i].r;
    a = roids[i].a;
    vert = roids[i].vert;
    offs = roids[i].offs;
    // console.log([roids[i].x]);
    // drawing a path
    ctx.beginPath();
    ctx.moveTo(
      x + r * offs[0] * Math.cos(a),
      y + r * offs[0] * Math.sin(a),
    );
    // draw a plygon
    for (let j = 1; j < vert; j += 1) {
      ctx.lineTo(
        x + r * offs[j] * Math.cos(a + j * Math.PI * (2 / vert)),
        y + r * offs[j] * Math.sin(a + j * Math.PI * (2 / vert)),
      );
    }
    ctx.closePath();
    ctx.stroke();
    // boudning circle of astroid
    if (SHOW_BOUNDING) {
      ctx.strokeStyle = 'lime';
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2, false);
      ctx.stroke();
    }

    if (ship.blinkNum === 0 && !ship.dead) {
      // eslint-disable-next-line no-shadow
      for (let i = 0; i < roids.length; i += 1) {
        if (distBetweenPoints(ship.x, ship.y, roids[i].x, roids[i].y) < ship.r + roids[i].r) {
          explodeShip();
          destroyAsteroid(i);
        }
      }
    }

    // move the asteroid
    roids[i].x += roids[i].xv;
    roids[i].y += roids[i].yv;

    // handle edge of screen
    // eslint-disable-next-line no-shadow
    for (let i = 0; i < roids.length; i += 1) {
      if (roids[i].x < 0 - roids[i].r) {
        roids[i].x = canv.width + roids[i].r;
      } else if (roids[i].x > canv.width + roids[i].r) {
        roids[i].x = 0 - roids[i].r;
      }
      if (roids[i].y < 0 - roids[i].r) {
        roids[i].y = canv.height + roids[i].r;
      } else if (roids[i].y > canv.height + roids[i].r) {
        roids[i].y = 0 - roids[i].r;
      }
    }
  }

  // thrusting flame
  if (!exploding && blinkOn) {
    if (ship.thrusting) {
      ctx.strokeStyle = 'red';
      ctx.fillStyle = 'yellow';
      ctx.lineWidth = SHIP_SIZE / 20;
      ctx.beginPath();
      ctx.moveTo( // nose of ship
        ship.x - ship.r * ((2 / 3) * Math.cos(ship.a) + 0.5 * Math.sin(ship.a)),
        ship.y + ship.r * ((2 / 3) * Math.sin(ship.a) - 0.5 * Math.cos(ship.a)),
      );
      ctx.lineTo( // back left of ship
        ship.x - ship.r * (6 / 3) * Math.cos(ship.a),
        ship.y + ship.r * (6 / 3) * Math.sin(ship.a),
      );
      ctx.lineTo( // back right of  ship
        ship.x - ship.r * ((2 / 3) * Math.cos(ship.a) - 0.5 * Math.sin(ship.a)),
        ship.y + ship.r * ((2 / 3) * Math.sin(ship.a) + 0.5 * Math.cos(ship.a)),
      );
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  }
  // center dot
  // ctx.fillStyle = 'red';
  // ctx.fillRect(ship.x - 1, ship.y - 1, 2, 2);

  if (!exploding) {
    // rotation
    ship.a += ship.rot;

    // move the ship
    ship.x += ship.thrust.x;
    ship.y += ship.thrust.y;
  } else {
    ship.explodeTime -= 1;
    if (ship.explodeTime === 0) {
      lives -= 1;
      if (lives === 0) {
        gameOver();
      } else {
        ship = newShip();
      }
    }
  }
  // move the lasers
  for (let i = ship.lasers.length - 1; i >= 0; i -= 1) {
    // check dist travled and delete
    if (ship.lasers[i].dist > LASER_DIST * canv.width) {
      ship.lasers.splice(i, 1);
    }

    // handle the explosion
    if (ship.lasers[i].explodeTimeLaser > 0) {
      ship.lasers[i].explodeTimeLaser -= 1;

      // destroy the laser after the duration is up
      if (ship.lasers[i].explodeTimeLaser === 0) {
        ship.lasers.splice(i, 1);
      }
    } else {
    // move the laser
      ship.lasers[i].x += ship.lasers[i].xv;
      ship.lasers[i].y += ship.lasers[i].yv;
      // calculate dist travled
      ship.lasers[i].dist += Math.sqrt(ship.lasers[i].xv ** 2 + ship.lasers[i].yv ** 2);
    }

    // handle edge of screen
    if (ship.lasers[i].x < 0) {
      ship.lasers[i].x = canv.width;
    } else if (ship.lasers[i].x > canv.width) {
      ship.lasers[i].x = 0;
    }
    if (ship.lasers[i].y < 0) {
      ship.lasers[i].y = canv.height;
    } else if (ship.lasers[i].y > canv.height) {
      ship.lasers[i].y = 0;
    }
  }

  return (
    <> </>
  );
}
setInterval(AsteroidGame, 1000 / FPS);
export default AsteroidGame;
