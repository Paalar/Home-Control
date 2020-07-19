import React, { FunctionComponent, useState } from 'react';
import Presentational from './presentational';

interface Props {
  modalCreator: (close: () => void) => JSX.Element;
  symbol: JSX.Element;
  status?: string;
  handleClick: () => boolean|Promise<boolean>;
}

const RoutineComponent: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const {
    modalCreator, symbol, handleClick, status,
  } = props;
  const [isActive, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);
  let longPressTimer: ReturnType<typeof setTimeout>;

  const handlePress = (): void => {
    longPressTimer = setTimeout(() => setPressed(true), 500);
  };

  const handleLeave = async (): Promise<void> => {
    clearTimeout(longPressTimer);
    if (!pressed && await handleClick()) {
      setActive(!isActive);
    }
  };

  const close = (): void => setPressed(false);

  const modal = modalCreator(close);
  return (
    <Presentational
      handleLeave={handleLeave}
      handlePress={handlePress}
      modal={pressed ? modal : undefined}
      active={isActive}
      symbol={symbol}
      status={status}
    />
  );
};

export default RoutineComponent;
