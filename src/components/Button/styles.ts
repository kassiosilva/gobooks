import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

interface Props {
  type: 'add' | 'remove';
}

export const Container = styled(RectButton)<Props>`
  width: 100%;
  height: 56px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background-color: ${({ theme, type }) => 
    type === 'add' ? theme.COLORS.SUCCESS_900 : theme.COLORS.PRIMARY_800};

`;

export const Text = styled.Text<Props>`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.SM}px;
    color: ${theme.COLORS.WHITE};
  `}
`;
