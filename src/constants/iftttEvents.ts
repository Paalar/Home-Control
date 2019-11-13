import { CoffeeEvent } from '../interfaces/IFTTT';

// Coffee Machine
export const brewFor2: CoffeeEvent = { key: 'brew_coffee_for_2', name: 'Brew 2 cups' };
export const brewFor1: CoffeeEvent = { key: 'brew_coffee_for_1', name: 'Brew 1 cup' };
const brewingEvents: CoffeeEvent[] = [brewFor1, brewFor2];

export default brewingEvents;
