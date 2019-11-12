// IFTTT
const getEventByKey = (key: string): string => (
  `https://maker.ifttt.com/trigger/${key}/with/key/bB0Pdw4KCQTgOhEs3nCDxK`
);
const brewCoffeeKey = 'brew_coffee_2';

export const brewCoffeeEventUrl = getEventByKey(brewCoffeeKey);

// Spotify
export const spotifyPauseUrl = 'https://api.spotify.com/v1/me/player/pause';
export const spotifyResumeUrl = 'https://api.spotify.com/v1/me/player/play';
export const spotifyPlaybackState = 'https://api.spotify.com/v1/me/player';
