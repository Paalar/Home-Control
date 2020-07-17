import React, { useState, useEffect } from 'react';
import Presentational from './presentational';
import useFetch, { BIKE_STATION_STATUS_URL, BIKE_STATION_URL} from '../../hooks/useFetch';
import ICityBike, {
  Station,
  StationStatus,
  isStationResponse,
  isStationStatusResponse,
} from '../../interfaces/CityBike';
import './cityBike.scss';

const EACH_HOUR = 60000;

const filterUnusedStations = (stations: Station[]): Station[] => (
  stations.filter((station) => (
    station.name === 'Dokkparken'
    || station.name === 'Thornesparken '
    || station.name === 'Bakke bru'
  ))
);

const filterUnusedStatuses = (
  stations: Station[], statuses: StationStatus[],
): StationStatus[] => (
  statuses.filter(
    (status) => stations.find(
      (station) => station.station_id === status.station_id,
    ),
  )
);

const mergeStationData = (
  stations: Station[], stationStatuses: StationStatus[],
): ICityBike[] => (
  stations.map((station, index) => ({
    station_id: station.station_id,
    num_bikes_available: stationStatuses[index].num_bikes_available,
    capacity: station.capacity,
    name: station.name,
    address: station.address,
  }))
);

const CityBike = (): JSX.Element => {
  const [stations, setStations] = useState<Station[]>([]);
  const [stationStatus, setStationStatus] = useState<StationStatus[]>([]);
  const [stationResponse, stationIsLoading, stationHasError] = useFetch(BIKE_STATION_URL, {});
  const [statusResponse, statusIsLoading, statusHasError] = useFetch(BIKE_STATION_STATUS_URL, {});

  useEffect(() => {
    const fetchStations = (): void => {
      if (statusResponse && isStationStatusResponse(statusResponse)) {
        setStationStatus(statusResponse.data.stations);
      }
      if (stationResponse && isStationResponse(stationResponse)) {
        setStations(stationResponse.data.stations);
      }
    };
    fetchStations();
    setInterval(fetchStations, EACH_HOUR);
  }, [stationResponse, statusResponse]);

  if (stations.length === 0 || stationStatus.length === 0) {
    return <></>;
  }

  const filteredStations = filterUnusedStations(stations);
  const filteredStatuses = filterUnusedStatuses(filteredStations, stationStatus);
  const mergedData = mergeStationData(filteredStations, filteredStatuses);

  return (
    <Presentational stations={mergedData} />
  );
};

export default CityBike;
