import React from 'react';

import {Text, Box, Button, Cover, Spacer, Touchable} from '../../styles';
import moment from 'moment';
import util from '../../util';
import {
  updateAgendamento,
  filterAgenda,
  resetAgendamento,
} from '../../store/modules/salao/actions';
import {useDispatch} from 'react-redux';

const Servico = ({item}) => {
  const dispatch = useDispatch();

  return (
    <Touchable
      align="center"
      hasPadding
      height="100px"
      background="light"
      onPress={() => {
        dispatch(resetAgendamento());
        dispatch(updateAgendamento('servicoId', item?._id));
        dispatch(filterAgenda());
      }}>
      <Cover
        image={
          item?.arquivos
            ? `${util.AWS.bucketURL}/${item?.arquivos[0]?.arquivo}`
            : ''
        }
      />
      <Box direction="column">
        <Text bold color="dark">
          {item?.titulo}
        </Text>
        <Spacer />
        <Text small>
          R$ {item?.preco} •{' '}
          {moment(item?.duracao)
            .format('H:mm')
            .replace(/^(?:0:)?0?/, '')}{' '}
          mins
        </Text>
      </Box>
      <Box direction="column" align="flex-end">
        <Button
          icon="clock-check-outline"
          background="success"
          textColor="light"
          mode="contained">
          AGENDAR
        </Button>
      </Box>
    </Touchable>
  );
};

export default Servico;
