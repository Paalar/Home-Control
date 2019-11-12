import { Station, StationStatus } from './CityBikeInterfaces';

// Citybike
interface CityBikeResponse {
  ttl: number;
  last_updated: number;
}

export interface StationsResponse extends CityBikeResponse {
  data: {
    stations: Station[];
  };
}

export interface StationStatusesResponse extends CityBikeResponse {
  data: {
    stations: StationStatus[];
  };
}

// Spotify
interface SpotifyDevice {
  id: 'string';
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: string;
  volume_percent: number;
}

export interface SpotifyPlaybackResponse {
  // Some other data found @ https://developer.spotify.com/console/get-user-player/?market=
  device: SpotifyDevice;
  is_playing: boolean;
}
