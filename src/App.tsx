import React, { useEffect, useState } from 'react';
import './App.css';
import axios, { AxiosResponse } from 'axios';
// these will later be set to env variables
const API_KEY = 'b08e14e2-e1c9-41b9-8ce6-cb76f5ca851f';
const CAT_URL = 'https://api.thecatapi.com/v1';

function App() {
  const [cats, setCats] = useState('');

  const getCats = async () => {

    // grab random cat photo
    const response: void | AxiosResponse = await axios.get(`${CAT_URL}/images/search`)
      .catch(err => console.error(err));

    if (!response) return;

    // extracting data
    const { data } = response;
    const [catributes] = data;
    console.log(catributes)

    // setting state
    setCats(catributes.url);
  }



  // load random cat image on load
  useEffect(() => {
    getCats();
  }, [])

  return (
    <div className="App">
      <img src={cats} />
    </div>
  );
}

export default App;
