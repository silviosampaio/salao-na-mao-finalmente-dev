import React from 'react';

import {Text, Title, Spacer, Box, Cover} from '../../styles';
import util from '../../util';
import theme from '../../styles/theme.json';

const ModalResume = ({servicos, agendamento}) => {
  const servico = servicos.filter((s) => s._id === agendamento.servicoId)[0];

  return (
    <Box
      justify="flex-start"
      direction="column"
      hasPadding
      background={util.toAlpha(theme.colors.muted, 5)}>
      <Box align="center">
        <Cover
          width="80px"
          height="80px"
          image={
            servico?.arquivos
              ? `${util.AWS.bucketURL}/${servico?.arquivos[0]?.arquivo}`
              : ''
          }
        />
        <Box direction="column">
          <Title small bold>
            {servico?.titulo}
          </Title>

          <Spacer />
          <Text small>
            Total:{' '}
            <Text color="success" bold underline small>
              R$ {servico?.preco.toFixed(2)}
            </Text>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ModalResume;
