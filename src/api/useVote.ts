import axios, { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import assert from 'assert';

interface VoteProps {
  image_id: string;
  value: 1 | -1;
}

const QUERY_KEY = 'catPics';

export function getQueryKey(page?: number) {
  if (page === undefined) return [QUERY_KEY];
  return [QUERY_KEY, page];
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

  return await axios.post(process.env.REACT_APP_VOTE_URL, catVote, {
    headers: { 'x-api-key': process.env.REACT_APP_API_KEY },
  });
}

export function useVote(catVote: VoteProps) {
  const queryClient = useQueryClient();
  return useMutation((catVote: VoteProps) => postCatVotes(catVote), {
    onMutate: async () => {
      await queryClient.cancelQueries(getQueryKey());
    },
  });
}

// export function useVote(catVote: VoteProps) {
//   const queryClient = useQueryClient();
//   return useMutation(
//     (catVote: VoteProps) =>
//       axios.post(VOTE_URL, catVote, {
//         headers: { 'x-api-key': API_KEY },
//       }),
//     {
//       onMutate: async () => {
//         await queryClient.cancelQueries(['catPics']);
//       },
//     }
//   );
// }
