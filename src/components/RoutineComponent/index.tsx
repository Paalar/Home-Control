import React, { FunctionComponent, useState } from 'react';
import Presentational from './presentational';

interface Props {
  modalCreator: (close: () => void) => JSX.Element;
  error?: JSX.Element;
  symbol: JSX.Element;
  status?: JSX.Element;
  handleClick: () => void;
}

const RoutineComponent: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const {
    modalCreator, error, symbol, handleClick,
  } = props;
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);
  let longPressTimer: number;

  const handlePress = (): void => {
    longPressTimer = setTimeout(() => setPressed(true), 500);
  };

  const handleLeave = (): void => {
    clearTimeout(longPressTimer);
    if (!pressed) {
      setActive(!active);
      handleClick();
    }
  };

  const close = (): void => setPressed(false);

  const modal = modalCreator(close);
  return (
    <Presentational
      handleLeave={handleLeave}
      handlePress={handlePress}
      modal={pressed ? modal : undefined}
      error={error}
      active={active}
      symbol={symbol}
    />
  );
};

export default RoutineComponent;
