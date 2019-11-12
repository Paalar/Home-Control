import { Station, StationStatus } from './CityBikeInterfaces';

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
