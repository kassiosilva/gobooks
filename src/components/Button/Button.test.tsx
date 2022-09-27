import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import theme from '../../theme';

import { Button } from '.';

interface ProvidersProps {
  children?: React.ReactNode;
}

const Providers: React.FC = ({ children }: ProvidersProps) => (
  <ThemeProvider theme={theme}>
    { children }
  </ThemeProvider>
);

const buttonTitle = 'Teste';
const onPress = jest.fn();
const typeButton = 'remove';

describe('Button Component', () => {
  it('renders correctly', () => {
    const { getByTestId, getByText } = render(
      <Button
        testID="button"
        title={buttonTitle}
        onPress={onPress}
      />,
      { wrapper: Providers}
    );

    const buttonComponent = getByTestId('button');
    fireEvent.press(buttonComponent);

    expect(getByText(buttonTitle)).toBeTruthy();
    expect(onPress).toBeCalled();
  });

  it('must have a specific background when type is remove', () => {
    const { getByTestId, getByText } = render(
      <Button
        testID="button"
        title={buttonTitle}
        type={typeButton}
        onPress={onPress}
      />,
      { wrapper: Providers}
    );

    const buttonComponent = getByTestId('button');
    fireEvent.press(buttonComponent);


    expect(getByText(buttonTitle)).toBeTruthy();

    expect(buttonComponent.props.style.backgroundColor)
      .toEqual(theme.COLORS.PRIMARY_800)

    expect(onPress).toBeCalled();
  });
})
