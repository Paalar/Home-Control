import React, {
  FunctionComponent, useState, useEffect, useCallback,
} from 'react';
import Presentational from './presentational';
import { ReactComponent as SymbolOn } from '../../assets/svgs/music-on.svg';
import { ReactComponent as SymbolOff } from '../../assets/svgs/music-off.svg';
import SpotifyModal from './SpotifyModal';
import * as SpotifyApi from '../../api/spotify';
import * as LS from '../../utils/localStorage';
import * as WindowUtils from '../../utils/window';
import ErrorHeader from '../ErrorHeader';

const modalCreator = (close: () => void): JSX.Element => <SpotifyModal close={close} />;

const SpotifyRoutine: FunctionComponent = (): JSX.Element => {
  const [accessToken, setAccessToken] = useState(LS.SPOTIFY_TOKEN());
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const updateErrorMessage = (message: string): void => {
    if (errorMessage.length === 0) {
      setErrorMessage(message);
    }
  };

  const updatePlayState = useCallback(
    () => {
      if (accessToken !== null) {
        SpotifyApi.getPlaybackState()
          .then((response) => {
            if (response != null) {
              setIsPlayingMusic(response.is_playing);
            }
          })
          .catch((error) => console.log(error));
      }
    },
    [accessToken],
  );

  useEffect(() => {
    updatePlayState();
    setInterval(() => updatePlayState(), 10000);
    if (WindowUtils.urlHasSpotifyAccessToken()) {
      const token = WindowUtils.getSpotifyAccessToken();
      if (token !== LS.SPOTIFY_TOKEN() && !LS.isSpotifyTokenNotExpired()) {
        LS.setSpotifytoken(token);
        setAccessToken(token);
      }
    }
  }, [accessToken, updatePlayState]);

  const onClick = (): void => {
    if (isPlayingMusic) {
      SpotifyApi.pauseSpotify(updateErrorMessage);
    } else {
      SpotifyApi.resumeSpotify(updateErrorMessage);
    }
    setIsPlayingMusic(!isPlayingMusic);
  };

  const errorHeader = <ErrorHeader errorMessage={errorMessage} />;
  const error = errorMessage.length > 0 ? errorHeader : undefined;
  return (
    <Presentational
      Symbol={isPlayingMusic ? SymbolOff : SymbolOn}
      onClick={onClick}
      error={error}
      modalCreator={modalCreator}
    />
  );
};

export default SpotifyRoutine;
