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
  padding: 25px 24px 23px;
`;

export const HeaderContent = styled(SafeAreaView)`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  margin-left: 16px;

  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.XL}px;
    color: ${theme.COLORS.TITLE};
  `}
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    // flexGrow: 1,
    paddingTop: 32,
    paddingBottom: 40,
    marginHorizontal: 24,
  },
})`
  /* flex-grow: 1; */
`;

export const MainInfosBook = styled.View`
  flex-direction: row;
`;

export const Image = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 150px;
  height: 150px;
`;
export const WrapperInfosBook = styled.View`
  flex: 1;
  margin-left: 10px;
`;

export const BookTitle = styled.Text`
  line-height: 20px;

  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const Author = styled.Text`
  ${({ theme }) => css`
    margin-top: 5px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.SECONDARY_500};
  `}
`;

export const Publisher = styled.Text`
  ${({ theme }) => css`
    margin-top: 5px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.SECONDARY_500};
  `}
`;

export const Price = styled.Text`
  ${({ theme }) => css`
    margin-top: 10px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const Description = styled.View`
  margin-top: 32px;
`;

export const DescriptionTitle = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.LG}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  margin-top: 12px;
  background-color: ${({ theme }) => theme.COLORS.SHAPE};
`;

export const DescriptionText = styled.Text`
  margin-top: 10px;
  line-height: 20px;
  text-align: justify;
  
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.SM}px;
    color: ${theme.COLORS.SECONDARY_400};
  `}
`;

export const ViewMore = styled.TouchableOpacity`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
`;

export const ViewMoreText = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.SM}px;
    color: ${theme.COLORS.LINK};
  `}
`;
