import produce from 'immer';
import types from './types';
import moment from 'moment';

const INITIAL_STATE = {
  behavior: 'create', // create, update, read
  components: {
    confirmDelete: false,
    drawer: false,
    tab: 'servicos', // servicos, produtos
  },
  form: {
    filtering: false,
    disabled: false,
    saving: false,
  },
  servico: {
    titulo: '',
    preco: '',
    comissao: '',
    duracao: moment('00:30', 'HH:mm').format(),
    recorrencia: '',
    descricao: '',
    status: 'A',
    arquivos: [],
  },
  servicos: [],
};

function servico(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.UPDATE_SERVICO: {
      return produce(state, (draft) => {
        draft = { ...draft, ...action.servico };
        return draft;
      });
    }

    case types.RESET_SERVICO: {
      return produce(state, (draft) => {
        draft.servico = INITIAL_STATE.servico;
        return draft;
      });
    }

    default:
      return state;
  }
}

export default servico;
