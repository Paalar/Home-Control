import * as RoutineApi from '../constants/routineApi';

export const brewCoffeeEvent = (): Promise<void> => (
  fetch(RoutineApi.brewCoffeeEventUrl, {
    method: 'GET',
    mode: 'cors',
  })
    .then((response) => console.log(response))
    .catch((error) => console.log(error))
);

export const lol = 2;
