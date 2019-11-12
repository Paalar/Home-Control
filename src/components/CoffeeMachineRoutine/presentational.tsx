import React, { FunctionComponent, useState } from 'react';
import { SVG } from '../../interfaces/Common';
import ErrorHeader from '../ErrorHeader';

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

  const displayError = showError ? error : null;
  return (
    <div className="routine-component-container first-box">
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
    </div>
  );
};

export default Presentational;
