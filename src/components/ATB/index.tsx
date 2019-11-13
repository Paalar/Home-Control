import React, { FunctionComponent, useState, useEffect } from 'react';
import EnturService, { EstimatedCall } from '@entur/sdk';
import moment from 'moment';
import './atb.scss';
import Presentational from './presentational';

const enturService = new EnturService({ clientName: 'gpd-hc' });
const displaySize = 5;
const bakkegataId = 'NSR:StopPlace:43577';
const toCityCenterId = 'NSR:Quay:74792';
const fromCityCenterId = 'NSR:Quay:74793';

const ATB: FunctionComponent = (): JSX.Element => {
  const [departuresToCityCenter, setDepartuesToCityCenter] = useState<EstimatedCall[]>([]);
  const [departuesFromCityCenter, setDeparturesFromCityCenter] = useState<EstimatedCall[]>([]);
  const currentTime = moment();

  const fetchBusData = (): void => {
    enturService.getStopPlaceDepartures(bakkegataId)
      .then((buses) => {
        const busesToCityCenter = buses
          .filter((bus) => bus.quay.id === toCityCenterId)
          .slice(0, displaySize);
        const busesFromCityCenter = buses
          .filter((bus) => bus.quay.id === fromCityCenterId)
          .slice(0, displaySize);
        setDepartuesToCityCenter(busesToCityCenter);
        setDeparturesFromCityCenter(busesFromCityCenter);
      });
  };

  useEffect(() => {
    fetchBusData();
    setInterval(fetchBusData, 10 * 1000);
  }, []);


  return (
    <Presentational
      departuresFromCityCenter={departuesFromCityCenter}
      departuresToCityCenter={departuresToCityCenter}
      currentTime={currentTime}
    />
  );
};

export default ATB;
