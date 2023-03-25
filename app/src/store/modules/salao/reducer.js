import types from './types';
import produce from 'immer';
import * as _ from 'underscore';
import consts from '../../../consts';

const INITIAL_STATE = {
  salao: {},
  servicos: [],
  agenda: [],
  colaboradores: [],
  agendamento: {
    clienteId: consts.clienteId,
    salaoId: consts.salaoId,
    servicoId: null,
    colaboradorId: null,
    data: null,
  },
  form: {
    inputFiltro: '',
    inputFiltroFoco: false,
    modalEspecialista: false,
    modalAgendamento: 0,
    agendamentoLoading: false,
  },
};

function salao(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.UPDATE_FORM: {
      return produce(state, (draft) => {
        draft.form = {...draft.form, [action.key]: action.value};
      });
    }
    case types.UPDATE_SALAO: {
      return produce(state, (draft) => {
        draft.salao = {...draft.salao, ...action.salao};
      });
    }
    case types.UPDATE_SERVICOS: {
      return produce(state, (draft) => {
        draft.servicos = action.servicos;
      });
    }
    case types.UPDATE_AGENDA: {
      return produce(state, (draft) => {
        draft.agenda = [...draft.agenda, ...action.agenda];
      });
    }
    case types.UPDATE_COLABORADORES: {
      return produce(state, (draft) => {
        draft.colaboradores = _.uniq([
          ...draft.colaboradores,
          ...action.colaboradores,
        ]);
      });
    }
    case types.UPDATE_AGENDAMENTO: {
      return produce(state, (draft) => {
        if (action.key === 'servicoId') {
          draft.form.modalAgendamento = 2;
        }

        draft.agendamento[action.key] = action.value;
      });
    }
    case types.RESET_AGENDAMENTO: {
      return produce(state, (draft) => {
        draft.agenda = INITIAL_STATE.agenda;
        draft.colaboradores = INITIAL_STATE.colaboradores;
        draft.agendamento = INITIAL_STATE.agendamento;
      });
    }
    default: {
      return state;
    }
  }
}

export default salao;
