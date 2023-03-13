import { createContext, Dispatch, useReducer } from 'react';
import { Action, initialState, reducer } from '../reducer';
import { State } from '../reducer'

const AppContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null
});

const AppProvider: React.FC = ({ children }) => {
  const [
    state,
    dispatch
  ] = useReducer(reducer, { isLoading: false, data: null, error: null });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider }