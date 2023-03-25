import produce from 'immer';
import types from './types';
const INITIAL_STATE = {
  behavior: 'create', // create, update, read
  components: {
    confirmDelete: false,
    drawer: false,
    tab: 'dados-cadastrais', // dados-cadastrais, agendamentos, arquivos
  },
  form: {
    filtering: false,
    disabled: true,
    saving: false,
  },
  cliente: {
    email: '',
    nome: '',
    telefone: '',
    dataNascimento: '',
    sexo: 'M',
    documento: {
      tipo: 'cpf',
      numero: '',
    },
    endereco: {
      cidade: '',
      uf: '',
      cep: '',
      logradouro: '',
      numero: '',
      pais: 'BR',
    },
  },
  clientes: [],
};

function cliente(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.UPDATE_CLIENTE: {
      return produce(state, (draft) => {
        draft = { ...draft, ...action.payload };
        return draft;
      });
    }

    case types.FILTER_CLIENTE: {
      return produce(state, (draft) => {
        draft.form.filtering = true;
        return draft;
      });
    }

    case types.RESET_CLIENTE: {
      return produce(state, (draft) => {
        draft.cliente = INITIAL_STATE.cliente;
        return draft;
      });
    }
    default:
      return state;
  }
}

export default cliente;
