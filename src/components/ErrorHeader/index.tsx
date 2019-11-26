import React, { FunctionComponent, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Presentational from './Presentational';
import './errorHeader.scss';

interface Props {
  errorMessage: string;
}


const ErrorHeader: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const { errorMessage } = props;
  const errorRoot = document.getElementById('error-root');
  const container = document.createElement('div');
  container.setAttribute('class', 'error-container');
  container.addEventListener('click', () => {
    if (errorRoot !== null) {
      errorRoot.hidden = true;
      console.log(errorRoot.hidden);
    }
  });

  useEffect(() => {
    if (errorRoot !== null) {
      errorRoot.appendChild(container);

      if (errorRoot.hidden) {
        errorRoot.removeChild(container);
        errorRoot.hidden = false;
      }
    }
    return (): void => {
      if (errorRoot !== null) {
        try {
          errorRoot.removeChild(container);
          errorRoot.hidden = false;
        } catch (error) {
          console.log(error);
        }
      }
    };
  }, [container, errorRoot]);

  const errorHeader = (
    <Presentational errorMessage={errorMessage} />
  );

  return (
    createPortal(
      errorHeader,
      container,
    )
  );
};

export default ErrorHeader;
