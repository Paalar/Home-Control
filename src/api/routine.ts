import * as RoutineTypes from '../constants/RoutineTypes';
import * as RoutineApi from '../constants/routineApi';

const brewCoffeeEvent = (): Promise<void> => (
  fetch(RoutineApi.brewCoffeeEventUrl, {
    method: 'GET',
    mode: 'cors',
  })
    .then((response) => console.log(response))
    .catch((error) => console.log(error))
);

const pauseSpotify = (): Promise<void> => (
  fetch(RoutineApi.spotifyPauseUrl, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer BQBG5EZW9JSePxCZLZwF-jrqED5qvHFxnrMfb0_6DzBsUT4RIlkr5bl-0TpXgPZnqfCZfwp_J2ThvAaOgUQSo14eleoZSCykBkBUTi6ZSQHQrQTDg0HnVOcvLxxGkeu_yqr1DcwCiwbTs7NGFsvCSDmUai9ND30gLaNZ58MrIszGYpDLEGuiUy_kjA94l2lvp1KXDdq-Iqsso1ob7E9BMciBwi07QPSMKn4Uf6qAoiM_WAVF0XMLTtblSCY7Gz7AcEcTjGemaa9SiA',
    },
  })
    .then((response) => console.log(response))
    .catch((error) => console.log(error))
);

const fetchOnClickByRoutineType = (routine: RoutineTypes.RoutineType):
null | (() => Promise<void>) => {
  switch (routine) {
    case RoutineTypes.CoffeeMachineRoutine: {
      return brewCoffeeEvent;
    }
    case RoutineTypes.GoogleHomeRoutine: {
      return pauseSpotify;
    }
    default: return null;
  }
};

export default fetchOnClickByRoutineType;
