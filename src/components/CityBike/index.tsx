import React from 'react';
import Presentational from './presentational';
import {
  StationState,
  StationStatusState,
} from '../../hooks/fetch';
import { useFetchStations, useFetchStationStatuses } from '../../hooks/cityBike';
import {
  filterUnusedStations,
  filterUnusedStatuses,
  mergeStationData,
  STATIONS,
} from './cityBike';

const nonEmptyResponse = (respone: StationState | StationStatusState): boolean => (
  !respone || !respone.data.stations.length
);

const CityBike = (): JSX.Element => {
  const [stationResponse] = useFetchStations();
  const [statusResponse] = useFetchStationStatuses();

  if (nonEmptyResponse(stationResponse) || nonEmptyResponse(statusResponse)) {
    return <Presentational stations={[]} />;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const filteredStations = filterUnusedStations(stationResponse!.data.stations, STATIONS);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const filteredStatuses = filterUnusedStatuses(filteredStations, statusResponse!.data.stations);
  const mergedData = mergeStationData(filteredStations, filteredStatuses);

  return (
    <Presentational stations={mergedData} />
  );
};

export default CityBike;
