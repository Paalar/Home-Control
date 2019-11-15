import { FunctionComponent, SVGProps } from 'react';

export type SVG = FunctionComponent<SVGProps<SVGSVGElement>>;

export interface ModalProps {
  close: () => void;
}
