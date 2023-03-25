import styled from 'styled-components/native';

export const Cover = styled.ImageBackground.attrs((props) => ({
  source: {uri: props.background},
  resizeMode: 'cover',
}))`
  width: 100%;
  height: 300px;
`;
