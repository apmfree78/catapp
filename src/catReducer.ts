// defining action types
export const enum ActionType {
  FETCH_START = 'FetchStart',
  FETCH_ERROR = 'FetchError',
  FETCH_SUCCESS = 'FetchSuccess',
}

// defining interfaces for
// API data, loading error and data state
// and Action Creators
export interface CatTributes {
  id: string;
  url: string;
}

export interface CatFetchState {
  loading: boolean;
  error: string;
  cat: CatTributes;
}

interface FetchStart {
  type: ActionType.FETCH_START;
}

interface FetchError {
  type: ActionType.FETCH_ERROR;
  payload: string;
}

interface FetchSuccess {
  type: ActionType.FETCH_SUCCESS;
  payload: CatTributes;
}

type FetchAction = FetchSuccess | FetchError | FetchStart;

export const initialState: CatTributes = { id: '', url: '' };

// main reducer function to process Actions
export function catFetchReducer(
  state: CatFetchState,
  action: FetchAction
): CatFetchState {
  const { type } = action;

  switch (type) {
    case ActionType.FETCH_SUCCESS:
      return {
        loading: false,
        error: '',
        cat: action.payload,
      };
    case ActionType.FETCH_ERROR:
      return {
        loading: false,
        error: action.payload,
        cat: initialState,
      };
    case ActionType.FETCH_START:
      return {
        loading: true,
        error: '',
        cat: initialState,
      };
    default:
      return state;
  }
}
