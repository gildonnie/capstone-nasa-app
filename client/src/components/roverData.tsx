import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;

function roverData() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=${apiKey}`)
      .then((res) => {
        console.log(res);
        setData(res);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>test</div>
  );
}

export default roverData;
