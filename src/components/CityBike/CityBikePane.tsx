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
    <div className="second-box text-pane">
      <p className="text-pane__description">{stationName}</p>
      <p className="text-pane__value">
        {bikesAvailable}
        /
        {capacity}
        <BicycleSymbol style={{ verticalAlign: 'middle', marginLeft: '0.3em' }} />
      </p>
    </div>
  );
};

export default CityBikePane;
