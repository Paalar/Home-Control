import { useEffect, useState } from 'react';
import { StationResponse, StationStatusResponse } from '../interfaces/CityBike';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Response = any | undefined;
export type FetchResponse = [Response, boolean, boolean];
export type StationState = StationResponse | undefined;
export type StationStatusState = StationStatusResponse | undefined;

export const useFetch = (url: string, options: RequestInit): FetchResponse => {
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

export const useFetchInterval = (
  url: string, options: RequestInit, interval: number,
): FetchResponse => {
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
