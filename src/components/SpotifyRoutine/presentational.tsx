import React, { useState } from 'react';
import { SpotifyRoutine } from '../../interfaces/Routine';
import SpotifyModal from './SpotifyModal';
import ErrorHeader from '../ErrorHeader';

const Presentational = (props: SpotifyRoutine): JSX.Element => {
  const { Symbol, onClick, errorMessage } = props;
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);
  let longPressTimer: number;
  const error = <ErrorHeader errorMessage={errorMessage} />;

  const handleClick = (): void => {
    setActive(!active);
    onClick();
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

  const accept = (): void => {
    setPressed(false);
  };

  const cancel = (): void => setPressed(false);

  const modal = <SpotifyModal accept={accept} cancel={cancel} />;
  const displayError = errorMessage.length > 0 ? error : null;

  return (
    <div className="routine-component-container first-box">
      {pressed ? modal : null}
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
