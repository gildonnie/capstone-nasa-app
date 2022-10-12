import React, { useState } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import AsteroidData from '../components/AsteroidData';
import { RootState } from '../store';
import { useAppSelector } from '../store/hooks';

const NearEarth = styled.div`
  border: 1px solid gray;
  text-align: center;
  height: 10rem;
  width: 20rem;
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  color: 'black',
  boxShadow: 24,
  p: 4,
};

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
    console.log(cardData);
  };
  const bool = cardData.is_potentially_hazardous_asteroid;
  const str = bool === true ? 'Yes' : 'No';
  return (
    <>
      <AsteroidData />
      <Wrapper>
        {asData && asData.map((objects) => (
          <NearEarth onClick={() => handleOpen(objects)}>
            {objects.name}
          </NearEarth>
        ))}
      </Wrapper>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
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
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              test
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default Asteroid;
