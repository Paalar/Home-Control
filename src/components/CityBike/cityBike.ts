import CityBike, { Station, StationStatus } from '../../interfaces/CityBike';

export const STATIONS = ['Dokkparken', 'Thornesparken', 'Bakke bru'];

export const filterUnusedStations = (
  allStations: Station[], wantedStations: string[],
): Station[] => (
  allStations.filter((station) => (wantedStations.includes(station.name.trimEnd())))
);

export const filterUnusedStatuses = (
  stations: Station[], statuses: StationStatus[],
): StationStatus[] => (
  statuses.filter(
    (status) => stations.find(
      (station) => station.station_id === status.station_id,
    ),
  )
);

export const mergeStationData = (
  stations: Station[], stationStatuses: StationStatus[],
): CityBike[] => (
  stations.map((station, index) => ({
    station_id: station.station_id,
    num_bikes_available: stationStatuses[index].num_bikes_available,
    capacity: station.capacity,
    name: station.name,
    address: station.address,
  }))
);
