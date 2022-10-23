import { useEffect, useState } from 'react';
import './App.css';
import axios, { AxiosResponse } from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface CatTributes {
  id: string;
  url: string;
  width: number;
  height: number;
}

const CAT_URL = 'https://api.thecatapi.com/v1';

export async function getCats() {
  const { data } = await axios.get(`${CAT_URL}/images/search`);
  return data;
}

export function useCats(page: number) {
  const query = useQuery<CatTributes[], Error>(
    ['catPics', page],
    () => getCats(),
    { keepPreviousData: true, staleTime: 60000 }
  );

  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.prefetchQuery(['catPics', page + 1], () => getCats());
  }, [queryClient, page]);
  return query;
}

function RandomCat() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useCats(page);

  // if (!data) return <div></div>;
  console.log(data);

  const [{ url, id }] = data || [{}];

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
      <button disabled={isLoading} onClick={() => setPage(page + 1)}>
        Get Cute Cat Pic
      </button>
    </div>
  );
}

export default RandomCat;
