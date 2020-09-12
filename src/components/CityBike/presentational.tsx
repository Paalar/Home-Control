import React, { FunctionComponent } from 'react';
import ICityBike from '../../interfaces/CityBike';
import CityBikePane from './CityBikePane';
import { ReactComponent as BicycleSymbol } from '../../assets/svgs/bicycle.svg';
import { PANE_ICON_STYLE } from '../../assets/svgs/variables';

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
        <BicycleSymbol style={PANE_ICON_STYLE} />
      </h1>
      {cityBikePanes}
    </div>
  );
};

export default Presentational;
