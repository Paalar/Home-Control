import React, { FunctionComponent, useState } from 'react';
import Modal from '../Modal';
import { CoffeeEvent } from '../../interfaces/IFTTT';

const brewFor2: CoffeeEvent = { key: 'brew_coffee_for_2', name: 'Brew 2 cups', timeout: 35 * 60000 };
const brewFor1: CoffeeEvent = { key: 'brew_coffee_for_1', name: 'Brew 1 cup', timeout: 5 * 60000 };
export const brewingEvents: CoffeeEvent[] = [brewFor1, brewFor2];

interface Props {
  event: CoffeeEvent;
  setBrewEvent: (event: CoffeeEvent) => void;
  onClose: () => void;
}

const eventSelector = (
  brewingEvents.map((event) => <option key={event.key} value={event.key}>{event.name}</option>)
);

const CoffeeMachineModal: FunctionComponent<Props> = (props: Props) => {
  const { event, setBrewEvent, onClose } = props;
  const [selectChoice, setSelectChoice] = useState(event);

  const handleChange = (
    { target }: React.ChangeEvent<HTMLSelectElement>,
  ): void => setSelectChoice(brewingEvents[target.selectedIndex]);

  const onAccept = () => setBrewEvent(selectChoice);

  return (
    <Modal
      onAcceptProp={onAccept}
      onCloseProp={onClose}
      title="Coffe machine settings"
    >
      <select
        onChange={handleChange}
        value={selectChoice.key}
      >
        {eventSelector}
      </select>
    </Modal>
  );
};

export default CoffeeMachineModal;
