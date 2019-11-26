import * as RoutineApi from '../constants/routineApi';
import { spotifyClientId } from '../constants/secrets';
import { SpotifyPlaybackResponse } from '../interfaces/API';
import * as LS from '../utils/localStorage';
import * as Window from '../utils/window';

const ERROR_GET_PLAYBACK = 'Could not get Spotify status. You must play music on a device first';
const ERROR_ACCESS_TOKEN = 'Could not get an access token. Try logging in.';

const responseType = 'token';
const redirectUri = Window.getWindowUrl();
const spotifyUrl = 'https://accounts.spotify.com';
const scopes = ['user-modify-playback-state', 'user-read-playback-state'];
export const spotifyAuthorizationUrl = `${spotifyUrl}/authorize?client_id=${spotifyClientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=${responseType}`;

const genericPut = (url: string): Promise<Response> => {
  const accessToken = LS.SPOTIFY_TOKEN();
  if (!LS.isSpotifyTokenAlive()) {
    throw new Error('No access token');
  }
  return fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const genericGet = (url: string): Promise<Response> => {
  const accessToken = LS.SPOTIFY_TOKEN();
  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const setErrorMessage = (message: string, setError: (message: string) => void): void => {
  setError(message);
  setInterval(() => setError(''), 5000);
};

export const pauseSpotify = (setError: (message: string) => void): Promise<Response> => {
  try {
    return genericPut(RoutineApi.spotifyPauseUrl)
      .then((response) => {
        if (!response.ok) {
          setErrorMessage(ERROR_GET_PLAYBACK, setError);
        }
        return response;
      })
      .catch((error) => error);
  } catch (error) {
    setErrorMessage(ERROR_ACCESS_TOKEN, setError);
    return error;
  }
};

export const resumeSpotify = (setError: (message: string) => void): Promise<Response> => {
  try {
    return genericPut(RoutineApi.spotifyResumeUrl)
      .then((response) => {
        if (!response.ok) {
          setErrorMessage(ERROR_GET_PLAYBACK, setError);
        }
        return response;
      })
      .catch((error) => error);
  } catch (error) {
    setErrorMessage(ERROR_ACCESS_TOKEN, setError);
    return error;
  }
};

export const getPlaybackState = (): Promise<SpotifyPlaybackResponse> => (
  genericGet(RoutineApi.spotifyPlaybackState)
    .then((response) => response.json())
    .catch((error) => console.log(error))
);
