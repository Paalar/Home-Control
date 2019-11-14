import React, { FunctionComponent, useState } from 'react';
import Presentational from './presentational';
import { ReactComponent as SymbolOn } from '../../assets/svgs/coffee-on.svg';
import { ReactComponent as SymbolOff } from '../../assets/svgs/coffee-off.svg';
import * as IFTTApi from '../../api/ifttt';
import * as Events from '../../constants/iftttEvents';
import CoffeeEventContext, { initialEvent } from '../../hooks/contexts';
import { CoffeeEvent } from '../../interfaces/IFTTT';

const TIMEOUT = (key: string): number => (
  key === Events.brewFor1.key
    ? 5 * 1000 * 60
    : 35 * 1000 * 60
);

const CoffeeMachineRoutine: FunctionComponent = (): JSX.Element => {
  const [isBrewing, setIsBrewing] = useState<boolean>(false);
  const [event, setEvent] = useState<CoffeeEvent>(initialEvent);

  const startBrewing = (): void => {
    const url = IFTTApi.ifttEvent(event.key);
    // IFTTApi.startEvent(url);
    console.log(`Brewing! ${event.name}`);
    setIsBrewing(true);
    setTimeout(() => {
      setIsBrewing(false);
    }, TIMEOUT(event.key));
  };

  const symbol = isBrewing ? SymbolOn : SymbolOff;
  const setNewEvent = (newEvent: CoffeeEvent): void => setEvent(newEvent);
  const context: CoffeeEventContext = {
    ...event,
    setNewEvent,
  };
  return (
    <CoffeeEventContext.Provider value={context}>
      <Presentational
        Symbol={symbol}
        onClick={startBrewing}
        isBrewing={isBrewing}
      />
    </CoffeeEventContext.Provider>
  );
};

export default CoffeeMachineRoutine;
