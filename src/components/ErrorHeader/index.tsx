import React, { FunctionComponent, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Presentational from './Presentational';
import './errorHeader.scss';

interface Props {
  errorMessage: string;
}

const errorRoot = document.getElementById('error-root');

const ErrorHeader: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const { errorMessage } = props;
  const container = document.createElement('div');
  container.setAttribute('class', 'error-container');

  const errorHeader = (
    <Presentational errorMessage={errorMessage} />
  );

  useEffect(() => {
    if (errorRoot !== null) {
      errorRoot.appendChild(container);
    }
    return (): void => {
      if (errorRoot !== null) {
        errorRoot.removeChild(container);
      }
    };
  }, [container]);

  return (
    createPortal(
      errorHeader,
      container,
    )
  );
};

export default ErrorHeader;
