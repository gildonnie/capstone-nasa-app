/* eslint-disable camelcase */
import React, { useState } from 'react';
import styled from 'styled-components';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { RootState } from '../store';
import { useAppSelector } from '../store/hooks';
import { useAuth } from '../utils/AuthContext';

const ImgWrap = styled.div`
  img {
    width: 800px;
    height: 600px;
    margin-bottom: 2rem;
    // border: 1px red solid;
    border-radius: 1rem;
    filter: drop-shadow(0 0 .5rem #A27468);
  }
  button {
    margin-top: 1rem;
    width: 150px;
    height: 30px;
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
  }
  
`;
const Icon = styled(FontAwesomeIcon)`  
  height: 25px;
  cursor: pointer;
`;
function ImageComponent() {
  const [colors, setColors] = useState('white');
  const { rData } = useAppSelector((state: RootState) => state.rover);
  const { currentUser } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log(rData);
  const goToPrev = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? rData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === rData.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToReset = () => {
    setCurrentIndex(0);
  };

  const addFavorites = async () => {
    const { img_src, earth_date } = rData[currentIndex];
    setColors('red');
    const Data = {
      img_src: { img_src },
      earth_date: { earth_date },
      email: currentUser.email,
    };
    const results = await fetch('/rfavorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Data),
    });
    const resultJson = await results.json();
    return resultJson;
  };
  return (
    <ImgWrap>
      <button type="button" onClick={goToPrev}>Prev</button>
      <button type="button" onClick={goToReset}>Reset</button>
      <button type="button" onClick={goToNext}>Next</button>
      <div>
        <Icon className="heart" type="submit" onClick={addFavorites} style={{ color: `${colors}` }} icon={faHeart as IconProp} />
        <h2>
          Image:
          {' '}
          {currentIndex + 1}
        </h2>
        <img src={rData[currentIndex] && rData[currentIndex].img_src} alt="Mars Photos" />
      </div>
    </ImgWrap>
  );
}

export default ImageComponent;
