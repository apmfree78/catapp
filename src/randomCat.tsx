import { useEffect, useState } from 'react';
import './App.css';
import axios, { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query'

interface CatTributes {
  id: string;
  url: string;
}

const CAT_URL = 'https://api.thecatapi.com/v1';

function RandomCat() {
  const [cats, setCats] = useState<CatTributes>({ id: '', url: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState('');

  // get random cat image from API
  const getCats = async () => {
    // loading state begins
    setLoading(true);
    setError('');

    // grab random cat photo
    const response: void | AxiosResponse = await axios
      .get(`${CAT_URL}/images/search`)
      .catch((err) => {
        // set error state
        setError(err.message);
        setLoading(false);
        console.error(err);
      });

    // loading done
    setLoading(false);

    if (!response) {
      setError('no cat images found! sorry!');
      return;
    }

    // extracting data
    const { data } = response;
    const [{ url, id }] = data;
    console.log({ url, id });

    // setting state
    setCats({ url, id });
  };

  // load random cat image on load
  useEffect(() => {
    getCats();
  }, []);

  // return jsx showing cat picture and button
  // to load next cat picture
  return (
    <div className='App'>
      {loading && <p>Loading...</p>}
      {error && <p data-testid='error'>{error}</p>}
      {cats.id !== '' && (
        <div style={{ margin: '15px' }}>
          <img
            style={{ height: '50vmin' }}
            src={cats.url}
            alt='cute cat photo'
          />
          {/* <p>image ID: {cats.id}</p> */}
        </div>
      )}
      <button disabled={loading} onClick={getCats}>
        Get Cute Cat Pic
      </button>
    </div>
  );
}

export default RandomCat;
