import React from 'react';
import './App.scss';
import './common.scss';
import CityBike from '../components/CityBike/index';
import ATB from '../components/ATB/index';
import SpotifyRoutine from '../components/SpotifyRoutine';
import CoffeeMachineRoutine from '../components/CoffeeMachineRoutine';

const App = (): JSX.Element => (
  <>
    <div id="information-container">
      <CityBike />
      <ATB />
    </div>
    <div id="home-control-container">
      <SpotifyRoutine />
      <CoffeeMachineRoutine />
    </div>
  </>
);

export default App;
