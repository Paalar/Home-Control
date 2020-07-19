import React, { FunctionComponent, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './modal.scss';
import Presentational from './presentational';

export interface GenericModalProps {
  onAcceptProp?: () => void;
  onCloseProp: () => void;
  children: JSX.Element;
  title: string;
}

const modalRoot = document.getElementById('modal-root');

const Modal: FunctionComponent<GenericModalProps> = (props: GenericModalProps) => {
  const {
    title,
    onAcceptProp,
    onCloseProp,
    children,
  } = props;

  const [container] = useState(document.createElement('div'));
  container.setAttribute('id', 'modal-container');

  const onClose = () => {
    onCloseProp();
  };

  const onAccept = () => {
    if (onAcceptProp) {
      onAcceptProp();
    }
    onCloseProp();
  };

  const modal = (
    <Presentational
      onAccept={onAccept}
      onClose={onClose}
      title={title}
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
