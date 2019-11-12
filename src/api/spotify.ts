import { Dispatch, SetStateAction } from 'react';
import * as RoutineApi from '../constants/routineApi';
import { spotifyClientId } from '../constants/secrets';
import { SpotifyPlaybackResponse, SpotifyAuthenticationError } from '../interfaces/API';

const ERROR_GET_PLAYBACK = 'Could not get Spotify status. You must play music on a device first';
const ERROR_ACCESS_TOKEN = 'Could not get an access token. Try logging in.';
const SPOTIFY_ERROR_AUTH = 'Only valid bearer authentication supported';

const responseType = 'token';
const redirectUri = 'http://localhost:3000/';
const spotifyUrl = 'https://accounts.spotify.com';
const scopes = ['user-modify-playback-state', 'user-read-playback-state'];
export const spotifyAuthorizationUrl = `${spotifyUrl}/authorize?client_id=${spotifyClientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=${responseType}`;

const setErrorMessage = (statusCode: number, setError: Dispatch<SetStateAction<string>>): void => {
  if (statusCode === 400) {
    setError(ERROR_ACCESS_TOKEN);
  } else if (statusCode === 404) {
    setError(ERROR_GET_PLAYBACK);
  }
};

export const pauseSpotify = (accessToken: string, setError: Dispatch<SetStateAction<string>>):
Promise<Response> => (
  fetch(RoutineApi.spotifyPauseUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        setErrorMessage(response.status, setError);
      }
      return response.json();
    })
    .catch((error) => console.log(error))
);

export const resumeSpotify = (accessToken: string, setError: Dispatch<SetStateAction<string>>):
Promise<Response> => (
  fetch(RoutineApi.spotifyResumeUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        setErrorMessage(response.status, setError);
      }
      return response.json();
    })
    .catch((error) => console.log(error))
);

export const getPlaybackState = (accessToken: string): Promise<SpotifyPlaybackResponse> => (
  fetch(RoutineApi.spotifyPlaybackState, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error))
);
