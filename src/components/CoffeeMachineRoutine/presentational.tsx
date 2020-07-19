import React, { FunctionComponent } from 'react';
import { SVG } from '../../interfaces/Common';
import CoffeeMachineModal from './coffeeMachineModal';
import CoffeeEventContext from '../../hooks/contexts';
import RoutineComponent from '../RoutineComponent';

interface Props {
  Symbol: SVG;
  handleClick: () => boolean;
}

const Presentational: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const { Symbol, handleClick } = props;

  const symbol = <Symbol className="routine-icon" />;

  return (
    <CoffeeEventContext.Consumer>
      {(contextEvent): JSX.Element => {
        const { name, key } = contextEvent;
        const modalCreator = (close: () => void): JSX.Element => (
          <CoffeeMachineModal event={{ key, name }} close={close} />
        );
        return (
          <RoutineComponent
            symbol={symbol}
            status={contextEvent.name}
            handleClick={handleClick}
            modalCreator={modalCreator}
          />
        );
      }}
    </CoffeeEventContext.Consumer>
  );
};

export default Presentational;
