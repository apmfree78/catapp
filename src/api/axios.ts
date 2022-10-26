import Axios from 'axios';
import assert from 'assert';

assert(
  process.env.REACT_APP_BASE_URL,
  'env variable not set:process.env.REACT_APP_BASE_URL'
);
export const axios = Axios.create({ baseURL: process.env.REACT_APP_BASE_URL });


