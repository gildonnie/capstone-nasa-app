import React, { useState } from 'react';
import styled from 'styled-components';
import { RootState } from '../store';
import { useAppSelector } from '../store/hooks';

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
function ImageComponent() {
  const { rData } = useAppSelector((state: RootState) => state.rover);

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? rData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === rData.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    console.log(rData[currentIndex].img_src);
    console.log(currentIndex);
  };
  const goToReset = () => {
    setCurrentIndex(0);
  };
  return (
    <ImgWrap>
      <button type="button" onClick={goToPrev}>Prev</button>
      <button type="button" onClick={goToReset}>Reset</button>
      <button type="button" onClick={goToNext}>Next</button>
      <div>
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
