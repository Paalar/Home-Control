import React, { FunctionComponent } from 'react';
import Modal from '../Modal';
import { spotifyAuthorizationUrl } from '../../api/spotify';
import './spotifyComponent.scss';

interface Props {
  onClose: () => void;
}

const SpotiffModal: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const { onClose } = props;
  const loginButton = (
    <button id="spotify-login" type="button">
      <a href={spotifyAuthorizationUrl}>Login to Spotify</a>
    </button>
  );
  return (
    <Modal
      onCloseProp={onClose}
      title="Spotify settings"
    >
      {loginButton}
    </Modal>
  );
};

export default SpotiffModal;
