import React from 'react';
import './App.scss';
import RoutineComponent from '../components/RoutineComponent/index';
import * as RoutineTypes from '../constants/RoutineTypes';

const App = (): JSX.Element => (
  <div id="container">
    <RoutineComponent type={RoutineTypes.LightsRoutine} />
  </div>
);

export default App;
