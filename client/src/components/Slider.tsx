import React, { useState } from 'react';
import styled from 'styled-components';
import { RootState } from '../store';
import { useAppSelector } from '../store/hooks';

const ImgWrap = styled.div`
img {
  width: 400px;
  height: 400px;
}
`;
function Slider() {
  const { rData } = useAppSelector((state: RootState) => state.rover);

  const [currentIndex, setCurrentIndex] = useState(0);
  const goToPrev = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? rData[currentIndex].length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === rData[currentIndex].length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <ImgWrap>
      <button type="button" onClick={goToPrev}>Prev</button>
      <button type="button" onClick={goToNext}>Next</button>
      <div>
        <h2>
          Image:
          {' '}
          {currentIndex}
        </h2>
        <img src={rData[currentIndex] && rData[currentIndex].img_src} alt="Mars Photos" />
      </div>
    </ImgWrap>
  );
}

export default Slider;
