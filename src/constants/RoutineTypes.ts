export const LightsRoutine = 'Lights';
export const BedroomHeaterRoutine = 'Heater-Bedroom';
export const LivingRoomHeaterRoutine = 'Heater-Living-Room';
export const TVRoutine = 'TV';
export const PCRoutine = 'PC';
export const GoogleHomeRoutine = 'Google-Home';
export const CoffeeMachineRoutine = 'Coffee-Machine';

export type RoutineType =
  typeof LightsRoutine
  | typeof BedroomHeaterRoutine
  | typeof LivingRoomHeaterRoutine
  | typeof TVRoutine
  | typeof PCRoutine
  | typeof GoogleHomeRoutine
  | typeof CoffeeMachineRoutine;
