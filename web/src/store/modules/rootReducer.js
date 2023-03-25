import { combineReducers } from 'redux';

import cliente from './cliente/reducer';
import servico from './servico/reducer';
import colaborador from './colaborador/reducer';
import horario from './horario/reducer';
import agendamento from './agendamento/reducer';

export default combineReducers({
  cliente,
  servico,
  colaborador,
  horario,
  agendamento,
});
