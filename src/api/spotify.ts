import { spotifyClientId } from '../constants/secrets';
import { SpotifyPlaybackResponse, FetchMethods } from '../interfaces/API';
import * as LS from '../utils/localStorage';
import * as Window from '../utils/window';

type ErrorFunction = (message: string) => void;

export const spotifyPauseUrl = 'https://api.spotify.com/v1/me/player/pause';
export const spotifyResumeUrl = 'https://api.spotify.com/v1/me/player/play';
export const spotifyPlaybackState = 'https://api.spotify.com/v1/me/player';

const ERROR_GET_PLAYBACK = 'Could not get Spotify status. You must play music on a device first';
const ERROR_ACCESS_TOKEN = 'Could not get an access token. Try logging in.';

const responseType = 'token';
const redirectUri = Window.getWindowUrl();
const spotifyUrl = 'https://accounts.spotify.com';
const scopes = ['user-modify-playback-state', 'user-read-playback-state'];
export const spotifyAuthorizationUrl = `${spotifyUrl}/authorize?client_id=${spotifyClientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=${responseType}`;

const toggleUrl = (isPlaying: boolean): string => (
  isPlaying ? spotifyPauseUrl : spotifyResumeUrl
);

const genericFetch = (url: string, method: FetchMethods) => (
  fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${LS.SPOTIFY_TOKEN()}`,
    },
  })
);

export const togglePlaySpotify = (
  isPlaying: boolean, setError: ErrorFunction,
): Promise<Response> => (
  genericFetch(toggleUrl(isPlaying), 'PUT')
    .then((response) => {
      if (!response.ok) {
        setError(ERROR_GET_PLAYBACK);
      }
      return response;
    })
    .catch((error) => {
      setError(ERROR_ACCESS_TOKEN);
      return error;
    })
);

export const getPlaybackState = (setError?: ErrorFunction): Promise<SpotifyPlaybackResponse> => (
  genericFetch(spotifyPlaybackState, 'GET')
    .then((response) => response.json())
    .catch((error) => {
      if (setError) setError(ERROR_GET_PLAYBACK);
      return error;
    })
);
