
const QUERY_KEY = 'catPics';

export function getQueryKey(page?: number) {
  if (page === undefined) return [QUERY_KEY];
  return [QUERY_KEY, page];
}
