import * as RoutineApi from '../constants/routineApi';

export const brewCoffeeEvent = (): Promise<void> => (
  fetch(RoutineApi.brewCoffeeEventUrl)
    .then((response) => console.log(response))
    .catch((error) => console.log(error))
);

export const lol = 2;
