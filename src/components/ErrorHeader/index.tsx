import React, { FunctionComponent, useEffect, useState, useContext } from 'react';
import { createPortal } from 'react-dom';
import Presentational from './Presentational';
import './errorHeader.scss';
import { GlobalContext, GlobalActionEnum } from '../../hooks/globalContext';

const errorRoot = document.getElementById('error-root');
const fadeTime = 5000;

const ErrorHeader: FunctionComponent = (): JSX.Element => {
  const { state, dispatch } = useContext(GlobalContext);
  const [container] = useState<HTMLDivElement>(document.createElement('div'));
  container.className = 'error-container';

  useEffect(() => {
    errorRoot?.appendChild(container);
    setTimeout(() => {
      dispatch({ type: GlobalActionEnum.SET_ERROR, payload: undefined });
    }, fadeTime);

    return (): void => {
      clearTimeout(fadeTime);
      errorRoot?.removeChild(container);
    };
  }, [container, dispatch]);

  if (!state.error) return <></>;

  return (
    createPortal(
      <Presentational errorMessage={state.error} />,
      container,
    )
  );
};

export default ErrorHeader;
