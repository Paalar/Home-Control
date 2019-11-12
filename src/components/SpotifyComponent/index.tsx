import React, { FunctionComponent, useState, useEffect } from 'react';
import Presentational from './presentational';
import { ReactComponent as SymbolOn } from '../../assets/svgs/music-on.svg';
import { ReactComponent as SymbolOff } from '../../assets/svgs/music-off.svg';
import * as SpotifyApi from '../../api/spotify';
import { SpotifyPlaybackResponse } from '../../interfaces/API';

const SpotifyComponent: FunctionComponent = (): JSX.Element => {
  const [accessToken, setAccessToken] = useState<string>('');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const windowHash = window.location.hash;
  const token = windowHash
    .split('&')
    .filter((value) => value.includes('access_token'))[0];

  useEffect(() => {
    if (accessToken.length > 0) {
      SpotifyApi
        .getPlaybackState(accessToken)
        .then((response: SpotifyPlaybackResponse) => console.log(response));
      SpotifyApi
        .getPlaybackState(accessToken)
        .then((response: SpotifyPlaybackResponse) => setIsPlayingMusic(response.is_playing));
    }
    if (token !== undefined) {
      const value = token.split('=');
      setAccessToken(value[1]);
    }
  }, [token, accessToken]);

  const playbackAction = isPlayingMusic ? SpotifyApi.pauseSpotify : SpotifyApi.resumeSpotify;
  const onClick = (): void => {
    playbackAction(accessToken);
    setIsPlayingMusic(!isPlayingMusic);
  };

  const symbol = isPlayingMusic ? SymbolOff : SymbolOn;

  return (
    <Presentational
      Symbol={symbol}
      // symbolOn={SymbolOn}
      // symbolOff={SymbolOff}
      onClick={onClick}
      name="Spotify"
    />
  );
};

export default SpotifyComponent;
