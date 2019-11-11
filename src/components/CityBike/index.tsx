import React, { useState, useEffect } from 'react';
import Presentational from './presentational';
import { fetchCityBikeData, fetchCityBikeStationStatus } from '../../api/API';
import ICityBike, { Station, StationStatus } from '../../interfaces/CityBikeInterfaces';
import './cityBike.scss';

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
  const [stations, setStations] = useState([]);
  const [stationStatus, setStationStatus] = useState([]);

  useEffect(() => {
    fetchCityBikeData(setStations);
    fetchCityBikeStationStatus(setStationStatus);
  }, []);

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
