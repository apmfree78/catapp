import { axios } from './axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import assert from 'assert';
import { getQueryKey } from './queryKey';
import { VoteProps } from './types';

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
    .post('/votes', catVote
    )
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
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
