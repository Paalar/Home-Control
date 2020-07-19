import React, { FunctionComponent } from 'react';
import Modal from '../Modal';
import { spotifyAuthorizationUrl } from '../../api/spotify';
import './spotifyComponent.scss';
import { clearSpotifyStorage } from '../../utils/localStorage';

interface Props {
  onClose: () => void;
}

const SpotiffModal: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const { onClose } = props;
  const clearSpotify = () => clearSpotifyStorage();
  return (
    <Modal
      onCloseProp={onClose}
      title="Spotify settings"
    >
      <div>
        <button id="spotify-login" type="button">
          <a href={spotifyAuthorizationUrl}>Login to Spotify</a>
        </button>
        <button type="button" onClick={clearSpotify}>
          Delete token
        </button>
      </div>
    </Modal>
  );
};

export default SpotiffModal;
