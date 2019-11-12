import React, { FunctionComponent, useState } from 'react';
import { SVG } from '../../interfaces/Common';

interface Props {
  Symbol: SVG;
  onClick: () => void;
  isBrewing: boolean;
}

const Presentational: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const { Symbol, onClick, isBrewing } = props;
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);
  let longPressTimer: number;

  const handleClick = (): void => {
    if (!isBrewing) {
      setActive(!active);
      onClick();
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

  return (
    <div className="routine-component-container first-box">
      <div
        className={`routine-symbol-container second-box${active ? ' flip' : ''}`}
        onTouchStart={handlePress}
        onTouchEnd={handleLeave}
        onMouseDown={handlePress}
        onMouseUp={handleLeave}
      >
        <Symbol className="routine-icon" />
      </div>
    </div>
  );
};

export default Presentational;
