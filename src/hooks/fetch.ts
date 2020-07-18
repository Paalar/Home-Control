import { useEffect, useState } from 'react';
import { StationResponse, StationStatusResponse } from '../interfaces/CityBike';

const BIKE_STATION_URL = 'https://gbfs.urbansharing.com/trondheimbysykkel.no/station_information.json';
const BIKE_STATION_STATUS_URL = 'https://gbfs.urbansharing.com/trondheimbysykkel.no/station_status.json';
const EACH_FIFTH_MINUTE = 300000;

type Response = any | undefined;
type FetchResponse = [Response, boolean, boolean];
export type StationState = StationResponse | undefined;
export type StationStatusState = StationStatusResponse | undefined;
type StationPromise = [StationState, boolean, boolean];
type StationStatusPromise = [StationStatusState, boolean, boolean ];

const noOptions = {};

const useFetch = (url: string, options: RequestInit): FetchResponse => {
  const [response, setResponse] = useState<Response>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = (): void => {
      setIsLoading(true);
      fetch(url, options)
        .then(async (res) => setResponse(await res.json()))
        .catch(() => setHasError(true))
        .finally(() => setIsLoading(false));
    };

    fetchData();
  }, [url, options]);

  return [response, isLoading, hasError];
};

const useFetchInterval = (url: string, options: RequestInit, interval: number): FetchResponse => {
  const [response, setResponse] = useState<Response>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = (): void => {
      setIsLoading(true);
      fetch(url, options)
        .then(async (res) => setResponse(await res.json()))
        .catch(() => setHasError(true))
        .finally(() => setIsLoading(false));
    };

    fetchData();
    setInterval(() => fetchData(), interval);

    return (): void => {
      clearInterval(interval);
    };
  }, [url, options, interval]);

  return [response, isLoading, hasError];
};

export const useFetchStations = (): StationPromise => (
  useFetchInterval(BIKE_STATION_URL, noOptions, EACH_FIFTH_MINUTE)
);

export const useFetchStationStatuses = (): StationStatusPromise => (
  useFetchInterval(BIKE_STATION_STATUS_URL, noOptions, EACH_FIFTH_MINUTE)
);
