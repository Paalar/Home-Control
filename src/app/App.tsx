import React from 'react';
import './App.scss';
import './common.scss';
import CityBike from '../components/CityBike/index';
import ATB from '../components/ATB/index';
import SpotifyRoutine from '../components/SpotifyRoutine';
import CoffeeMachineRoutine from '../components/CoffeeMachineRoutine';

const App = (): JSX.Element => (
  <div id="container">
    <div id="information-container">
      <CityBike />
      <ATB />
    </div>
    <div id="home-control-container">
      {/* <RoutineComponent type={RoutineTypes.LightsRoutine} />
      <RoutineComponent type={RoutineTypes.LivingRoomHeaterRoutine} />
      <RoutineComponent type={RoutineTypes.BedroomHeaterRoutine} />
      <RoutineComponent type={RoutineTypes.PCRoutine} />
      <RoutineComponent type={RoutineTypes.TVRoutine} /> */}
      <SpotifyRoutine />
      <CoffeeMachineRoutine />
    </div>
  </div>
);

export default App;
