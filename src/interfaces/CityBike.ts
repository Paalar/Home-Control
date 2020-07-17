interface CityBikeStations {
  stations: Station[];
}

export interface Station {
  station_id: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
  capacity: number;
}

export interface StationStatus {
  station_id: string;
  is_installed: number;
  is_renting: number;
  is_returning: number;
  last_reported: number;
  num_bikes_available: number;
  num_docks_available: number;
}

interface CityBike {
  station_id: string;
  num_bikes_available: number;
  capacity: number;
  name: string;
  address: string;
}

interface CityBikeResponse {
  ttl: number;
  last_updated: number;
}

export interface StationResponse extends CityBikeResponse {
  data: {
    stations: Station[];
  };
}

export const isStationResponse = (response: any): response is StationResponse => (
  response.data && response.data.stations.length >= 0
);

export interface StationStatusResponse extends CityBikeResponse {
  data: {
    stations: StationStatus[];
  };
}

export const isStationStatusResponse = (
  response: any,
): response is StationStatusResponse => response.data && response.data.stations.length >= 0;

export default CityBike;
