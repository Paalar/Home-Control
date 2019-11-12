import React, { FunctionComponent, useState } from 'react';
import Presentational from './presentational';
import { ReactComponent as SymbolOn } from '../../assets/svgs/coffee-on.svg';
import { ReactComponent as SymbolOff } from '../../assets/svgs/coffee-off.svg';
import * as IFTTApi from '../../api/ifttt';

const TIMEOUT = 35 * 1000;

const CoffeeMachineRoutine: FunctionComponent = (): JSX.Element => {
  const [isBrewing, setIsBrewing] = useState(false);

  const startBrewing = (): void => {
    // IFTTApi.brewCoffeeEvent();
    setIsBrewing(true);
    setTimeout(() => {
      setIsBrewing(false);
    }, TIMEOUT);
  };

  const symbol = isBrewing ? SymbolOn : SymbolOff;
  return (
    <Presentational
      Symbol={symbol}
      onClick={startBrewing}
      isBrewing={isBrewing}
    />
  );
};

export default CoffeeMachineRoutine;
