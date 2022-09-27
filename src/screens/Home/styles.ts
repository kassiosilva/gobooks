import styled, { css } from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Header = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.COLORS.GRADIENT,
}))`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 40px 24px 58px;
`;

export const Greeting = styled(SafeAreaView)`
  flex-direction: row;
  align-items: center;
`;

export const GreetingText = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.LG}px;
    color: ${theme.COLORS.TITLE}
  `}
`;

export const MenuHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 25px 24px 0;
  padding-bottom: 22px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.COLORS.SHAPE};
`;

export const Title = styled.Text`
  line-height: 20px;

  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.LG}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.SECONDARY_900}
  `}
`;
