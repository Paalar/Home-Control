import React, { FunctionComponent, useState } from 'react';
import Presentational from './presentational';

export type ModalCreator = (onClose: () => void) => JSX.Element

interface Props {
  status?: string;
  handleClick: () => boolean | Promise<boolean>;
  modalCreator: ModalCreator;
  children: JSX.Element;
}

const RoutineComponent: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const {
    children,
    status,
    handleClick,
    modalCreator,
  } = props;
  const [isActive, setActive] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  let longPressTimer: number;

  const handlePress = (): void => {
    longPressTimer = window.setTimeout(() => setIsPressed(true), 500);
  };

  const handleLeave = async (): Promise<void> => {
    clearTimeout(longPressTimer);
    if (!isPressed && await handleClick()) {
      setActive(!isActive);
    }
  };

  const onClose = (): void => setIsPressed(false);
  const modal = modalCreator(onClose);

  return (
    <Presentational
      handleLeave={handleLeave}
      handlePress={handlePress}
      isActive={isActive}
      isPressed={isPressed}
      symbol={children}
      status={status}
    >
      {modal}
    </Presentational>
  );
};

export default RoutineComponent;
