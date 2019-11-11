import React, { FunctionComponent } from 'react';
import Presentational from './presentational';
import * as RoutineTypes from '../../constants/RoutineTypes';
import * as SvgPaths from '../../constants/SvgRetrieval';
import fetchOnClickByRoutineType from '../../api/routine';
import Modal from '../../interfaces/Modal';

interface Props {
  type: RoutineTypes.RoutineType;
}

const SymbolGetter = (type: RoutineTypes.RoutineType): [string, string, Modal]|null => {
  switch (type) {
    case RoutineTypes.LightsRoutine: {
      const modalData = { exist: true, title: 'Lights settings' };
      return [SvgPaths.lightsOnSymbol, SvgPaths.lightsOffSymbol, modalData];
    }
    case RoutineTypes.CoffeeMachineRoutine: {
      const modalData = { exist: true, title: 'Coffe machine settings' };
      return [SvgPaths.coffeeOnSymbol, SvgPaths.coffeeOffSymbol, modalData];
    }
    case RoutineTypes.BedroomHeaterRoutine: {
      const modalData = { exist: false };
      return [SvgPaths.heaterOnSymbol, SvgPaths.heaterOffSymbol, modalData];
    }
    case RoutineTypes.LivingRoomHeaterRoutine: {
      const modalData = { exist: false };
      return [SvgPaths.heaterOnSymbol, SvgPaths.heaterOffSymbol, modalData];
    }
    case RoutineTypes.TVRoutine: {
      const modalData = { exist: false };
      return [SvgPaths.tvOnSymbol, SvgPaths.tvOffSymbol, modalData];
    }
    case RoutineTypes.PCRoutine: {
      const modalData = { exist: false };
      return [SvgPaths.pcOnSymbol, SvgPaths.pcOffSymbol, modalData];
    }
    case RoutineTypes.GoogleHomeRoutine: {
      const modalData = { exist: true, title: 'Google Home - Music settings' };
      return [SvgPaths.musicOnSymbol, SvgPaths.musicOffSymbol, modalData];
    }
    default: {
      return null;
    }
  }
};

const RoutineComponent: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const { type } = props;
  const symbols = SymbolGetter(type);
  const handleClick = fetchOnClickByRoutineType(type);
  if (symbols === null) {
    return <></>;
  }
  return (
    <Presentational
      symbolOn={symbols[0]}
      symbolOff={symbols[1]}
      clickEvent={handleClick}
      modalData={symbols[2]}
    />
  );
};

export default RoutineComponent;
