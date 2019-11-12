import React, { useState } from 'react';
import { SpotifyRoutine } from '../../interfaces/Routine';
import Modal from '../Modal';
import { spotifyAuthorizationUrl } from '../../api/spotify';

const Presentational = (props: SpotifyRoutine): JSX.Element => {
  const {
    Symbol, onClick, name,
  } = props;

  // const [Symbol, setSymbol] = useState<SVG>(symbolOn);
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [settings, setSettings] = useState({});

  let longPressTimer: number;

  const modal = (
    <button type="button">
      <a href={spotifyAuthorizationUrl}>Login to Spotify</a>
    </button>
  );

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

  const accept = () => {
    setPressed(false);
  };

  const cancel = () => setPressed(false);

  const createModal = (): JSX.Element => (
    <Modal
      title="Spotify Settings"
      settings={settings}
      accept={accept}
      cancel={cancel}
    >
      {modal}
    </Modal>
  );

  // const closeModal = (): void => setPressed(false);
  const displayModal = pressed ? createModal() : null;

  return (
    <div className="routine-component-container first-box">
      {displayModal}
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
