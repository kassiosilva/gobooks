import { TouchableOpacityProps } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import { Container } from './styles';

export function ButtonBack({ onPress, ...rest }: TouchableOpacityProps) {
  const { COLORS } = useTheme();
  const navigation = useNavigation()

  function handlePress() {
    navigation.goBack()
  }

  return (
    <Container testID="button-back" onPress={onPress || handlePress} {...rest}>
      <MaterialIcons name="chevron-left" size={18} color={COLORS.WHITE} />
    </Container>
  )
}