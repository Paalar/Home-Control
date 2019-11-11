import { Dispatch, SetStateAction } from 'react';

const cityBikeUrl = 'https://gbfs.urbansharing.com/trondheimbysykkel.no/station_information.json';
const cityBikeStationStatusUrl = 'https://gbfs.urbansharing.com/trondheimbysykkel.no/station_status.json';

export const fetchCityBikeData = (
  dispatch: Dispatch<SetStateAction<never[]>>,
): void => {
  fetch(cityBikeUrl)
    .then((response) => {
      if (!response.ok) {
        console.log(response.status);
        throw new Error(response.statusText);
      } else {
        response
          .json()
          .then((result) => result.data)
          .then((data) => dispatch(data.stations));
      }
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const fetchCityBikeStationStatus = (
  dispatch: Dispatch<SetStateAction<never[]>>,
): void => {
  fetch(cityBikeStationStatusUrl)
    .then((response) => {
      if (!response.ok) {
        console.log(response.status);
        throw new Error(response.statusText);
      } else {
        response
          .json()
          .then((result) => result.data)
          .then((data) => dispatch(data.stations));
      }
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const fetchAtbData = (): null => null;
