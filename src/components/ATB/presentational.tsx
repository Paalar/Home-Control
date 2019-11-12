import React, { FunctionComponent } from 'react';
import { EstimatedCall } from '@entur/sdk';
import moment from 'moment';
import BusPane from './BusPane';
import { ReactComponent as BusSymbol } from '../../assets/svgs/bus.svg';

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
    <div id="atb-container" className="info-container first-box">
      <h1 className="title">
        ATB - Bakkegata
        <BusSymbol style={{
          fill: 'white',
          verticalAlign: 'middle',
          marginLeft: '1rem',
          width: '2rem',
          height: '2rem',
        }}
        />
      </h1>
      <div id="departures-container">
        <div id="departures-to-city">
          <h3 className="title">
            Til sentrum
          </h3>
          {createBusPanes(departuresToCityCenter, currentTime)}
        </div>
        <div id="departures-from-city">
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
