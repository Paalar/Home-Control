import React, {
  FunctionComponent, useState, useEffect, useCallback,
} from 'react';
import Presentational from './presentational';
import { ReactComponent as SymbolOn } from '../../assets/svgs/music-on.svg';
import { ReactComponent as SymbolOff } from '../../assets/svgs/music-off.svg';
import * as SpotifyApi from '../../api/spotify';
import { SpotifyPlaybackResponse } from '../../interfaces/API';

const SpotifyRoutine: FunctionComponent = (): JSX.Element => {
  const [accessToken, setAccessToken] = useState<string>('');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const windowHash = window.location.hash;
  const token = windowHash
    .split('&')
    .filter((value) => value.includes('access_token'))[0];

  const updatePlayState = useCallback(
    () => {
      if (accessToken.length > 0) {
        SpotifyApi
          .getPlaybackState(accessToken)
          .then((response: SpotifyPlaybackResponse) => setIsPlayingMusic(response.is_playing))
          .catch((error) => console.log(error));
      }
    },
    [accessToken],
  );

  useEffect(() => {
    updatePlayState();

    if (token !== undefined) {
      const value = token.split('=');
      setAccessToken(value[1]);
    }
  }, [token, updatePlayState]);

  const resumeSpotify = (): Promise<Response> => (
    SpotifyApi.resumeSpotify(accessToken, setErrorMessage)
  );
  const pauseSpotify = (): Promise<Response> => (
    SpotifyApi.pauseSpotify(accessToken, setErrorMessage)
  );

  const playbackAction = isPlayingMusic ? pauseSpotify : resumeSpotify;
  const onClick = (): void => {
    playbackAction();
    setIsPlayingMusic(!isPlayingMusic);
  };

  const symbol = isPlayingMusic ? SymbolOff : SymbolOn;

  setInterval(updatePlayState, 10000);
  return (
    <Presentational
      Symbol={symbol}
      onClick={onClick}
      errorMessage={errorMessage}
    />
  );
};

export default SpotifyRoutine;
