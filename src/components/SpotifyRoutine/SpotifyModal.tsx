import React, { FunctionComponent } from 'react';
import Modal from '../Modal';
import { spotifyAuthorizationUrl } from '../../api/spotify';
import './spotifyComponent.scss';
import { ModalProps } from '../../interfaces/Common';

const SpotiffModal: FunctionComponent<ModalProps> = (props: ModalProps): JSX.Element => {
  const { close } = props;
  const loginButton = (
    <button id="spotify-login" type="button">
      <a href={spotifyAuthorizationUrl}>Login to Spotify</a>
    </button>
  );
  return (
    <Modal
      onAcceptProp={close}
      onCloseProp={close}
      title="Spotify settings"
    >
      {loginButton}
    </Modal>
  );
};

export default SpotiffModal;
