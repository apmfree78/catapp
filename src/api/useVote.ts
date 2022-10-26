import { axios } from './axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from './queryKey';
import { VoteProps } from './types';
import { postCatVotes } from './cats';

export function useVote(catVote: VoteProps) {
  const queryClient = useQueryClient();
  return useMutation((catVote: VoteProps) => postCatVotes(catVote), {
    onMutate: async () => {
      await queryClient.cancelQueries(getQueryKey());
    },
  });
}
