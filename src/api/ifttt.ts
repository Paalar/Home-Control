import { iftttKey } from '../constants/secrets';

const getEventByKey = (event: string): string => (
  `https://maker.ifttt.com/trigger/${event}/with/key/${iftttKey}`
);

const ifttEvent = (key: string): string => getEventByKey(key);

const startEvent = (key: string, handleError: () => void): void => {
  const url = ifttEvent(key);
  fetch(url)
    .catch(() => handleError());
};

export default startEvent;
