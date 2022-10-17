import React from 'react';
// import { useParams } from 'react-router';
import styled from 'styled-components';
import Popup from './Popup';

const PopupContainer = styled.div`
  bakcground-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
const PopupWrap = styled(PopupContainer)`
  background-color: white;
  color: black;
  width: 15rem;
  height: 15rem;
  z-index: 10;
  position: fixed;
  top: 10px;
  right: 20px;
`;

interface PopupWrapperProps {
  isPopupVisible: boolean;
  onBackdropClick: () => void;
}

// eslint-disable-next-line react/function-component-definition
const PopupWrapper: React.FC<PopupWrapperProps> = ({ onBackdropClick, isPopupVisible }) => {
  if (!isPopupVisible) {
    return null;
  }
  return (
    <Popup onBackdropClick={onBackdropClick}>
      <PopupWrap>
        <p>test</p>
      </PopupWrap>
    </Popup>
  );
};

export default PopupWrapper;
