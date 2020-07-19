import React, {
  FunctionComponent, useState, useEffect, useCallback, useContext,
} from 'react';
import { ReactComponent as SymbolOn } from '../../assets/svgs/music-on.svg';
import { ReactComponent as SymbolOff } from '../../assets/svgs/music-off.svg';
import SpotifyModal from './SpotifyModal';
import * as SpotifyApi from '../../api/spotify';
import * as LS from '../../utils/localStorage';
import * as WindowUtils from '../../utils/window';
import RoutineComponent from '../RoutineComponent';
import { GlobalContext, GlobalActionEnum } from '../../hooks/globalContext';

const spotifyModalCreator = (onClose: () => void) => <SpotifyModal onClose={onClose} />;

const SpotifyRoutine: FunctionComponent = (): JSX.Element => {
  const { dispatch } = useContext(GlobalContext);
  const [accessToken, setAccessToken] = useState(LS.SPOTIFY_TOKEN());
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const Symbol = isPlayingMusic ? SymbolOff : SymbolOn;

  const dispatchError = (message: string): void => {
    dispatch({ type: GlobalActionEnum.SET_ERROR, payload: message });
  };

  const updatePlayState = useCallback(
    () => {
      if (LS.isSpotifyTokenAlive()) {
        SpotifyApi.getPlaybackState()
          .then((response) => {
            if (response != null) {
              setIsPlayingMusic(response.is_playing);
            }
          })
          .catch((error) => console.log(error));
      }
    },
    [],
  );

  useEffect(() => {
    updatePlayState();
    setInterval(() => updatePlayState(), 10000);
    if (WindowUtils.urlHasSpotifyAccessToken()) {
      const token = WindowUtils.getSpotifyAccessToken();
      if (token !== LS.SPOTIFY_TOKEN() && !LS.isSpotifyTokenAlive()) {
        LS.setSpotifytoken(token);
        setAccessToken(token);
      }
    }
  }, [accessToken, updatePlayState]);

  const handleSpotifyRequest = async (): Promise<boolean> => {
    let promise: Response;

    if (isPlayingMusic) {
      promise = await SpotifyApi.pauseSpotify(dispatchError);
    } else {
      promise = await SpotifyApi.resumeSpotify(dispatchError);
    }
    return promise.ok;
  };

  const handleClick = async (): Promise<boolean> => {
    const result = await handleSpotifyRequest();
    if (result) setIsPlayingMusic(!isPlayingMusic);
    return result;
  };

  return (
    <RoutineComponent
      handleClick={handleClick}
      modalCreator={spotifyModalCreator}
    >
      <Symbol className="routine-icon" />
    </RoutineComponent>
  );
};

export default SpotifyRoutine;
