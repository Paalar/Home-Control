import * as RoutineApi from '../constants/routineApi';
import { spotifyClientId } from '../constants/secrets';
import { SpotifyPlaybackResponse } from '../interfaces/API';

const responseType = 'token';
const redirectUri = 'http://localhost:3000/';
const spotifyUrl = 'https://accounts.spotify.com';
const scopes = ['user-modify-playback-state', 'user-read-playback-state'];
export const spotifyAuthorizationUrl = `${spotifyUrl}/authorize?client_id=${spotifyClientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=${responseType}`;

export const pauseSpotify = (accessToken: string): Promise<void> => (
  fetch(RoutineApi.spotifyPauseUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => console.log(response))
    .catch((error) => console.log(error))
);

export const resumeSpotify = (accessToken: string): Promise<void> => (
  fetch(RoutineApi.spotifyResumeUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => console.log(response))
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
