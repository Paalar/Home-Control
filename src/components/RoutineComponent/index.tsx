import React, { FunctionComponent, useState } from 'react';
import Presentational from './presentational';

export const createStatus = (statusMessage: string): JSX.Element => (
  <p className="routine-status">{`Status: ${statusMessage}`}</p>
);

interface Props {
  modalCreator: (close: () => void) => JSX.Element;
  symbol: JSX.Element;
  status?: JSX.Element;
  handleClick: () => boolean|Promise<boolean>;
}

const RoutineComponent: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const {
    modalCreator, symbol, handleClick, status,
  } = props;
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);
  let longPressTimer: number;

  const handlePress = (): void => {
    longPressTimer = setTimeout(() => setPressed(true), 500);
  };

  const handleLeave = async (): Promise<void> => {
    clearTimeout(longPressTimer);
    if (!pressed && await handleClick()) {
      setActive(!active);
    }
  };

  const close = (): void => setPressed(false);

  const modal = modalCreator(close);
  return (
    <Presentational
      handleLeave={handleLeave}
      handlePress={handlePress}
      modal={pressed ? modal : undefined}
      active={active}
      symbol={symbol}
      status={status}
    />
  );
};

export default RoutineComponent;
