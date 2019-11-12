import { StationsResponse, StationStatusesResponse } from '../interfaces/API';

const cityBikeStationsUrl = 'https://gbfs.urbansharing.com/trondheimbysykkel.no/station_information.json';
const cityBikeStationStatusUrl = 'https://gbfs.urbansharing.com/trondheimbysykkel.no/station_status.json';

export const fetchCityBikeStations = (): Promise<StationsResponse> => (
  fetch(cityBikeStationsUrl)
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
  fetch(cityBikeStationStatusUrl)
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
