import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;

function apodData() {
  const [data, setData] = useState({});
  const [newDate, setNewDate] = useState('');

  useEffect(() => {
    axios
      .get(`https://api.nasa.gov/planetary/apod?date=${newDate}&api_key=${apiKey}`)
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
        console.log(data);
        setNewDate('2022-05-12');
      })
      .catch((err) => console.log(err));
  }, [newDate]);

  return (
    <div>test</div>
  );
}

export default apodData;
