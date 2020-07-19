import React, { FunctionComponent, useState, useContext, useEffect, useCallback } from 'react';
import Presentational from './presentational';
import { ReactComponent as SymbolOn } from '../../assets/svgs/coffee-on.svg';
import { ReactComponent as SymbolOff } from '../../assets/svgs/coffee-off.svg';
import * as Events from '../../constants/iftttEvents';
import CoffeeEventContext, { initialEvent } from '../../hooks/contexts';
import { CoffeeEvent } from '../../interfaces/IFTTT';
import ErrorHeader from '../ErrorHeader';
import { GlobalContext, GlobalActionEnum } from '../../hooks/globalContext';
import { ifttEvent, startEvent } from '../../api/ifttt';

const CURRENTLY_BREWING_ERROR = 'The coffee machine is already brewing or is currently heating. Wait for it to finish';

const TIMEOUT = (key: string): number => (
  key === Events.brewFor1.key
    ? 5 * 1000 * 60
    : 35 * 1000 * 60
);

const CoffeeMachineRoutine: FunctionComponent = (): JSX.Element => {
  const { state, dispatch } = useContext(GlobalContext);
  const [isBrewing, setIsBrewing] = useState<boolean>(false);
  const [event, setEvent] = useState<CoffeeEvent>(initialEvent);
  const errorHeader = state.error ? <ErrorHeader /> : undefined;
  const symbol = isBrewing ? SymbolOn : SymbolOff;
  const setNewEvent = (newEvent: CoffeeEvent): void => setEvent(newEvent);
  const context: CoffeeEventContext = {
    ...event,
    setNewEvent,
  };

  const handleError = (): void => {
    dispatch({ type: GlobalActionEnum.SET_ERROR, payload: CURRENTLY_BREWING_ERROR });
  };

  const handleClick = (): boolean => {
    if (!isBrewing) {
      setIsBrewing(true);
      const eventUrl = ifttEvent(event.key);
      startEvent(eventUrl, handleError);
      console.log(`Brewing! ${event.name}`);
      setTimeout(() => {
        setIsBrewing(false);
      }, TIMEOUT(event.key));
      return true;
    }
    return false;
  };

  return (
    <>
      {errorHeader}
      <CoffeeEventContext.Provider value={context}>
        <Presentational
          Symbol={symbol}
          handleClick={handleClick}
        />
      </CoffeeEventContext.Provider>
    </>
  );
};

export default CoffeeMachineRoutine;
