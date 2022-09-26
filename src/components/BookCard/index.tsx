import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

import {
  Container,
  Content,
  Image,
  Details,
  Name,
  Identification,
  Description,
  Line
} from './styles';

export interface BookProps {
  id: string;
  photo_url: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  author: string,
  publisher: string,
  publishedDate: Date,
  moreInfos: string,
}

interface Props extends RectButtonProps {
  data: BookProps;
}

export function BookCard({ data, ...rest }: Props) {
  const { COLORS } = useTheme();

  return (
    <Container>
      <Content {...rest}>
        <Image source={{ uri: data.photo_url }} />

        <Details>
          <Identification>
            <Name>{data.name}</Name>
            <Feather name="chevron-right" size={18} color={COLORS.SHAPE} />
          </Identification>

          <Description>{data.subtitle}</Description>
        </Details>
      </Content>

      <Line />
    </Container>
  )
}
