import React, { FunctionComponent } from 'react';
import { EstimatedCall } from '@entur/sdk';
import moment from 'moment';

interface Props {
  departure: EstimatedCall;
  currentTime: moment.Moment;
}

const BusPane: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const { departure, currentTime } = props;
  const expectedDeparture = moment(departure.expectedDepartureTime);
  const minutesLeft = expectedDeparture.diff(currentTime, 'minutes');
  if (departure.destinationDisplay === undefined) {
    return (<></>);
  }
  return (
    <div className="bus-pane text-pane second-box">
      <p className="text-pane__description">
        {departure.serviceJourney.journeyPattern.line.publicCode}
        {` ${'-'} `}
        {departure.destinationDisplay.frontText}
      </p>
      <p className="text-pane__value">
        {minutesLeft <= 0 ? 'Nå' : `${minutesLeft} min.`}
      </p>
    </div>
  );
};

export default BusPane;
