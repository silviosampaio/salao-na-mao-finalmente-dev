import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Linking, Share} from 'react-native';

import {
  Text,
  Title,
  Badge,
  Box,
  Button,
  Touchable,
  TextInput,
  GradientView,
} from '../../styles';

import {Cover} from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {updateForm} from '../../store/modules/salao/actions';
import theme from '../../styles/theme.json';

const Header = () => {
  const dispatch = useDispatch();
  const {salao, servicos, form} = useSelector((state) => state.salao);

  const openGps = (coords) => {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${coords[0]},${coords[1]}`,
    );
  };

  return (
    <>
      <Cover background={salao.capa}>
        <GradientView
          hasPadding
          justify="flex-end"
          colors={['#21232F33', '#21232FE6']}>
          <Badge color={salao.isOpened ? 'success' : 'danger'}>
            {salao.isOpened ? 'ABERTO' : 'FECHADO'}
          </Badge>
          <Title color="light">{salao.nome}</Title>
          <Text color="light">
            {salao?.endereco?.cidade} • {salao.distance} kms
          </Text>
        </GradientView>
      </Cover>
      <Box background="light" align="center">
        <Box hasPadding justify="space-between">
          <Touchable
            direction="column"
            align="center"
            onPress={() => Linking.openURL(`tel:${salao.telefone}`)}>
            <Icon name="phone" size={24} color={theme.colors.muted} />
            <Text small spacing="10px 0 0">
              Ligar
            </Text>
          </Touchable>
          <Touchable
            direction="column"
            align="center"
            onPress={() => openGps(salao?.geo?.coordinates)}>
            <Icon name="map-marker" size={24} color={theme.colors.muted} />
            <Text small spacing="10px 0 0">
              Visitar
            </Text>
          </Touchable>
          <Touchable
            direction="column"
            align="center"
            onPress={() =>
              Share.share({
                message: `${salao.nome} - Salão na mão.`,
              })
            }>
            <Icon name="share" size={24} color={theme.colors.muted} />
            <Text small spacing="10px 0 0">
              Enviar
            </Text>
          </Touchable>
        </Box>
        <Box align="center" justify="center" direction="column" hasPadding>
          <Button
            icon="clock-check-outline"
            background="success"
            mode="contained"
            uppercase={false}>
            Agendar Agora
          </Button>
          <Text small spacing="10px 0 0 0">
            Horarios disponíveis
          </Text>
        </Box>
      </Box>

      <Box background="light" direction="column" spacing="10px 0 0" hasPadding>
        <Title small>Serviços ({servicos.length})</Title>
        <TextInput
          value={form.inputFiltro}
          onChangeText={(value) => dispatch(updateForm('inputFiltro', value))}
          onFocus={() => dispatch(updateForm('inputFiltroFoco', true))}
          onBlur={() => dispatch(updateForm('inputFiltroFoco', false))}
          placeholder="Digite o nome do serviço..."
        />
      </Box>
    </>
  );
};

export default Header;
