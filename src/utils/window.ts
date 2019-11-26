const spotifyAccessToken = (): string => window.location.hash.split('&').filter((value) => value.includes('access_token'))[0];

export const urlHasSpotifyAccessToken = (): boolean => spotifyAccessToken() !== undefined;
export const getSpotifyAccessToken = (): string => spotifyAccessToken().split('=')[1];
export const getWindowUrl = (): string => window.location.href;
