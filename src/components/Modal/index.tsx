import React, { FunctionComponent, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './modal.scss';
import Presentational from './presentational';

interface Props {
  children: JSX.Element;
  title: string;
  accept: () => void;
  cancel: () => void;
}

const modalRoot = document.getElementById('modal-root');

const Modal: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const {
    children, title, accept, cancel,
  } = props;
  const container = document.createElement('div');
  container.setAttribute('id', 'modal-container');
  container.onclick = cancel;
  const modal = (
    <Presentational
      title={title}
      accept={accept}
      cancel={cancel}
    >
      {children}
    </Presentational>
  );

  useEffect(() => {
    if (modalRoot !== null) {
      modalRoot.appendChild(container);
    }
    return (): void => {
      if (modalRoot !== null) {
        modalRoot.removeChild(container);
      }
    };
  }, [container]);

  return (
    createPortal(
      modal,
      container,
    )
  );
};

export default Modal;
