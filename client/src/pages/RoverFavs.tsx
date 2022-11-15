/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
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

type dataImgUrl = {
  img_src: string,
}
type dataEarthDate = {
  earth_date: string,
}
type dataEmail = {
  email: string,
}

type FavTypes = {
  _id: string,
  img_src?: dataImgUrl,
  earth_date? : dataEarthDate,
  email?: dataEmail,
}
type favorite = {
  _id: string,
  img_src?: string,
  earth_date?: string,
  email?: string,
}

function Favorites() {
  const navigate = useNavigate();
  const [rofavorites, setRofavorites] = useState<favorite[]>([]);
  const { currentUser } = useAuth();
  useEffect(() => {
    const fetchFavoirtes = async () => {
      const fav = await fetch('/rfavorites');
      const FavData = await fav.json();
      const newFav = FavData.map((item: FavTypes) => {
        const favObj = {
          _id: item._id,
          img_src: item.img_src?.img_src,
          earth_date: item.earth_date?.earth_date,
          email: item.email,
        };
        return favObj;
      });
      setRofavorites(newFav);
    };
    fetchFavoirtes();
  }, []);

  const deleteFav = (_id: string, e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    fetch(`/rfavorites/${_id}`, { method: 'DELETE' })
      .then((response) => {
        console.log(response.status); navigate(0);
      });
  };

  const downloadImg = (img_src: any) => {
    saveAs(img_src, 'image.jpg');
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
          {Object.keys(rofavorites).length > 0 && Object.keys(rofavorites).map((value) => {
            const {
              _id, img_src, earth_date, email,
            } = rofavorites[parseInt(value, 10)];
            if (email === currentUser.email) {
              return (
                <Border>
                  <img id="photo" src={img_src} alt="favorite images" />
                  <p>{earth_date}</p>
                  <button type="button" onClick={(e) => deleteFav(_id, e)}>Remove</button>
                  <button type="button" onClick={() => downloadImg(img_src)}>Download</button>
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
