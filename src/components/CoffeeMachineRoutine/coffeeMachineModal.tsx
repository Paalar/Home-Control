import React, { FunctionComponent, useState } from 'react';
import Modal from '../Modal';
import Events from '../../constants/iftttEvents';
import { CoffeeEvent } from '../../interfaces/IFTTT';
import CoffeeEventContext from '../../hooks/contexts';

interface Props {
  close: () => void;
  event: CoffeeEvent;
}

const eventSelector = (
  <>
    {Events.map((event) => <option value={event.key}>{event.name}</option>)}
  </>
);

const CoffeeMachineModal: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const { close, event } = props;
  const [newEvent, setNewEvent] = useState(event);
  const handleChange = (ChangeEvent: React.ChangeEvent<HTMLSelectElement>):
    void => setNewEvent(Events[ChangeEvent.target.selectedIndex]);
  return (
    <CoffeeEventContext.Consumer>
      {(contextEvent): JSX.Element => {
        const onAccept = (): void => {
          contextEvent.setNewEvent(newEvent);
          close();
        };
        const selector = (
          <select
            onChange={handleChange}
            value={newEvent.key}
          >
            {eventSelector}
          </select>
        );
        return (
          <Modal
            accept={onAccept}
            close={close}
          >
            {selector}
          </Modal>
        );
      }}
    </CoffeeEventContext.Consumer>
  );
};

export default CoffeeMachineModal;
