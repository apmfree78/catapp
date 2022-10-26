import Axios, { AxiosRequestConfig } from 'axios';
import assert from 'assert';

assert(
  process.env.REACT_APP_BASE_URL,
  'env variable not set:process.env.REACT_APP_BASE_URL'
);

function authRequestInterceptor(config: AxiosRequestConfig) {
  assert(
    process.env.REACT_APP_API_KEY,
    'env variable not set:process.env.REACT_APP_API_KEY'
  );
  if (!config.headers) return null;
  config.headers['x-api-key'] = process.env.REACT_APP_API_KEY.toString();
  return config;
}
export const axios = Axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

axios.interceptors.request.use(authRequestInterceptor);
