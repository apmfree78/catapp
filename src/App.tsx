import { useEffect, useState } from 'react';
import './App.css';
import axios, { AxiosResponse } from 'axios';
import { CAT_URL } from './env.js'

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
