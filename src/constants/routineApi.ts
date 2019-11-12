import { iftttKey } from './secrets';

// IFTTT
const getEventByKey = (event: string): string => (
  `https://maker.ifttt.com/trigger/${event}/with/key/${iftttKey}`
);
const brewCoffeeKey = 'brew_coffee_for_2';

export const brewCoffeeEventUrl = getEventByKey(brewCoffeeKey);

// Spotify
export const spotifyPauseUrl = 'https://api.spotify.com/v1/me/player/pause';
export const spotifyResumeUrl = 'https://api.spotify.com/v1/me/player/play';
export const spotifyPlaybackState = 'https://api.spotify.com/v1/me/player';
