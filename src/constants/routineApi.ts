const brewCoffeeKey = 'brew_coffee_2';

const getEventByKey = (key: string): string => (
  `https://maker.ifttt.com/trigger/${key}/with/key/bB0Pdw4KCQTgOhEs3nCDxK`
);

export const brewCoffeeEventUrl = getEventByKey(brewCoffeeKey);
export const googleHomeSpotifyId = 'd34c2e029d12179b24a15a354e57a02a';
export const spotifyPauseUrl = `https://api.spotify.com/v1/me/player/pause?device_id=${googleHomeSpotifyId}`;
