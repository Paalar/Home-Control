import React, { FunctionComponent, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './modal.scss';
import Presentational from './presentational';

export interface GenericModalProps {
  accept: () => void;
  close: () => void;
  children: JSX.Element;
}

const modalRoot = document.getElementById('modal-root');

const Modal: FunctionComponent<GenericModalProps> = (props: GenericModalProps): JSX.Element => {
  const { children, accept, close } = props;
  const container = document.createElement('div');
  container.setAttribute('id', 'modal-container');

  const modal = (
    <Presentational
      accept={accept}
      close={close}
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
