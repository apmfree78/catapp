import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from './queryKey';
import { CatTributes } from './types'

export async function getCats() {
  const { data } = await axios.get(
    `${process.env.REACT_APP_CAT_URL}/images/search`
  );
  return data;
}

export function useCats(page: number) {
  const query = useQuery<CatTributes[], Error>(
    getQueryKey(page),
    () => getCats(),
    { keepPreviousData: true, staleTime: 60000 }
  );
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.prefetchQuery(getQueryKey(page), () => getCats());
  }, [queryClient, page]);
  return query;
}
