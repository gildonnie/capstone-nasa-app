/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import NavBar from '../components/NavBar';
import Stars from '../images/stars.jpg';

const FavWrap = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${Stars});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
  .wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 1rem;
  }
`;
const Border = styled.div`
  text-align: center;
  border: 1px solid #96B1AD;
  border-radius: 1rem;
  width: 100%;
  height: 100%;
  overflow: hidden;
  button {
    width: 150px;
    height: 30px;
    color: red;
    background-color: transparent;
    cursor: pointer;
    border: 1px solid #00B2A7;
    color: #00B2A7;
    &:hover {
      cursor: pointer;
      border: 1px solid #96B1AD;
      color: #96B1AD;
    }
  }
  img {
    width: 300px;
    height: 200px;
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <FavWrap>
        <NavBar />
        <div className="wrapper">
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
        </div>
      </FavWrap>
    </motion.div>
  );
}

export default Favorites;
