import React from 'react';
import {Touchable, GradientView, Text, Spacer, Box} from '../../styles';
import {View, Dimensions} from 'react-native';
import theme from '../../styles/theme.json';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ModalHeader = ({onPress = () => {}, form}) => {
  return (
    <View
      style={{
        width: '100%',
        height: 70,
      }}>
      <GradientView
        colors={[theme.colors.dark, theme.colors.primary]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Box>
          <Touchable
            onPress={onPress}
            width={Dimensions.get('screen').width}
            justify={
              form.modalAgendamento !== 2 ? 'space-between' : 'flex-start'
            }
            hasPadding>
            {form.modalAgendamento === 2 && (
              <View style={{marginRight: 20}}>
                <Icon
                  name="chevron-left"
                  color={theme.colors.light}
                  size={30}
                />
              </View>
            )}
            <View>
              <Text bold color="light" small>
                Finalizar Agendamento
              </Text>
              <Spacer size="4px" />
              <Text color="light" small>
                Horário, pagamento e especialista.
              </Text>
            </View>
            {form.modalAgendamento !== 2 && (
              <View>
                <Icon
                  name="chevron-right"
                  color={theme.colors.light}
                  size={30}
                />
              </View>
            )}
          </Touchable>
        </Box>
      </GradientView>
    </View>
  );
};

export default ModalHeader;
