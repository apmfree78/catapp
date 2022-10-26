import { axios } from './axios';
import assert from 'assert';
import { VoteProps } from './types';

export async function getCats() {
  const { data } = await axios.get('/images/search');
  return data;
}

export async function postCatVotes(catVote: VoteProps) {
  assert(
    process.env.REACT_APP_VOTE_URL,
    'env variable not set:process.env.REACT_APP_VOTE_URL'
  );
  assert(
    process.env.REACT_APP_API_KEY,
    'env variable not set:process.env.REACT_APP_API_KEY'
  );

  return await axios
    .post('/votes', catVote)
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}
