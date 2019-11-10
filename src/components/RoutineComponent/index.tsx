import React, { FunctionComponent } from 'react';
import Presentational from './presentational';
import * as RoutineTypes from '../../constants/RoutineTypes';
import * as SvgPaths from '../../constants/SvgRetrieval';

interface Props {
  type: RoutineTypes.RoutineType;
}

const SymbolGetter = (type: RoutineTypes.RoutineType): [string, string]|null => {
  switch (type) {
    case RoutineTypes.LightsRoutine: {
      return [SvgPaths.LightsOnSymbol, SvgPaths.LightsOffSymbol];
    }
    default: {
      return null;
    }
  }
};

const RoutineComponent: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const { type } = props;
  const symbols = SymbolGetter(type);
  if (symbols === null) {
    return <></>;
  }
  return (
    <Presentational symbolOn={symbols[0]} symbolOff={symbols[1]} />
  );
};

export default RoutineComponent;
