import React, { useState } from 'react';
import './routineComponent.scss';
import Modal from '../Modal/index';
import IModal from '../../interfaces/Modal';

interface Props {
  symbolOn: string;
  symbolOff: string;
  clickEvent: (() => Promise<void>) | null;
  modalData: IModal;
}

const Presentational = (props: Props): JSX.Element => {
  const {
    symbolOn, symbolOff, clickEvent, modalData,
  } = props;
  const [symbol, setSymbol] = useState(symbolOn);
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);

  let longPressTimer: number;

  const handleClick = (): void => {
    const newSymbol = symbol === symbolOn ? symbolOff : symbolOn;
    setSymbol(newSymbol);
    setActive(!active);
    if (clickEvent !== null) {
      clickEvent();
    }
  };

  const handlePress = (): void => {
    longPressTimer = setTimeout(() => {
      setPressed(true);
    }, 500);
  };

  const handleLeave = (): void => {
    clearTimeout(longPressTimer);
    if (!pressed) {
      handleClick();
    }
  };

  const closeModal = (): void => setPressed(false);

  const createModal = () => {
    if (modalData.exist) {
      return (
        <Modal
          title={modalData.title!}
          accept={closeModal}
          cancel={closeModal}
        >
          <p>
            Hello, BB!
          </p>
        </Modal>
      );
    }
  };

  const displayModal = pressed && modalData.exist ? createModal() : null;

  return (
    <div className="routine-component-container first-box">
      {displayModal}
      <div
        className={`routine-symbol-container second-box${active ? ' flip' : ''}`}
        onTouchStart={handlePress}
        onTouchEnd={handleLeave}
        onMouseDown={handlePress}
        onMouseUp={handleLeave}
      >
        <img src={symbol} alt="" />
      </div>
    </div>
  );
};

export default Presentational;
