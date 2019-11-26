import { StationsResponse, StationStatusesResponse } from '../interfaces/API';

const BIKE_STATION_URL = 'https://gbfs.urbansharing.com/trondheimbysykkel.no/station_information.json';
const BIKE_STATION_STATUS_URL = 'https://gbfs.urbansharing.com/trondheimbysykkel.no/station_status.json';

export const fetchCityBikeStations = (): Promise<StationsResponse> => (
  fetch(BIKE_STATION_URL)
    .then((response) => {
      if (!response.ok) {
        console.log(response.status);
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch((error) => {
      console.log(error);
      throw error;
    })
);

export const fetchCityBikeStationStatuses = (): Promise<StationStatusesResponse> => (
  fetch(BIKE_STATION_STATUS_URL)
    .then((response) => {
      if (!response.ok) {
        console.log(response.status);
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch((error) => {
      console.log(error);
      throw error;
    })
);
