import React from 'react';
import SpotifyModal from './SpotifyModal';
import ErrorHeader from '../ErrorHeader';
import RoutineComponent from '../RoutineComponent';
import { SVG } from '../../interfaces/Common';

interface Props {
  Symbol: SVG;
  onClick: (() => void) | null;
  errorMessage: string;
}

const Presentational = (props: Props): JSX.Element => {
  const { Symbol, onClick, errorMessage } = props;

  const error = <ErrorHeader errorMessage={errorMessage} />;

  const handleClick = (): void => {
    if (onClick !== null) {
      onClick();
    }
  };

  const modal = (cancel: () => void): JSX.Element => (
    <SpotifyModal close={cancel} />
  );

  const displayError = errorMessage.length > 0 ? error : null;
  const symbol = <Symbol className="routine-icon" />;

  return (
    <RoutineComponent
      handleClick={handleClick}
      modalCreator={modal}
      symbol={symbol}
      error={displayError ? error : undefined}
    />
  );
};

export default Presentational;
