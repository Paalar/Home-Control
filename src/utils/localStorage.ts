import moment from 'moment';

const LS_SPOTIFY_TOKEN = 'SPOTIFY_TOKEN';
const LS_SPOTIFY_TOKEN_EXPIRATION = 'SPOTIFY_TOKEN_EXPIRATION';

export const SPOTIFY_TOKEN = (): string | null => localStorage.getItem(LS_SPOTIFY_TOKEN);
export const SPOTIFY_TOKEN_EXPIRATION = (): string | null => (
  localStorage.getItem(LS_SPOTIFY_TOKEN_EXPIRATION)
);
export const setSpotifytoken = (token: string): void => {
  localStorage.setItem(LS_SPOTIFY_TOKEN, token);
  localStorage.setItem(LS_SPOTIFY_TOKEN_EXPIRATION, moment().add(3600, 'seconds').toString());
};
export const clearSpotifyStorage = (): void => {
  localStorage.removeItem(LS_SPOTIFY_TOKEN_EXPIRATION);
  localStorage.removeItem(LS_SPOTIFY_TOKEN);
};
export const spotifyStorageExists = (): boolean => (
  !(SPOTIFY_TOKEN_EXPIRATION() === null || SPOTIFY_TOKEN_EXPIRATION() === null)
);
export const spotifyTokenExpiresIn = (): number => {
  const token = SPOTIFY_TOKEN_EXPIRATION();
  if (token !== null) {
    const tokenExpiration = moment(token);
    const currentTime = moment();
    return tokenExpiration.diff(currentTime);
  }
  return -1;
};
export const isSpotifyTokenAlive = (): boolean|null => {
  const token = SPOTIFY_TOKEN_EXPIRATION();
  if (token !== null) {
    const tokenExpiration = moment(token);
    const currentTime = moment();
    return tokenExpiration.diff(currentTime) > 0;
  }
  return null;
};
