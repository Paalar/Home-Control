import { Station, StationStatus } from './CityBike';

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

// Weather
export interface TimeForecast {
  location: {
    areaMaxWindSpeed: { _attributes: { mps: string } };
    cloudiness: { _attributes: { id: string; percent: string }};
    dewpointTemperature: { _attributes: { id: string; unit: string; value: string } };
    fog: { _attributes: { _attributes: { id: string; percent: string } } };
    highClouds: { _attributes: { id: string; percent: string } };
    humidity: { _attributes: { unit: string; value: string } };
    lowClouds: { _attributes: { id: string; percent: string } };
    mediumClouds: { _attributes: { id: string; percent: string } };
    pressure: { _attributes: { id: string; unit: string; value: string } };
    temperature: { _attributes: { id: string; unit: string; value: string } };
    windDirection: { _attributes: { deg: string; id: string; name: string } };
    windGust: { _attributes: { id: string; mps: string } };
    windSpeed: { _attributes: { beaufort: string; id: string; mps: string; name: string } };
  };
}

export interface METWeatherResponse {
  weatherdata: {
    product: {
      time: TimeForecast[];
    };
  };
}
