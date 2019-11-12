import React, { useState } from 'react';
import { SpotifyRoutine } from '../../interfaces/Routine';
import SpotifyModal from './SpotifyModal';

const Presentational = (props: SpotifyRoutine): JSX.Element => {
  const { Symbol, onClick } = props;

  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);

  let longPressTimer: number;

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

  return (
    <div className="routine-component-container first-box">
      {pressed ? modal : null}
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
