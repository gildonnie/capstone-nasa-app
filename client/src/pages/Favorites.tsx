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
  const [favorites, setFavorites] = useState<favorite[]>([]);
  useEffect(() => {
    const fetchFavoirtes = async () => {
      const fav = await fetch('/favorites');
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
      setFavorites(newFav);
    };
    fetchFavoirtes();
  }, []);

  const deleteFav = (_id: string, e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    fetch(`/favorites/${_id}`, { method: 'DELETE' })
      .then((response) => {
        console.log(response.status); navigate(0);
      });
  };

  return (
    <FavWrap>
      {Object.keys(favorites).length > 0 && Object.keys(favorites).map((value) => {
        const {
          url, title, date, _id,
        } = favorites[parseInt(value, 10)];
        return (
          <Border>
            <img src={url} alt="favorite images" />
            <p>{title}</p>
            <p>{date}</p>
            <button type="button" onClick={(e) => deleteFav(_id, e)}>Remove</button>
          </Border>
        );
      })}

    </FavWrap>
  );
}

export default Favorites;
