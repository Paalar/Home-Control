import React, { FunctionComponent } from 'react';
import './routineComponent.scss';

interface Props {
  symbol: JSX.Element;
  status?: string;
  isActive: boolean;
  isPressed: boolean;
  handleLeave: () => void;
  handlePress: () => void;
  children: JSX.Element;
}

interface GenericComponentProps {
  condition: unknown
  children: JSX.Element
}

const CreateComponent: FunctionComponent<GenericComponentProps> = (
  { condition, children }: GenericComponentProps,
) => {
  if (condition) {
    return <>{children}</>;
  }
  return <></>;
};

const Presentational: FunctionComponent<Props> = (props: Props) => {
  const {
    isActive, isPressed, symbol, handleLeave, handlePress, status, children,
  } = props;

  const flip = { transform: 'rotateY(0deg)' };
  const flipBack = { transform: 'rotateY(360deg)' };
  const style = isActive ? flip : flipBack;
  const statusComponent = <p className="routine-status">{`Status: ${status}`}</p>;

  return (
    <div className="routine-component-container first-box">
      <CreateComponent condition={isPressed}>
        {children}
      </CreateComponent>
      <div
        className="routine-symbol-container second-box"
        style={style}
        onTouchStart={handlePress}
        onTouchEnd={handleLeave}
        onMouseDown={handlePress}
        onMouseUp={handleLeave}
      >
        <div className="icon__wrapper" style={style}>
          {symbol}
        </div>
      </div>
      <CreateComponent condition={status}>
        {statusComponent}
      </CreateComponent>
    </div>
  );
};

export default Presentational;
