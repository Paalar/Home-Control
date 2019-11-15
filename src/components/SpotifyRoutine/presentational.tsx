import React from 'react';
import RoutineComponent from '../RoutineComponent';
import { SVG } from '../../interfaces/Common';

interface Props {
  Symbol: SVG;
  handleClick: () => Promise<boolean>;
  error?: JSX.Element;
  modalCreator: (close: () => void) => JSX.Element;
}

const Presentational = (props: Props): JSX.Element => {
  const {
    Symbol, handleClick, error, modalCreator,
  } = props;

  const symbol = <Symbol className="routine-icon" />;

  return (
    <>
      <RoutineComponent
        handleClick={handleClick}
        modalCreator={modalCreator}
        symbol={symbol}
      />
      {error}
    </>
  );
};

export default Presentational;
