import {all} from 'redux-saga/effects';

import salao from './salao/sagas';

export default function* rootSaga() {
  return yield all([salao]);
}
