import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface CatTributes {
  id: string;
  url: string;
  width: number;
  height: number;
}

const QUERY_KEY = 'catPics';

export function getQueryKey(page?: number) {
  if (page === undefined) return [QUERY_KEY];
  return [QUERY_KEY, page];
}
const CAT_URL = 'https://api.thecatapi.com/v1';
const VOTE_URL = 'https://api.thecatapi.com/v1/votes';
const API_KEY = 'b08e14e2-e1c9-41b9-8ce6-cb76f5ca851f';
export async function getCats() {
  const { data } = await axios.get(`${process.env.REACT_APP_CAT_URL}/images/search`);
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
