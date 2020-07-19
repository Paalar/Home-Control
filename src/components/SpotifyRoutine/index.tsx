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
import { SpotifyItem, SpotifyPlaybackResponse } from '../../interfaces/API';

const spotifyModalCreator = (onClose: () => void) => <SpotifyModal onClose={onClose} />;

const getStatus = (isPlaying: boolean, song: SpotifyItem | undefined): string => {
  if (!LS.SPOTIFY_TOKEN()) {
    return 'No token';
  }
  if (!LS.isSpotifyTokenAlive()) {
    return 'Token expired';
  }
  if (song && isPlaying) {
    return song.name;
  }
  return 'Paused';
};

const SpotifyRoutine: FunctionComponent = (): JSX.Element => {
  const { dispatch } = useContext(GlobalContext);
  const [accessToken, setAccessToken] = useState(LS.SPOTIFY_TOKEN());
  const [song, setSong] = useState<SpotifyItem>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const Symbol = isPlaying ? SymbolOff : SymbolOn;

  const dispatchError = (message: string): void => {
    dispatch({ type: GlobalActionEnum.SET_ERROR, payload: message });
  };

  const updatePlayState = useCallback(
    () => {
      if (LS.isSpotifyTokenAlive()) {
        SpotifyApi.getPlaybackState(dispatchError)
          .then((response) => {
            if (response != null) {
              setSong(response.item);
              setIsPlaying(response.is_playing);
            }
          });
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
        window.location.reload();
      }
    }
  }, [accessToken, updatePlayState]);

  const handleClick = async (): Promise<boolean> => {
    const result = await SpotifyApi.togglePlaySpotify(isPlaying, dispatchError);
    if (result) setIsPlaying(!isPlaying);
    return result.ok;
  };

  return (
    <RoutineComponent
      handleClick={handleClick}
      modalCreator={spotifyModalCreator}
      status={getStatus(isPlaying, song)}
    >
      <Symbol className="routine-icon" />
    </RoutineComponent>
  );
};

export default SpotifyRoutine;
