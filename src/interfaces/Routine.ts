import Modal from './Modal';
import { SVG } from './Common';

interface RoutineData {
  symbolOn: string;
  symbolOff: string;
  onClick: any;
  onHold: any;
  modal: Modal;
  name: string;
}

interface GenericRoutine {
  symbolOn: SVG;
  symbolOff: SVG;
  onClick: any;
  name: string;
}

export interface SpotifyRoutine {
  Symbol: SVG;
  onClick: () => void;
  name: string;
}

export default RoutineData;