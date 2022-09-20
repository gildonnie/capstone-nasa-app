import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  margin-top: 12%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
`;

const ExploreWrap = styled.div`
  border: 1px solid red;
  width: 400px;
  height: 400px;
`;

function Explore() {
  return (
    <Container>
      <ExploreWrap><Link to="/apod">Picture of The Day</Link></ExploreWrap>
      <ExploreWrap>Rovers</ExploreWrap>
      <ExploreWrap>Objects Near Earth</ExploreWrap>
    </Container>
  );
}

export default Explore;
