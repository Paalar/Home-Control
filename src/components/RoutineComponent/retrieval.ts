/* eslint default-case: off */
import React from 'react';
import * as RoutineTypes from '../../constants/RoutineTypes';
import RoutineData from '../../interfaces/Routine';
import * as SvgPaths from '../../constants/SvgRetrieval';
import Modal from '../../interfaces/Modal';

const createRoutineDataObject = (
  symbolOn: string,
  symbolOff: string,
  modal: Modal,
  onClick: any,
  onHold: any,
  name: string,
): RoutineData => ({
  symbolOn,
  symbolOff,
  onClick,
  onHold,
  modal,
  name,
});

const tempClick = (routine: string) => console.log(`You've clicked on ${routine}`);
const tempHold = (routine: string) => React.createElement('p', null, `You've held on ${routine}`);

const routineData = (type: RoutineTypes.RoutineType): RoutineData => {
  switch (type) {
    case RoutineTypes.LightsRoutine: {
      const modalData = { exist: true, title: 'Lights settings' };
      return createRoutineDataObject(
        SvgPaths.lightsOnSymbol, SvgPaths.lightsOffSymbol, modalData, tempClick, tempHold, 'lights',
      );
    }
    case RoutineTypes.CoffeeMachineRoutine: {
      const modalData = { exist: true, title: 'Coffe machine settings' };
      return createRoutineDataObject(
        SvgPaths.coffeeOnSymbol, SvgPaths.coffeeOffSymbol, modalData, tempClick, tempHold, 'coffee',
      );
    }
    case RoutineTypes.BedroomHeaterRoutine: {
      const modalData = { exist: false };
      return createRoutineDataObject(
        SvgPaths.heaterOnSymbol, SvgPaths.heaterOffSymbol, modalData, tempClick, tempHold, 'bedroom heater',
      );
    }
    case RoutineTypes.LivingRoomHeaterRoutine: {
      const modalData = { exist: false };
      return createRoutineDataObject(
        SvgPaths.heaterOnSymbol, SvgPaths.heaterOffSymbol, modalData, tempClick, tempHold, 'living room heater',
      );
    }
    case RoutineTypes.TVRoutine: {
      const modalData = { exist: false };
      return createRoutineDataObject(
        SvgPaths.tvOnSymbol, SvgPaths.tvOffSymbol, modalData, tempClick, tempHold, 'tv',
      );
    }
    case RoutineTypes.PCRoutine: {
      const modalData = { exist: false };
      return createRoutineDataObject(
        SvgPaths.pcOnSymbol, SvgPaths.pcOffSymbol, modalData, tempClick, tempHold, 'pc',
      );
    }
    case RoutineTypes.GoogleHomeRoutine: {
      const modalData = { exist: false };
      return createRoutineDataObject(
        SvgPaths.pcOnSymbol, SvgPaths.pcOffSymbol, modalData, tempClick, tempHold, 'pc',
      );
    }
  }
};

export default routineData;
