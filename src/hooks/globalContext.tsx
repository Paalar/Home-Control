import React, {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
} from 'react';

export enum GlobalActionEnum {
  SET_ERROR = 'SET_ERROR',
}

type ActionTypes = (
  typeof GlobalActionEnum.SET_ERROR
);

interface GlobalState {
  error?: string;
}

const initialState: GlobalState = {

};

interface BaseAction {
  type: ActionTypes;
  payload: unknown;
}

interface SetErrorAction extends BaseAction {
  payload: string;
}

type GlobalActions = (
  SetErrorAction
);

const reducer = (state: GlobalState, action: GlobalActions): GlobalState => {
  switch (action.type) {
    case GlobalActionEnum.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default: return state;
  }
};

interface ContextProps {
  state: GlobalState;
  dispatch: Dispatch<GlobalActions>;
}

export const GlobalContext = createContext({} as ContextProps);

const GlobalProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      { children }
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
