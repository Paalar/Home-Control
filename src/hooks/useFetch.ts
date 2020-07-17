import { useEffect, useState } from 'react';

export const BIKE_STATION_URL = 'https://gbfs.urbansharing.com/trondheimbysykkel.no/station_information.json';
export const BIKE_STATION_STATUS_URL = 'https://gbfs.urbansharing.com/trondheimbysykkel.no/station_status.json';

type Response = unknown | undefined;

const useFetch = (url: string, options: RequestInit): [Response, boolean, boolean] => {
  const [response, setResponse] = useState<Response>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  console.log(response);

  useEffect(() => {
    setIsLoading(true);
    fetch(url, options)
      .then((res) => setResponse(res.body))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [url, options]);

  return [response, isLoading, hasError];
};

export default useFetch;
