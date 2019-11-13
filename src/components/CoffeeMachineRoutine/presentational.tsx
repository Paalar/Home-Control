import React, { FunctionComponent, useState } from 'react';
import { SVG } from '../../interfaces/Common';
import ErrorHeader from '../ErrorHeader';
import CoffeeMachineModal from './coffeeMachineModal';
import { CoffeeEvent } from '../../interfaces/IFTTT';
import CoffeeEventContext from '../../hooks/contexts';

interface Props {
  Symbol: SVG;
  onClick: () => void;
  isBrewing: boolean;
}

const Presentational: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const { Symbol, onClick, isBrewing } = props;
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [showError, setShowError] = useState(false);
  let longPressTimer: number;
  const error = <ErrorHeader errorMessage="The coffee machine is already brewing or is currently heating. Wait for it to finish" />;

  const handleClick = (): void => {
    if (!isBrewing) {
      setActive(!active);
      onClick();
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    }
  };

  const handlePress = (): void => {
    longPressTimer = setTimeout(() => {
      setPressed(true);
    }, 500);
  };

  const handleLeave = (): void => {
    clearTimeout(longPressTimer);
    if (!pressed) {
      handleClick();
    }
  };

  const close = (): void => setPressed(false);

  const displayError = showError ? error : null;
  return (
    <CoffeeEventContext.Consumer>
      {(contextEvent): JSX.Element => {
        const modal = (event: CoffeeEvent): JSX.Element => (
          <CoffeeMachineModal event={event} close={close} />
        );
        return (
          <div className="routine-component-container first-box">
            {pressed ? modal({ name: contextEvent.name, key: contextEvent.key }) : null}
            {displayError}
            <div
              className={`routine-symbol-container second-box${active ? ' flip' : ''}`}
              onTouchStart={handlePress}
              onTouchEnd={handleLeave}
              onMouseDown={handlePress}
              onMouseUp={handleLeave}
            >
              <Symbol className="routine-icon" />
            </div>
            <p className="routine-status">{`Status: ${contextEvent.name}`}</p>
          </div>
        );
      }}
    </CoffeeEventContext.Consumer>
  );
};

export default Presentational;
