import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';


export const Container = styled(RectButton)`
  width: 100%;
  height: 56px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.COLORS.SUCCESS_900};
`;

export const Text = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.SM}px;
    color: ${theme.COLORS.WHITE};
  `}
`;
