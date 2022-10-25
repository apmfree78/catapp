import { useEffect, useState } from 'react';
import './App.css';
import axios, { AxiosResponse } from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCats } from './api/useCat';
import { useVote } from './api/useVote';

function RandomCat() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useCats(page);
  const [{ url, id }] = data || [{}];
  const catVote = useVote({ image_id: id || '', value: 1 });

  console.log(data);

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
      {id && (
        <button
          disabled={isLoading}
          onClick={() => catVote.mutate({ image_id: id, value: 1 })}
        >
          Up Vote
        </button>
      )}
    </div>
  );
}

export default RandomCat;
