import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Text } from './styles';

interface Props extends RectButtonProps {
  title: string;
  type?: 'add' | 'remove';
}

export function Button({ title, type = 'add', ...rest }: Props) {
  return (
    <Container type={type} {...rest}>
      <Text>{title}</Text>
    </Container>
  )
}