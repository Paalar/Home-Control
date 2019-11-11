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
    <div className="bus-pane pane second-box">
      <p>
        {departure.serviceJourney.journeyPattern.line.publicCode}
        {` ${'-'} `}
        {departure.destinationDisplay.frontText}
      </p>
      <p>
        {minutesLeft <= 0 ? 'Nå' : `${minutesLeft} min.`}
      </p>
    </div>
  );
};

export default BusPane;
