import React, { useState } from 'react';
import styled from 'styled-components';
import { shallowEqual } from 'react-redux';
// import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store';
import ApodData from '../components/ApodData';
import { setNewDate, setInput } from '../store/apodSlice';
import NavBar from '../components/NavBar';
import BackgroundImg from '../images/potdBack.jpg';

const Wrapper = styled.div`
background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${BackgroundImg});
background-position: center;
background-repeat: no-repeat;
background-size: cover;
width: 100%;
height: 100%;
  text-align: center;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    label {
      color: #96B1AD;
    }
    input {
      display: block;
      width: 20rem;
      text-align: center;
      height: 2rem;
      background: transparent;
      background-color: black;
      border: 1px solid #00B2A7;
      color: white;
      margin-top: .5rem;
      margin-bottom: .75rem;
    }
    button {
      width: 150px;
      height: 30px;
      color: red;
      background-color: transparent;
      cursor: pointer;
      border: 1px solid #00B2A7;
      color: #00B2A7;
      &:nth-child(1) {
        margin-bottom: 2rem;
      }
      &:hover {
        cursor: pointer;
        border: 1px solid #96B1AD;
        color: #96B1AD;
      }
    }
  }
  .body-wrap {
    margin-top: -2rem;
   display: grid;
   grid-template-columns: 1fr 1fr;
    .image-wrap {
      background: #000000;
      filter: drop-shadow(0 0 .2rem #96B1AD);
      border-radius: 1rem;
      height: 100%;
      width: 100%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        object-fit: contain;
      }
    }
    .text-wrap {
      filter: drop-shadow(0 0 .2rem #96B1AD);
      border-radius: 1rem;
      background: #000000;
      padding: 1rem;
      .heart {
        margin-left: 90%;
      }
      h1, h3 {
        color: #96B1AD;
      }
    }
  }

`;

const Icon = styled(FontAwesomeIcon)`  
  height: 25px;
  cursor: pointer;
`;

function Apod() {
  const [colors, setColor] = useState('white');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { apData, input } = useAppSelector((state: RootState) => state.apod, shallowEqual);
  const {
    url, title, date, explanation,
  } = apData;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setNewDate(input));
  };

  const addFavorites = async () => {
    setColor('red');
    const Data = {
      title: { title },
      date: { date },
      url: { url },
    };
    const results = await fetch('/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Data),
    });
    const resultJson = await results.json();
    return resultJson;
  };

  function ClearFields() {
    (document.getElementById('date') as HTMLInputElement).value = ''; navigate(0);
  }
  return (
    <>
      <ApodData />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Wrapper>
          <NavBar />
          <div className="body-wrap">
            <div className="image-wrap">
              <img src={url} alt={title} />
            </div>
            <div className="text-wrap">
              <Icon className="heart" type="submit" onClick={addFavorites} style={{ color: `${colors}` }} icon={faHeart as IconProp} />
              <h1>
                {title}
                {' '}
              </h1>
              <h3>{date}</h3>
              <p>{explanation}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="date">
              Search Past Date
              <input
                type="date"
                value={input}
                id="date"
                placeholder="YYYY-MM-DD"
                data-testid="search"
                onChange={(e) => dispatch(setInput(e.target.value))}
              />
            </label>
            <button type="submit" data-testid="button">Search</button>
            <div data-testid="reset-button">
              <button type="button" onClick={ClearFields}>Reset</button>
            </div>
          </form>
        </Wrapper>
      </motion.div>
    </>
  );
}
export default Apod;
