import { iftttKey } from '../constants/secrets';

const getEventByKey = (event: string): string => (
  `https://maker.ifttt.com/trigger/${event}/with/key/${iftttKey}`
);

export const ifttEvent = (key: string): string => getEventByKey(key);

export const startEvent = (url: string, handleError: () => void): void => {
  fetch(url)
    .catch(() => handleError());
};
