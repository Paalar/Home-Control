import React, { FunctionComponent, useState } from 'react';
import Presentational from './presentational';
import { ReactComponent as SymbolOn } from '../../assets/svgs/coffee-on.svg';
import { ReactComponent as SymbolOff } from '../../assets/svgs/coffee-off.svg';
import * as IFTTApi from '../../api/ifttt';
import * as Events from '../../constants/iftttEvents';
import CoffeeEventContext, { initialEvent } from '../../hooks/contexts';
import { CoffeeEvent } from '../../interfaces/IFTTT';
import ErrorHeader from '../ErrorHeader';

const TIMEOUT = (key: string): number => (
  key === Events.brewFor1.key
    ? 5 * 1000 * 60
    : 35 * 1000 * 60
);

const CURRENTLY_BREWING_ERROR = 'The coffee machine is already brewing or is currently heating. Wait for it to finish';


const CoffeeMachineRoutine: FunctionComponent = (): JSX.Element => {
  const [isBrewing, setIsBrewing] = useState<boolean>(false);
  const [event, setEvent] = useState<CoffeeEvent>(initialEvent);
  const [errorMessage, setErrorMessage] = useState('');
  const errorHeader = <ErrorHeader errorMessage={errorMessage} />;
  const error = errorMessage.length > 0 ? errorHeader : undefined;
  const symbol = isBrewing ? SymbolOn : SymbolOff;
  const setNewEvent = (newEvent: CoffeeEvent): void => setEvent(newEvent);
  const context: CoffeeEventContext = {
    ...event,
    setNewEvent,
  };

  const startBrewing = (): void => {
    const url = IFTTApi.ifttEvent(event.key);
    // IFTTApi.startEvent(url);
    console.log(`Brewing! ${event.name}`);
    setIsBrewing(true);
    setTimeout(() => {
      setIsBrewing(false);
    }, TIMEOUT(event.key));
  };

  const handleClick = (): boolean => {
    if (!isBrewing) {
      startBrewing();
      return true;
    }
    setErrorMessage(CURRENTLY_BREWING_ERROR);
    setTimeout(() => setErrorMessage(''), 5000);
    return false;
  };

  return (
    <CoffeeEventContext.Provider value={context}>
      <Presentational
        Symbol={symbol}
        handleClick={handleClick}
        isBrewing={isBrewing}
        error={error}
      />
    </CoffeeEventContext.Provider>
  );
};

export default CoffeeMachineRoutine;
