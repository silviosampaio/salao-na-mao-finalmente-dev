import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import { updateAgendamento } from './actions';
import types from './types';
import api from '../../../services/api';
import { notification } from '../../../services/rsuite';
import consts from '../../../consts';

export function* filterAgenramentos({ range }) {
  try {
    const { data: res } = yield call(api.post, '/agendamento/filter', {
      salaoId: consts.salaoId,
      range,
    });

    if (res.error) {
      // ALERT DO RSUITE
      notification('error', {
        placement: 'topStart',
        title: 'Ops...',
        description: res.message,
      });
      return false;
    }

    yield put(updateAgendamento({ agendamentos: res.agendamentos }));
    // COLOCAR OS CLIENTES NO REDUCER
  } catch (err) {
    // COLOCAR AQUI O ALERT DO RSUITE
    notification('error', {
      placement: 'topStart',
      title: 'Ops...',
      description: err.message,
    });
  }
}

export default all([takeLatest(types.FILTER_AGENDAMENTOS, filterAgenramentos)]);
