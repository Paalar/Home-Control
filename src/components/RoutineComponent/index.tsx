import React, { FunctionComponent } from 'react';
import Presentational from './presentational';
import * as RoutineTypes from '../../constants/RoutineTypes';
import routineData from './retrieval';

interface Props {
  type: RoutineTypes.RoutineType;
}

const RoutineComponent: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const { type } = props;
  const routine = routineData(type);

  return (
    <Presentational
      routine={routine}
    />
  );
};

export default RoutineComponent;
