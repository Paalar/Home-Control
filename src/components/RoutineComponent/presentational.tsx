import React, { useState } from 'react';
import Modal from '../Modal/index';
import RoutineData from '../../interfaces/Routine';

interface Props {
  routine: RoutineData;
}

const Presentational = (props: Props): JSX.Element => {
  const { routine } = props;
  const {
    symbolOn, symbolOff, onClick, onHold, modal, name,
  } = routine;
  const [symbol, setSymbol] = useState(symbolOn);
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);

  let longPressTimer: number;

  const handleClick = (): void => {
    const newSymbol = symbol === symbolOn ? symbolOff : symbolOn;
    setSymbol(newSymbol);
    setActive(!active);
    onClick(name);
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

  // const closeModal = (): void => setPressed(false);

  // const createModal = () => {
  //   if (modal.exist) {
  //     return (
  //       <Modal
  //         title={modal.title!}
  //         accept={closeModal}
  //         cancel={closeModal}
  //       >
  //         {onHold(name)}
  //       </Modal>
  //     );
  //   }
  // };

  // const displayModal = pressed && modal.exist ? createModal() : null;

  return (
    <div className="routine-component-container first-box">
      {/* displayModal */}
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
