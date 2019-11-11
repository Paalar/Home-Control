const lightsOnPath = 'lights-on.svg';
const lightsOffPath = 'lights-off.svg';
const bicyclePath = 'bicycle.svg';
const coffeeOn = 'coffee-on.svg';
const coffeeOff = 'coffee-off.svg';
const heaterOn = 'heater-on.svg';
const heaterOff = 'heater-off.svg';
const musicOff = 'music-off.svg';
const musicOn = 'music-on.svg';
const pcOff = 'pc-off.svg';
const pcOn = 'pc-on.svg';
const tvOff = 'tv-off.svg';
const tvOn = 'tv-on.svg';

const svgPathGetter = (svg: svgTypes): string => `svgs/${svg}`;

type svgTypes =
  typeof bicyclePath
  | typeof lightsOnPath
  | typeof lightsOffPath
  | typeof coffeeOn
  | typeof coffeeOff
  | typeof heaterOn
  | typeof heaterOff
  | typeof musicOff
  | typeof musicOn
  | typeof pcOff
  | typeof pcOn
  | typeof tvOff
  | typeof tvOn;

export const lightsOnSymbol = svgPathGetter(lightsOnPath);
export const lightsOffSymbol = svgPathGetter(lightsOffPath);
export const bicycleSymbol = svgPathGetter(bicyclePath);
export const coffeeOnSymbol = svgPathGetter(coffeeOn);
export const coffeeOffSymbol = svgPathGetter(coffeeOff);
export const heaterOnSymbol = svgPathGetter(heaterOn);
export const heaterOffSymbol = svgPathGetter(heaterOff);
export const musicOffSymbol = svgPathGetter(musicOff);
export const musicOnSymbol = svgPathGetter(musicOn);
export const pcOffSymbol = svgPathGetter(pcOff);
export const pcOnSymbol = svgPathGetter(pcOn);
export const tvOffSymbol = svgPathGetter(tvOff);
export const tvOnSymbol = svgPathGetter(tvOn);
