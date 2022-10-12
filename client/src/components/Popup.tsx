/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Overlay = styled.div`
  background-color: rgba(255,255,255, 0.9);
  position: relative;
  height: 100%
  width: 100%
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex
`;

interface PopupProps {
  onBackdropClick: () => void;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = (
  { onBackdropClick, children },
) => ReactDOM.createPortal(<Overlay
  onClick={onBackdropClick}
  onKeyDown={onBackdropClick}
  role="presentation"
>
  {children}
</Overlay>, document.getElementById('popup-root')!);

export default Popup;
