import { useEffect, useReducer } from 'react';
import './App.css';
import axios, { AxiosResponse } from 'axios';
import {
  ActionType,
  CatFetchState,
  catFetchReducer,
  initialState,
} from './catReducer';

const CAT_URL = 'https://api.thecatapi.com/v1';
const initialFetchState: CatFetchState = {
  loading: false,
  error: '',
  cat: initialState,
};
function App() {
  const [state, dispatch] = useReducer(catFetchReducer, initialFetchState);
  // const [cats, setCats] = useState<CatTributes>({ id: '', url: '' });
  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string>('');

  // get random cat image from API
  const getCats = async () => {
    // loading state begins
    dispatch({ type: ActionType.FETCH_START });

    // grab random cat photo
    const response: void | AxiosResponse = await axios
      .get(`${CAT_URL}/images/search`)
      .catch((err) => {
        // set error state
        dispatch({ type: ActionType.FETCH_ERROR, payload: err.message });
        console.error(err);
      });

    if (!response) {
      dispatch({
        type: ActionType.FETCH_ERROR,
        payload: 'sorry, cat is napping and not avaliable for pics today!',
      });
      return;
    }

    // extracting data
    const { data } = response;
    const [{ url, id }] = data;
    console.log({ url, id });

    // setting state
    dispatch({
      type: ActionType.FETCH_SUCCESS,
      payload: {
        id,
        url,
      },
    });
  };

  // load random cat image on load
  useEffect(() => {
    getCats();
  }, []);

  // return jsx showing cat picture and button
  // to load next cat picture
  return (
    <div className='App'>
      {state.loading && <p>Loading...</p>}
      {state.error && <p data-testid='error'>{state.error}</p>}
      {state.cat.id !== '' && (
        <div style={{ margin: '15px' }}>
          <img
            style={{ height: '50vmin' }}
            src={state.cat.url}
            alt='cute cat'
          />
          {/* <p>image ID: {cats.id}</p> */}
        </div>
      )}
      <button disabled={state.loading} onClick={getCats}>
        Get Cute Cat Pic
      </button>
    </div>
  );
}

export default App;
