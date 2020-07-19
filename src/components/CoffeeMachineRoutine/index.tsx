import React, { FunctionComponent, useState, useContext } from 'react';
import { ReactComponent as SymbolOn } from '../../assets/svgs/coffee-on.svg';
import { ReactComponent as SymbolOff } from '../../assets/svgs/coffee-off.svg';
import { CoffeeEvent } from '../../interfaces/IFTTT';
import { GlobalContext, GlobalActionEnum } from '../../hooks/globalContext';
import CoffeeMachineModal, { brewingEvents } from './coffeeMachineModal';
import RoutineComponent, { ModalCreator } from '../RoutineComponent';
import startEvent from '../../api/ifttt';

const CURRENTLY_BREWING_ERROR = 'The coffee machine is already brewing or is currently heating. Wait for it to finish';

const coffeeMachineModalCreator = (
  event: CoffeeEvent,
  setBrewEvent: (event: CoffeeEvent) => void,
): ModalCreator => (onClose: () => void) => (
  <CoffeeMachineModal
    event={event}
    setBrewEvent={setBrewEvent}
    onClose={onClose}
  />
);

const CoffeeMachineRoutine: FunctionComponent = () => {
  const { dispatch } = useContext(GlobalContext);
  const [isBrewing, setIsBrewing] = useState<boolean>(false);
  const [brewEvent, setBrewEvent] = useState<CoffeeEvent>(brewingEvents[0]);
  const Symbol = isBrewing ? SymbolOn : SymbolOff;

  const handleError = (): void => {
    dispatch({ type: GlobalActionEnum.SET_ERROR, payload: CURRENTLY_BREWING_ERROR });
  };

  const handleClick = (): boolean => {
    if (!isBrewing) {
      setIsBrewing(true);
      startEvent(brewEvent.key, handleError);
      setTimeout(() => setIsBrewing(false), brewEvent.timeout);
      return true;
    }
    return false;
  };

  const modalCreator = coffeeMachineModalCreator(brewEvent, setBrewEvent);

  return (
    <RoutineComponent
      handleClick={handleClick}
      status={brewEvent.name}
      modalCreator={modalCreator}
    >
      <Symbol className="routine-icon" />
    </RoutineComponent>
  );
};

export default CoffeeMachineRoutine;
