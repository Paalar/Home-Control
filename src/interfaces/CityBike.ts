export interface CityBikeStations {
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

export interface CityBike {
  station_id: string;
  num_bikes_available: number;
  capacity: number;
  name: string;
  address: string;
}

export default CityBike;
