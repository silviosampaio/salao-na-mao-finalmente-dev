import types from './types';

export function addServico() {
  return { type: types.ADD_SERVICO };
}

export function updateServico(servico) {
  return { type: types.UPDATE_SERVICO, servico };
}

export function resetServico() {
  return { type: types.RESET_SERVICO };
}

export function allServicos() {
  return { type: types.ALL_SERVICOS };
}

export function removeArquivo(arquivo) {
  return { type: types.REMOVE_ARQUIVO, arquivo };
}

export function saveServico() {
  return { type: types.SAVE_SERVICO };
}

export function removeServico() {
  return { type: types.REMOVE_SERVICO };
}
