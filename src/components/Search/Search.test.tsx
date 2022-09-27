import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import theme from '../../theme';

import { Search } from '.';

interface ProvidersProps {
  children?: React.ReactNode;
}

const Providers: React.FC = ({ children }: ProvidersProps) => (
  <ThemeProvider theme={theme}>
    { children }
  </ThemeProvider>
);

const onPress = jest.fn();

describe('Button Component', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(
      <Search
        testID="search"
        onSearch={onPress}
        onClear={onPress}
      />,
      { wrapper: Providers}
    );

    const searchComponent = getByTestId('search');

    expect(searchComponent).toBeTruthy();
  });

  it('should perform function when submitting', () => {
    const { getByTestId } = render(
      <Search
        onSearch={onPress}
        onClear={onPress}
      />,
      { wrapper: Providers}
    );

    const searchButtonSubmit = getByTestId('button-search');
    fireEvent.press(searchButtonSubmit);

    expect(onPress).toBeCalled();
  });

  it('should run the function clear the input', () => {
    const { getByTestId } = render(
      <Search
        onSearch={onPress}
        onClear={onPress}
      />,
      { wrapper: Providers}
    );

    const searchButtonSubmit = getByTestId('button-clear');
    fireEvent.press(searchButtonSubmit);

    expect(onPress).toBeCalled();
  });
})
