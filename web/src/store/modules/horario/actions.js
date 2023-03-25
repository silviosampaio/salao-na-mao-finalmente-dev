import types from './types';

export function updateHorario(payload) {
  return { type: types.UPDATE_HORARIO, payload };
}

export function addHorario() {
  return { type: types.ADD_HORARIO };
}

export function saveHorario() {
  return { type: types.SAVE_HORARIO };
}

export function resetHorario() {
  return { type: types.RESET_HORARIO };
}

export function allHorarios() {
  return { type: types.ALL_HORARIOS };
}

export function allServicos() {
  return { type: types.ALL_SERVICOS };
}

export function removeHorario() {
  return { type: types.REMOVE_HORARIO };
}

export function filterColaboradores() {
  return { type: types.FILTER_COLABORADORES };
}
