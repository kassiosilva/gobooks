import { TextInput, TextInputProps, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import {
  Container,
  Input,
  InputArea,
  ButtonClear,
  Button 
} from './styles';

interface Props extends TextInputProps {
  inputRef?: React.RefObject<TextInput>
  loading?: boolean;
  onSearch: () => void;
  onClear: () => void;
}

export function Search({
  inputRef,
  loading,
  onSearch,
  onClear,
  ...rest
}: Props) {
  const { COLORS } = useTheme();

  return (
    <Container>
      <InputArea>
        <Input ref={inputRef} placeHolder="pesquisar..." {...rest} />

        <ButtonClear testID="button-clear" onPress={onClear}>
          <Feather name="x" size={16} />
        </ButtonClear>
      </InputArea>

      <Button testID="button-search" enabled={!loading} onPress={onSearch}>
        {loading ? (
          <ActivityIndicator size={16} color={COLORS.WHITE} />
        ) : (
          <Feather name="search" size={16} color={COLORS.WHITE} />
        )}
      </Button>
    </Container>
  )
}