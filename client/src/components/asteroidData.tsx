import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;

function asteroidData() {
  const [data, setData] = useState({});
  useEffect(() => {
    axios
      .get(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${apiKey}`)
      .then((res) => {
        // console.log(res);
        setData(res);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>test</div>
  );
}

export default asteroidData;
