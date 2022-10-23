import { useEffect, useState } from 'react';
import './App.css';
import axios, { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';

interface CatTributes {
  id: string;
  url: string;
  width: number;
  height: number;
}

const CAT_URL = 'https://api.thecatapi.com/v1';

export async function getCats() {
  const { data } = await axios.get(CAT_URL);
  return data;
}

export function useCats() {
  const query = useQuery<CatTributes, Error>(['catPics'], () => getCats());
  return query;
}

function RandomCat() {
  // const [cats, setCats] = useState<CatTributes>({ id: '', url: '' });
  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState('');

  const { data, isLoading, isError, error } = useCats();

  // if (!data) return <div></div>;
  console.log(data);

  const { url, id } = data || {};

  // return jsx showing cat picture and button
  // to load next cat picture
  return (
    <div className='App'>
      {isLoading && <p>Loading...</p>}
      {isError && <p data-testid='error'>'Error'</p>}
      {id !== '' && (
        <div style={{ margin: '15px' }}>
          <img style={{ height: '50vmin' }} src={url} alt='cute cat photo' />
          {/* <p>image ID: {cats.id}</p> */}
        </div>
      )}
      <button disabled={isLoading}>Get Cute Cat Pic</button>
    </div>
  );
}

export default RandomCat;
