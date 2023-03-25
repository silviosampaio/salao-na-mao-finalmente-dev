import types from './types';

export function filterColaborador(filters) {
  return { type: types.FILTER_COLABORADOR, filters };
}

export function updateColaborador(payload) {
  return { type: types.UPDATE_COLABORADOR, payload };
}

export function addColaborador(colaborador) {
  return { type: types.ADD_COLABORADOR, colaborador };
}

export function resetColaborador() {
  return { type: types.RESET_COLABORADOR };
}

export function allColaboradores() {
  return { type: types.ALL_COLABORADORES };
}

export function unlinkColaborador(colaboradorId) {
  return { type: types.UNLINK_COLABORADOR, colaboradorId };
}

export function allServicos() {
  return { type: types.ALL_SERVICOS };
}

export function saveColaborador() {
  return { type: types.SAVE_COLABORADOR };
}
