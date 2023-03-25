import React from 'react';
import {useDispatch} from 'react-redux';
import {updateForm} from '../../../../store/modules/salao/actions';
import {Box, Text, Cover, Button} from '../../../../styles';
import theme from '../../../../styles/theme.json';

const EspecialistasPicker = ({colaboradores, agendamento}) => {
  const dispatch = useDispatch();
  const colaborador = colaboradores.filter(
    (c) => c._id === agendamento.colaboradorId,
  )[0];

  return (
    <>
      <Box hasPadding removePaddingBottom direction="column">
        <Text bold color="dark">
          Gostaria de trocar o(a) especialista?
        </Text>
        <Box spacing="20px 0 0" align="center" height="50px">
          <Box align="center">
            <Cover
              width="45px"
              height="45px"
              circle
              image={colaborador?.foto}
            />
            <Text small>{colaborador?.nome}</Text>
          </Box>
          <Box>
            <Button
              uppercase={false}
              onPress={() => dispatch(updateForm('modalEspecialista', true))}
              textColor="muted"
              background={theme.colors.light}
              mode="contained"
              block>
              Trocar Especialista
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EspecialistasPicker;
