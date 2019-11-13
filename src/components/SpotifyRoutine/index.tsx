import React, {
  FunctionComponent, useState, useEffect, useCallback,
} from 'react';
import Presentational from './presentational';
import { ReactComponent as SymbolOn } from '../../assets/svgs/music-on.svg';
import { ReactComponent as SymbolOff } from '../../assets/svgs/music-off.svg';
import * as SpotifyApi from '../../api/spotify';
import * as LS from '../../utils/localStorage';
import * as WindowUtils from '../../utils/window';

const SpotifyRoutine: FunctionComponent = (): JSX.Element => {
  const [accessToken, setAccessToken] = useState(LS.SPOTIFY_TOKEN());
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const resumeSpotify = (): Promise<Response> | null => SpotifyApi.resumeSpotify(setErrorMessage);
  const pauseSpotify = (): Promise<Response> | null => SpotifyApi.pauseSpotify(setErrorMessage);

  const playbackAction = isPlayingMusic ? pauseSpotify : resumeSpotify;
  const onClick = (): void => {
    playbackAction();
    setIsPlayingMusic(!isPlayingMusic);
  };
  return (
    <>
      <Presentational
        Symbol={isPlayingMusic ? SymbolOff : SymbolOn}
        onClick={onClick}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default SpotifyRoutine;
