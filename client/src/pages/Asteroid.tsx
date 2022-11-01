import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { motion } from 'framer-motion';
import AsteroidData from '../components/AsteroidData';
import { RootState } from '../store';
import { useAppSelector } from '../store/hooks';
import NavBar from '../components/NavBar';
import AsteroidBack from '../images/asteroidBack.jpg';
import AsteroidCard from '../images/asteroidCard.jpg';
import AsteroidCard2 from '../images/asteroidCard4.jpg';

const NearEarth = styled.div`
  border: 1px solid  #96B1AD;
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10rem;
  width: 100%;
  cursor: pointer;
  border-radius: 1rem;
  background-color: rgba(0,178,167, 0.3);
  transition: .3s;
  &:hover {
    transform: scale(1.05);
    z-index: 2;
  }
`;
const Wrapper = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${AsteroidBack});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  .cards {
    width: 900px;
    text-align: center;
    margin-left: 50%;
    transform: translate(-50%);
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;
const Wrap = styled(Box)`
  border-radius: 1.5rem;
  position: absolute;
  top: 50%
  left: 50%;
  display: flex;
  justify-content: center;
  width: 400px;
  border: 1px solid #96B1AD;
  color: black
  box-shadow: 24px;
  padding: 4px;
`;

const MainWrap = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

type orbitalProps = {
  first_observation_date: string
  last_observation_date: string
}
type mileProp = {
  estimated_diameter_max: number
  estimated_diameter_min: number
}
type diaProps = {
  miles: mileProp
}

type cardDataProps = {
  name: string
  name_limited: string
  absolute_magnitude_h: number
  orbital_data: orbitalProps
  estimated_diameter: diaProps
  is_potentially_hazardous_asteroid: boolean
}

function Asteroid() {
  const [open, setOpen] = useState(false);
  const [background, setBackground] = useState();
  const [cardData, setCardData] = useState<cardDataProps>({
    name: '',
    name_limited: '',
    absolute_magnitude_h: 0,
    orbital_data: {
      first_observation_date: '',
      last_observation_date: '',
    },
    estimated_diameter: {
      miles: {
        estimated_diameter_max: 0,
        estimated_diameter_min: 0,
      },
    },
    is_potentially_hazardous_asteroid: false,
  });
  const handleClose = () => setOpen(false);
  const { asData } = useAppSelector((state: RootState) => state.asteroid);
  const handleOpen = (event: React.SetStateAction<cardDataProps>) => {
    setOpen(true);
    setCardData(event);
  };
  const bool = cardData.is_potentially_hazardous_asteroid;
  const str = bool === true ? 'Yes' : 'No';

  useEffect(() => {
    if (bool === true) {
      setBackground(AsteroidCard2);
    } else {
      setBackground(AsteroidCard);
    }
  }, [str]);

  const cardStyling = {
    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'noRepeat',
    backgroundSize: 'cover',
    overflow: 'hidden',
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AsteroidData />
      <Wrapper>
        <NavBar />
        <div className="cards">
          {asData.map((objects) => (
            <NearEarth onClick={() => handleOpen(objects)}>
              {objects.name}
            </NearEarth>
          ))}
        </div>
      </Wrapper>

      <div>
        <MainWrap
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Wrap style={cardStyling}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <p>
                Name:
                {' '}
                {cardData.name}
              </p>
              <p>
                First Date Seen:
                {' '}
                {cardData.orbital_data.first_observation_date}
              </p>
              <p>
                Last Date Seen:
                {' '}
                {cardData.orbital_data.last_observation_date}
              </p>
              <p>
                Max Diameter:
                {' '}
                {cardData.estimated_diameter.miles.estimated_diameter_max}
              </p>
              <p>
                Min Diameter:
                {' '}
                {cardData.estimated_diameter.miles.estimated_diameter_min}
              </p>
              <p>
                Is The Asteroid Dangerous:
                {' '}
                {str}
              </p>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }} />
          </Wrap>
        </MainWrap>
      </div>
    </motion.div>
  );
}

export default Asteroid;
