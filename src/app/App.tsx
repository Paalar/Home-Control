import React, { useContext } from 'react';
import './App.scss';
import './common.scss';
import EnturSrvice from '@entur/sdk';
import CityBike from '../components/CityBike/index';
import ATB from '../components/ATB/index';
import SpotifyRoutine from '../components/SpotifyRoutine';
import CoffeeMachineRoutine from '../components/CoffeeMachineRoutine';
import { GlobalContext } from '../hooks/globalContext';
import ErrorHeader from '../components/ErrorHeader';

const clientName = process.env.REACT_APP_ENTUR_CLIENT_NAME || '';
const enturService = new EnturSrvice({ clientName });

const App = (): JSX.Element => {
  const { state } = useContext(GlobalContext);
  const errorHeader = state.error ? <ErrorHeader /> : undefined;
  return (
    <>
      {errorHeader}
      <div id="information-container">
        <CityBike />
        <ATB enturService={enturService} />
      </div>
      <div id="home-control-container">
        <SpotifyRoutine />
        <CoffeeMachineRoutine />
      </div>
    </>
  );
};

export default App;
