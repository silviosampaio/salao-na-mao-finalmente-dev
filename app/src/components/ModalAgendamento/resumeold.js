import React from 'react';
import {FlatList} from 'react-native';
import {Text, Title, Spacer, Box, Cover} from '../../styles';
import util from '../../util';
import theme from '../../styles/theme.json';

import Servico from '../Servico';

const ModalResume = () => {
  return (
    <FlatList
      style={{
        backgroundColor: util.toAlpha(theme.colors.muted, 5),
        flexGrow: 0,
        width: '100%',
        padding: 20,
      }}
      ListHeaderComponent={() => (
        <Box justify="flex-start" direction="column">
          <Box height="100px" align="center">
            <Cover
              width="80px"
              height="80px"
              image={`https://ath2.unileverservices.com/wp-content/uploads/sites/2/2019/05/03112440/Cabelo-masculino-curto-com-corte-fade.jpg?${new Date().getTime()}`}
            />
            <Box direction="column">
              <Title small bold>
                Salão corte certo
              </Title>
              <Text small>Porto Alegre • 5.2 kms</Text>
              <Spacer />
              <Text small>
                Total:{' '}
                <Text color="success" bold underline small>
                  R$ 45,00
                </Text>
              </Text>
            </Box>
          </Box>
        </Box>
      )}
      data={['a']}
      renderItem={({item}) => <Servico small key={item} selected item={item} />}
      keyExtractor={(item) => item}
    />
  );
};

export default ModalResume;
