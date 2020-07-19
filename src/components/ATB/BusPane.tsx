import React, { FunctionComponent, useCallback, useState } from 'react';
import { EstimatedCall } from '@entur/sdk';
import moment from 'moment';

interface Props {
  departure: EstimatedCall;
  currentTime: moment.Moment;
}

const BusPane: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const { departure, currentTime } = props;
  const [isOverflowing, setIsOverflowing] = useState(false);
  const setOverflow = useCallback((node: HTMLSpanElement) => {
    if (node && node.offsetWidth < node.scrollWidth) {
      setIsOverflowing(true);
    }
  }, []);
  const expectedDeparture = moment(departure.expectedDepartureTime);
  const minutesLeft = expectedDeparture.diff(currentTime, 'minutes');
  if (departure.destinationDisplay === undefined) {
    return (<></>);
  }
  return (
    <div className="bus-pane text-pane second-box">
      <span ref={setOverflow} className="text-pane__description">
        <p className={isOverflowing ? 'overflowing' : ''}>
          {departure.serviceJourney.journeyPattern?.line.publicCode}
          {` ${'-'} `}
          {departure.destinationDisplay.frontText}
        </p>
      </span>
      <p className="text-pane__value">
        {minutesLeft <= 0 ? 'Nå' : `${minutesLeft} min.`}
      </p>
    </div>
  );
};

export default BusPane;
