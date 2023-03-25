import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import types from './types';
import {
  updateServico,
  resetServico,
  allServicos as allServicosAction,
} from './actions';
import api from '../../../services/api';
import { notification } from '../../../services/rsuite';

import consts from '../../../consts';

export function* addServico() {
  const { servico, form, components } = yield select((state) => state.servico);

  try {
    yield put(updateServico({ form: { ...form, saving: true } }));

    const formData = new FormData();
    formData.append('servico', JSON.stringify(servico));
    formData.append('salaoId', consts.salaoId);
    servico.arquivos.map((a, i) => {
      formData.append(`arquivo_${i}`, a);
    });

    const { data: res } = yield call(api.post, '/servico', formData);
    yield put(updateServico({ form: { ...form, saving: false } }));

    if (res.error) {
      // ALERT DO RSUITE
      notification('error', {
        placement: 'topStart',
        title: 'Ops...',
        description: res.message,
      });
      return false;
    }

    yield put(allServicosAction());
    yield put(updateServico({ components: { ...components, drawer: false } }));
    yield put(resetServico());

    notification('success', {
      placement: 'topStart',
      title: 'Feitoooo!!',
      description: 'Serviço salvo com sucesso!',
    });
  } catch (err) {
    yield put(updateServico({ form: { ...form, saving: false } }));
    notification('error', {
      placement: 'topStart',
      title: 'Ops...',
      description: err.message,
    });
  }
}

export function* allServicos() {
  const { form } = yield select((state) => state.servico);

  try {
    yield put(updateServico({ form: { ...form, filtering: true } }));

    const { data: res } = yield call(
      api.get,
      `/servico/salao/609310a1002ab333d1ae1716`
    );
    yield put(updateServico({ form: { ...form, filtering: false } }));

    if (res.error) {
      // ALERT DO RSUITE
      notification('error', {
        placement: 'topStart',
        title: 'Ops...',
        description: res.message,
      });
      return false;
    }

    yield put(updateServico({ servicos: res.servicos }));
  } catch (err) {
    // COLOCAR AQUI O ALERT DO RSUITE
    yield put(updateServico({ form: { ...form, filtering: false } }));
    notification('error', {
      placement: 'topStart',
      title: 'Ops...',
      description: err.message,
    });
  }
}

export function* removeArquivo(payload) {
  const { form } = yield select((state) => state.servico);

  try {
    yield put(updateServico({ form: { ...form, saving: true } }));
    const { data: res } = yield call(api.post, `/servico/remove-arquivo/`, {
      arquivo: payload.arquivo,
    });
    yield put(updateServico({ form: { ...form, saving: false } }));

    if (res.error) {
      // ALERT DO RSUITE
      notification('error', {
        placement: 'topStart',
        title: 'Ops...',
        description: res.message,
      });
      return false;
    }
  } catch (err) {
    yield put(updateServico({ form: { ...form, saving: false } }));
    notification('error', {
      placement: 'topStart',
      title: 'Ops...',
      description: err.message,
    });
  }
}

export function* saveServico() {
  const { servico, form, components } = yield select((state) => state.servico);

  try {
    yield put(updateServico({ form: { ...form, saving: true } }));

    const formData = new FormData();
    formData.append('servico', JSON.stringify(servico));
    formData.append('salaoId', consts.salaoId);
    servico.arquivos.map((a, i) => {
      formData.append(`arquivo_${i}`, a);
    });

    const { data: res } = yield call(
      api.put,
      `/servico/${servico._id}`,
      formData
    );
    yield put(updateServico({ form: { ...form, saving: false } }));

    if (res.error) {
      // ALERT DO RSUITE
      notification('error', {
        placement: 'topStart',
        title: 'Ops...',
        description: res.message,
      });
      return false;
    }

    yield put(allServicosAction());
    yield put(updateServico({ components: { ...components, drawer: false } }));
    yield put(resetServico());

    notification('success', {
      placement: 'topStart',
      title: 'Feitoooo!!',
      description: 'Serviço salvo com sucesso!',
    });
  } catch (err) {
    yield put(updateServico({ form: { ...form, saving: false } }));
    notification('error', {
      placement: 'topStart',
      title: 'Ops...',
      description: err.message,
    });
  }
}

export function* removeServico() {
  const { servico, form, components } = yield select((state) => state.servico);

  try {
    yield put(updateServico({ form: { ...form, saving: true } }));

    const { data: res } = yield call(api.delete, `/servico/${servico._id}`);
    yield put(updateServico({ form: { ...form, saving: false } }));

    if (res.error) {
      // ALERT DO RSUITE
      notification('error', {
        placement: 'topStart',
        title: 'Ops...',
        description: res.message,
      });
      return false;
    }

    yield put(allServicosAction());
    yield put(
      updateServico({
        components: { ...components, drawer: false, confirmDelete: false },
      })
    );
  } catch (err) {
    // COLOCAR AQUI O ALERT DO RSUITE
    yield put(updateServico({ form: { ...form, saving: false } }));
    notification('error', {
      placement: 'topStart',
      title: 'Ops...',
      description: err.message,
    });
  }
}

export default all([
  takeLatest(types.ADD_SERVICO, addServico),
  takeLatest(types.ALL_SERVICOS, allServicos),
  takeLatest(types.REMOVE_ARQUIVO, removeArquivo),
  takeLatest(types.SAVE_SERVICO, saveServico),
  takeLatest(types.REMOVE_SERVICO, removeServico),
]);
