import produce from 'immer';
import types from './types';
const INITIAL_STATE = {
  components: {
    modal: false,
  },
  agendamento: {},
  agendamentos: [],
};

function agendamento(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.UPDATE_AGENDAMENTO: {
      return produce(state, (draft) => {
        draft = { ...draft, ...action.payload };
        return draft;
      });
    }
    default:
      return state;
  }
}

export default agendamento;
