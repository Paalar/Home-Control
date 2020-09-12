import {
  StationState,
  StationStatusState,
  useFetchInterval,
} from './fetch';

const noOptions = {};
const BIKE_STATION_URL = 'https://gbfs.urbansharing.com/trondheimbysykkel.no/station_information.json';
const BIKE_STATION_STATUS_URL = 'https://gbfs.urbansharing.com/trondheimbysykkel.no/station_status.json';
const EACH_MINUTE = 1000 * 60;

type StationPromise = [StationState, boolean, boolean];
type StationStatusPromise = [StationStatusState, boolean, boolean ];

export const useFetchStations = (): StationPromise => (
  useFetchInterval(BIKE_STATION_URL, noOptions, EACH_MINUTE)
);

export const useFetchStationStatuses = (): StationStatusPromise => (
  useFetchInterval(BIKE_STATION_STATUS_URL, noOptions, EACH_MINUTE)
);
