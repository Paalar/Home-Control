import * as RoutineTypes from '../constants/RoutineTypes';
import { brewCoffeeEvent } from './ifttt';

const fetchOnClickByRoutineType = (routine: RoutineTypes.RoutineType):
  null | (() => Promise<void>) => {
  switch (routine) {
    case RoutineTypes.CoffeeMachineRoutine: {
      return brewCoffeeEvent;
    }
    default: return null;
  }
};

export default fetchOnClickByRoutineType;
