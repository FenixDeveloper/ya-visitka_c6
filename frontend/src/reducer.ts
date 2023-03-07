export type State = {
  data: User | null;
  isLoading: boolean;
  error: string | null;
}

export type User = {
  _id?: string
  createdAt?: number,
  updatedAt?: null | number,
  email: string,
  cohort?: string | null,
  name?: string | null,
  photo?: string | null,
  role: string
}

export type Action =
  | { type: 'request' }
  | { type: 'reset' }
  | { type: 'success', results: User | null}
  | { type: 'failure', error: string };

export const initialState: State = {
  data: null,
  isLoading: false,
  error: null
}


export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case 'request':
      return {
        ...state,
        isLoading: true
      }
    case 'success':
      return {
        ...state,
        isLoading: false,
        data: action.results
      }
    case 'failure':
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
}