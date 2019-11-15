import React, { FunctionComponent } from 'react';
import { SVG } from '../../interfaces/Common';
import CoffeeMachineModal from './coffeeMachineModal';
import CoffeeEventContext from '../../hooks/contexts';
import RoutineComponent, { createStatus } from '../RoutineComponent';

interface Props {
  Symbol: SVG;
  handleClick: () => boolean;
  isBrewing: boolean;
  error?: JSX.Element;
}

const Presentational: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const { Symbol, handleClick, error } = props;

  const symbol = <Symbol className="routine-icon" />;

  return (
    <CoffeeEventContext.Consumer>
      {(contextEvent): JSX.Element => {
        const { name, key } = contextEvent;
        const modalCreator = (close: () => void): JSX.Element => (
          <CoffeeMachineModal event={{ key, name }} close={close} />
        );
        const status = createStatus(contextEvent.name);
        return (
          <>
            <RoutineComponent
              symbol={symbol}
              status={status}
              handleClick={handleClick}
              modalCreator={modalCreator}
            />
            {error}
          </>
        );
      }}
    </CoffeeEventContext.Consumer>
  );
};

export default Presentational;
