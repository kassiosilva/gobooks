import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import theme from '../../theme';

import { ButtonBack } from '.';

interface ProvidersProps {
  children?: React.ReactNode;
}

const Providers: React.FC = ({ children }: ProvidersProps) => (
  <ThemeProvider theme={theme}>
    { children }
  </ThemeProvider>
);

const mockedDispatch = jest.fn();

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");

  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn()
    }),
  };
});

describe('Button Back Component', () => {
  beforeEach(() => {
    mockedDispatch.mockClear();
  });

  it('renders correctly', () => {
    const { getByTestId } = render(
      <ButtonBack />,
      { wrapper: Providers}
    );

    const buttonBack = getByTestId('button-back');

    expect(buttonBack).toBeTruthy();
  })

  it('should execute a function when clicked', () => {
    const onPress = jest.fn();

    const { getByTestId } = render(
      <ButtonBack onPress={onPress} />,
      { wrapper: Providers}
    );

    const buttonBack = getByTestId('button-back');
    fireEvent.press(buttonBack);

    expect(onPress).toBeCalled();
  })
})
