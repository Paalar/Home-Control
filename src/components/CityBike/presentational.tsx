import React, { FunctionComponent } from 'react';
import ICityBike from '../../interfaces/CityBike';
import CityBikePane from './CityBikePane';
import { ReactComponent as BicycleSymbol } from '../../assets/svgs/bicycle.svg';

interface Props {
  stations: ICityBike[];
}

const createCityBikePanes = (stations: ICityBike[]): JSX.Element[] => (
  stations.map((station) => (
    <CityBikePane
      key={station.station_id}
      bikesAvailable={station.num_bikes_available}
      capacity={station.capacity}
      stationName={station.name}
    />
  ))
);

const Presentational: FunctionComponent<Props> = ({ stations }: Props): JSX.Element => {
  const cityBikePanes = createCityBikePanes(stations);
  return (
    <div className="city-bike__wrapper info-container first-box">
      <h1 className="title">
        Bysykkel
        <BicycleSymbol
          style={{
            fill: 'white',
            verticalAlign: 'middle',
            marginLeft: '1rem',
            width: '2rem',
            height: '2rem',
          }}
        />
      </h1>
      {cityBikePanes}
    </div>
  );
};

export default Presentational;
