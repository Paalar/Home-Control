/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react';
import Events from '../constants/iftttEvents';
import { CoffeeEvent } from '../interfaces/IFTTT';

interface CoffeeEventContext extends CoffeeEvent {
  setNewEvent: (newEvent: CoffeeEvent) => void;
}

export const initialEvent: CoffeeEvent = {
  name: Events[0].name,
  key: Events[0].key,
};

const initialContext: CoffeeEventContext = {
  ...initialEvent,
  setNewEvent: (newEvent: CoffeeEvent) => { },
};

const CoffeeEventContext = createContext<CoffeeEventContext>(initialContext);

export default CoffeeEventContext;
