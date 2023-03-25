import moment from 'moment';

export default {
  diasSemana: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  toAlpha: (hex, alpha) => {
    const alphas = {
      100: 'FF',
      95: 'F2',
      90: 'E6',
      85: 'D9',
      80: 'CC',
      75: 'BF',
      70: 'B3',
      65: 'A6',
      60: '99',
      55: '8C',
      50: '80',
      45: '73',
      40: '66',
      35: '59',
      30: '4D',
      25: '40',
      20: '33',
      15: '26',
      10: '1A',
      5: '0D',
    };

    return hex + alphas[alpha];
  },
  selectAgendamento: (agenda, data = null, colaboradorId = null) => {
    let horariosDisponiveis = [];
    let colaboradoresDia = [];

    if (agenda.length > 0) {
      data = data || Object.keys(agenda?.[0])?.[0];
      const dia = agenda.filter((a) => Object.keys(a)[0] === data)?.[0];
      const diaObject = dia?.[data];
      if (diaObject) {
        colaboradorId = colaboradorId || Object.keys(diaObject)?.[0];
        colaboradoresDia = diaObject;
        horariosDisponiveis = diaObject?.[colaboradorId];
      }
    }

    return {horariosDisponiveis, data, colaboradorId, colaboradoresDia};
  },
  AWS: {
    bucketURL: 'https://salao-na-mao.s3.amazonaws.com',
  },
};
