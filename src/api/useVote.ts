import axios, { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface VoteProps {
  image_id: string;
  value: 1 | -1;
}

const CAT_URL = 'https://api.thecatapi.com/v1';
const VOTE_URL = '${CAT_URL}/votes';
const API_KEY = 'b08e14e2-e1c9-41b9-8ce6-cb76f5ca851f';

export async function postCatVotes(catVote: VoteProps) {
  return await axios.post(VOTE_URL, catVote, {
    headers: { 'x-api-key': API_KEY },
  });
}

export function useVote(catVote: VoteProps) {
  const queryClient = useQueryClient();
  return useMutation((catVote: VoteProps) => postCatVotes(catVote), {
    onMutate: async () => {
      await queryClient.cancelQueries(['catPics']);
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
