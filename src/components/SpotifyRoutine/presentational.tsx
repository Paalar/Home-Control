import React from 'react';
import RoutineComponent from '../RoutineComponent';
import { SVG } from '../../interfaces/Common';

interface Props {
  Symbol: SVG;
  onClick: () => void;
  error?: JSX.Element;
  modalCreator: (close: () => void) => JSX.Element;
}

const Presentational = (props: Props): JSX.Element => {
  const {
    Symbol, onClick, error, modalCreator,
  } = props;

  const symbol = <Symbol className="routine-icon" />;

  return (
    <>
      <RoutineComponent
        handleClick={onClick}
        modalCreator={modalCreator}
        symbol={symbol}
      />
      {error}
    </>
  );
};

export default Presentational;
