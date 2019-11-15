import React from 'react';

interface Props {
  modal?: JSX.Element;
  error?: JSX.Element;
  symbol: JSX.Element;
  status?: JSX.Element;
  active: boolean;
  handleLeave: () => void;
  handlePress: () => void;
}

const Presentational = (props: Props): JSX.Element => {
  const {
    modal, error, active, symbol, handleLeave, handlePress,
  } = props;

  return (
    <div className="routine-component-container first-box">
      {modal}
      {error}
      <div
        className={`routine-symbol-container second-box${active ? ' flip' : ''}`}
        onTouchStart={handlePress}
        onTouchEnd={handleLeave}
        onMouseDown={handlePress}
        onMouseUp={handleLeave}
      >
        {symbol}
      </div>
    </div>
  );
};

export default Presentational;
