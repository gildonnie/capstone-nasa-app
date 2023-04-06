/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { saveAs } from 'file-saver';
import NavBar from '../components/NavBar';
import Stars from '../images/stars.jpg';
import { useAuth } from '../utils/AuthContext';

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
type dataEmail = {
  email: string,
}

type FavTypes = {
  date?: dateData,
  url?: dataUrl,
  title?: dataTitle,
  email?: dataEmail,
  _id: string,
}
type favorite = {
  date: string,
  url: string,
  title: string,
  _id: string,
  email: string,
}

function Favorites() {
  // const navigate = useNavigate();
  const [favorites, setFavorites] = useState<favorite[]>([]);
  const { currentUser } = useAuth();
  useEffect(() => {
    const fetchFavoirtes = async () => {
      const fav = await fetch('/favorites');
      const FavData = await fav.json();
      const newFav = FavData.map((item: FavTypes) => {
        const favObj = {
          email: item.email,
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
        console.log(response.status);
        // navigate(0);
        window.location.reload();
      });
  };

  const downloadImg = (url: any, title: string) => {
    saveAs(url, `${title}.jpg`);
    // saveAs(url, `${title}.jpg`);
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
              url, title, date, _id, email,
            } = favorites[parseInt(value, 10)];
            if (email === currentUser.email) {
              return (
                <Border>
                  <img id="photo" src={url} alt="favorite images" />
                  <p>{title}</p>
                  <p>{date}</p>
                  <button type="button" onClick={(e) => deleteFav(_id, e)}>Remove</button>
                  <button type="button" onClick={() => downloadImg(url, title)}>Download</button>
                </Border>
              );
            }
            return null;
          })}
        </div>
      </FavWrap>
    </motion.div>
  );
}

export default Favorites;
