import React, { FunctionComponent } from 'react';
import { ReactComponent as BicycleSymbol } from '../../assets/svgs/bicycle.svg';

interface Props {
  bikesAvailable: number;
  stationName: string;
  capacity: number;
}

const CityBikePane: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const { bikesAvailable, stationName, capacity } = props;
  return (
    <div className="city-bike-pane second-box pane">
      <div className="city-bike-station">
        <p>{stationName}</p>
      </div>
      <div className="city-bike-bicycles">
        <p>
          {bikesAvailable}
          /
          {capacity}
          <BicycleSymbol style={{ verticalAlign: 'middle', marginLeft: '0.3rem' }} />
        </p>
      </div>
    </div>
  );
};

export default CityBikePane;
