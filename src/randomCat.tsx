import { useEffect, useState } from 'react';
import './App.css';
import axios, { AxiosResponse } from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface CatTributes {
  id: string;
  url: string;
  width: number;
  height: number;
}

interface VoteProps {
  image_id: string;
  value: 1 | -1;
}

const CAT_URL = 'https://api.thecatapi.com/v1';
const VOTE_URL = 'https://api.thecatapi.com/v1/votes';
const API_KEY = 'b08e14e2-e1c9-41b9-8ce6-cb76f5ca851f';
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

export function useVote(catVote: VoteProps) {
  const queryClient = useQueryClient();
  const resolveVoteMutation = useMutation(
    (catVote: VoteProps) => axios.post(VOTE_URL, catVote),
    {
      onMutate: async () => {
        await queryClient.cancelQueries(['catPics']);
      },
    }
  );

  return resolveVoteMutation;
}

function RandomCat() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useCats(page);

  const queryClient = useQueryClient();
  const resolveVoteMutation = useMutation(
    (catVote: VoteProps) =>
      axios
        .post(VOTE_URL, catVote, {
          headers: { 'x-api-key': API_KEY },
        })
        .then((res) => console.log(res)),
    {
      onMutate: async () => {
        await queryClient.cancelQueries(['catPics']);
      },
    }
  );
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
      {id && (
        <button
          disabled={isLoading}
          onClick={() => resolveVoteMutation.mutate({ image_id: id, value: 1 })}
        >
          Up Vote
        </button>
      )}
    </div>
  );
}

export default RandomCat;
