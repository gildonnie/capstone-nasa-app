import React from 'react';
import styled from 'styled-components';
import { shallowEqual } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store';
import ApodData from '../components/ApodData';
import { setNewDate, setInput } from '../store/apodSlice';

const Wrapper = styled.section`
  text-align: center
`;

function Apod() {
  const dispatch = useAppDispatch();
  const { apData, input } = useAppSelector((state: RootState) => state.apod, shallowEqual);
  const {
    url, title, date, explanation,
  } = apData;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setNewDate(input));
  };

  const addFavorites = async () => {
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
  return (
    <>
      <ApodData />
      <Wrapper>
        <h1>
          {title}
          {' '}
        </h1>
        <img src={url} alt={title} />
        <p>{date}</p>
        <p>{explanation}</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="date">
            Search Past Date
            <input
              type="text"
              value={input}
              id="date"
              placeholder="YYYY-MM-DD"
              onChange={(e) => dispatch(setInput(e.target.value))}
            />
          </label>
          <button type="submit">Search</button>
        </form>
        <button type="submit" onClick={addFavorites}>Favorite</button>
      </Wrapper>
    </>
  );
}
export default Apod;
