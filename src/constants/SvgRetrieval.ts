const lightsOnPath = 'lights-on.svg';
const lightsOffPath = 'lights-off.svg';

const svgPathGetter = (svg: svgTypes): string => `svgs/${svg}`;

type svgTypes =
  typeof lightsOnPath
  | typeof lightsOffPath;

export const LightsOnSymbol = svgPathGetter(lightsOnPath);
export const LightsOffSymbol = svgPathGetter(lightsOffPath);
