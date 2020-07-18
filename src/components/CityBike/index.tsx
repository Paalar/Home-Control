import React from 'react';
import Presentational from './presentational';
import {
  useFetchStations,
  useFetchStationStatuses,
  StationState,
  StationStatusState,
} from '../../hooks/fetch';
import ICityBike, {
  Station,
  StationStatus,
} from '../../interfaces/CityBike';
import './cityBike.scss';

const wantedStations = ['Dokkparken', 'Thornesparken', 'Bakke bru'];

const filterUnusedStations = (stations: Station[]): Station[] => (
  stations.filter((station) => (wantedStations.includes(station.name.trimEnd())))
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

const nonEmptyResponse = (
  stationResponse: StationState, statusResponse: StationStatusState,
): boolean => (
  !stationResponse
  || !stationResponse.data.stations.length
  || !statusResponse
  || !statusResponse.data.stations.length
);

const CityBike = (): JSX.Element => {
  const [stationResponse] = useFetchStations();
  const [statusResponse] = useFetchStationStatuses();

  if (nonEmptyResponse(stationResponse, statusResponse)) {
    return <Presentational stations={[]} />;
  }

  const filteredStations = filterUnusedStations(stationResponse!.data.stations);
  const filteredStatuses = filterUnusedStatuses(filteredStations, statusResponse!.data.stations);
  const mergedData = mergeStationData(filteredStations, filteredStatuses);

  return (
    <Presentational stations={mergedData} />
  );
};

export default CityBike;
