import React from 'react';
import './routineComponent.scss';

interface Props {
  modal?: JSX.Element;
  symbol: JSX.Element;
  status?: JSX.Element;
  active: boolean;
  handleLeave: () => void;
  handlePress: () => void;
}

const Presentational = (props: Props): JSX.Element => {
  const {
    modal, active, symbol, handleLeave, handlePress, status,
  } = props;

  const flip = { transform: 'rotateY(0deg)' };
  const flipBack = { transform: 'rotateY(360deg)' };
  const style = active ? flip : flipBack;

  return (
    <div className="routine-component-container first-box">
      {modal}
      <div
        className="routine-symbol-container second-box"
        style={style}
        onTouchStart={handlePress}
        onTouchEnd={handleLeave}
        onMouseDown={handlePress}
        onMouseUp={handleLeave}
      >
        <div className="icon__wrapper" style={style}>{symbol}</div>
      </div>
    </div>
  );
};

export default Presentational;
