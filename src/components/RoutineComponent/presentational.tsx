import React, { FunctionComponent } from 'react';
import './routineComponent.scss';

interface Props {
  modal?: JSX.Element;
  symbol: JSX.Element;
  status?: string;
  active: boolean;
  handleLeave: () => void;
  handlePress: () => void;
}

interface StatusProps {
  status?: string;
}

const StatusMessage: FunctionComponent<StatusProps> = ({ status }: StatusProps) => {
  if (status) {
    return <p className="routine-status">{`Status: ${status}`}</p>;
  }
  return <></>;
};

const Presentational: FunctionComponent<Props> = (props: Props) => {
  const {
    modal, active, symbol, handleLeave, handlePress, status,
  } = props;

  const flip = { transform: 'rotateY(0deg)' };
  const flipBack = { transform: 'rotateY(360deg)' };
  const style = active ? flip : flipBack;

  return (
    <div className="routine-component-container first-box">
      {modal}
      <div
        className="routine-symbol-container second-box"
        style={style}
        onTouchStart={handlePress}
        onTouchEnd={handleLeave}
        onMouseDown={handlePress}
        onMouseUp={handleLeave}
      >
        <div className="icon__wrapper" style={style}>{symbol}</div>
      </div>
      <StatusMessage status={status} />
    </div>
  );
};

export default Presentational;
