import React, { FunctionComponent } from 'react';
import { EstimatedCall } from '@entur/sdk';
import moment from 'moment';
import BusPane from './BusPane';
import { ReactComponent as BusSymbol } from '../../assets/svgs/bus.svg';
import { PANE_ICON_STYLE } from '../../assets/svgs/variables';

interface Props {
  departuresToCityCenter: EstimatedCall[];
  departuresFromCityCenter: EstimatedCall[];
  currentTime: moment.Moment;
}

const createBusPanes = (departures: EstimatedCall[], currentTime: moment.Moment): JSX.Element[] => (
  departures.map((departure) => (
    <BusPane
      key={departure.serviceJourney.id}
      departure={departure}
      currentTime={currentTime}
    />
  ))
);

const Presentational: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const { departuresFromCityCenter, departuresToCityCenter, currentTime } = props;
  return (
    <div className="atb__wrapper info-container first-box">
      <h1 className="title">
        ATB - Bakkegata
        <BusSymbol style={PANE_ICON_STYLE} />
      </h1>
      <div className="departures__wrapper">
        <div className="departures">
          <h3 className="title">
            Til sentrum
          </h3>
          {createBusPanes(departuresToCityCenter, currentTime)}
        </div>
        <div className="departures">
          <h3 className="title">
            Fra sentrum
          </h3>
          {createBusPanes(departuresFromCityCenter, currentTime)}
        </div>
      </div>
    </div>
  );
};

export default Presentational;
