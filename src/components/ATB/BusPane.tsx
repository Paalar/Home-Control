import React, { FunctionComponent, useCallback, useState } from 'react';
import { EstimatedCall } from '@entur/sdk';
import moment from 'moment';
import OverflowingText from '../OverflowingText';

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
      <OverflowingText className="text-pane__description overflowing__wrapper">
        <p>
          {departure.serviceJourney.journeyPattern?.line.publicCode}
          {` ${'-'} `}
          {departure.destinationDisplay.frontText}
        </p>
      </OverflowingText>
      <p className="text-pane__value">
        {minutesLeft <= 0 ? 'Nå' : `${minutesLeft} min.`}
      </p>
    </div>
  );
};

export default BusPane;
