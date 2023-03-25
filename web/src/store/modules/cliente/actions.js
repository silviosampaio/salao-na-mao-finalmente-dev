import types from './types';

export function filterCliente(filters) {
  return { type: types.FILTER_CLIENTE, filters };
}

export function updateCliente(payload) {
  return { type: types.UPDATE_CLIENTE, payload };
}

export function addCliente(cliente) {
  return { type: types.ADD_CLIENTE, cliente };
}

export function resetCliente() {
  return { type: types.RESET_CLIENTE };
}

export function allClientes() {
  return { type: types.ALL_CLIENTES };
}

export function unlinkCliente(clienteId) {
  return { type: types.UNLINK_CLIENTE, clienteId };
}
