import React, { useState } from 'react';
import './routineComponent.scss';

interface Props {
  symbolOn: string;
  symbolOff: string;
}

const Presentational = (props: Props): JSX.Element => {
  const { symbolOn, symbolOff } = props;
  const [symbol, setSymbol] = useState(symbolOn);

  const handleClick = (): void => {
    const newSymbol = symbol === symbolOn ? symbolOff : symbolOn;
    setSymbol(newSymbol);
  };

  return (
    <div className="routine-component-container">
      <div
        className="routine-symbol-container"
        onClick={handleClick}
      >
        <img src={symbol} alt="" />
      </div>
    </div>
  );
};

export default Presentational;
