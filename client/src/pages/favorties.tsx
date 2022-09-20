/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

const FavWrap = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`;
const Border = styled.div`
  text-align: center;
  border: 1px solid gray;
  width: 200px;
  height: auto;
  img {
    width: 150px;
  }
`;

type dateData = {
  date: string,
}
type dataUrl = {
  url: string,
}
type dataTitle = {
  title: string,
}

type FavTypes = {
  date?: dateData,
  url?: dataUrl,
  title?: dataTitle,
  _id: string,
}
type favorite = {
  date: string,
  url: string,
  title: string,
  _id: string,
}

function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavoirtes] = useState<favorite[]>([]);
  useEffect(() => {
    const fetchFavoirtes = async () => {
      const fav = await fetch('http://localhost:5000/favorites');
      const FavData = await fav.json();
      const newFav = FavData.map((item: FavTypes) => {
        const favObj = {
          date: item.date?.date,
          url: item.url?.url,
          title: item.title?.title,
          _id: item._id,
        };
        return favObj;
      });
      setFavoirtes(newFav);
    };
    fetchFavoirtes();
  }, []);

  const deleteFav = (_id: string, e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    fetch(`http://localhost:5000/favorites/${_id}`, { method: 'DELETE' })
      .then((response) => { console.log(response.status); navigate(0); });
  };

  return (
    <FavWrap>
      {Object.keys(favorites).length > 0 && Object.keys(favorites).map((value) => {
        const index = parseInt(value, 10);
        return (
          <Border>
            <img src={favorites[index].url} alt="favorite images" />
            <p>{favorites[index].title}</p>
            <p>{favorites[index].date}</p>
            <button type="button" onClick={(e) => deleteFav(favorites[index]._id, e)}>Remove</button>
          </Border>
        );
      })}

    </FavWrap>
  );
}

export default Favorites;
