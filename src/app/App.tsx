import React from 'react';
import './App.scss';
import RoutineComponent from '../components/RoutineComponent/index';
import * as RoutineTypes from '../constants/RoutineTypes';
import CityBike from '../components/CityBike/index';
import ATB from '../components/ATB/index';

const App = (): JSX.Element => (
  <div id="container">
    <div id="information-container">
      <CityBike />
      <ATB />
    </div>
    <div id="home-control-container">
      <RoutineComponent type={RoutineTypes.LightsRoutine} />
      <RoutineComponent type={RoutineTypes.CoffeeMachineRoutine} />
      <RoutineComponent type={RoutineTypes.LivingRoomHeaterRoutine} />
      <RoutineComponent type={RoutineTypes.BedroomHeaterRoutine} />
      <RoutineComponent type={RoutineTypes.GoogleHomeRoutine} />
      <RoutineComponent type={RoutineTypes.PCRoutine} />
      <RoutineComponent type={RoutineTypes.TVRoutine} />
    </div>
  </div>
);

export default App;
