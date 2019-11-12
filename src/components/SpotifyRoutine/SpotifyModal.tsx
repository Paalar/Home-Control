import React, { FunctionComponent } from 'react';
import Modal from '../Modal';
import { spotifyAuthorizationUrl } from '../../api/spotify';
import './spotifyComponent.scss';

interface Props {
  cancel: () => void;
  accept: () => void;
}

const SpotiffModal: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const { cancel, accept } = props;
  return (
    <Modal>
      <>
        <h1 className="title">Spotify Settings</h1>
        <div>
          <button id="spotify-login" type="button">
            <a href={spotifyAuthorizationUrl}>Login to Spotify</a>
          </button>
        </div>
        <div id="modal-buttons">
          <button
            type="button"
            id="modal-accept"
            onClick={accept}
          >
            Accept
          </button>
          <button
            type="button"
            id="modal-cancel"
            onClick={cancel}
          >
            Cancel
          </button>
        </div>
      </>
    </Modal>
  );
};

export default SpotiffModal;
