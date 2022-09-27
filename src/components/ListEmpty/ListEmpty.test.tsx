import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import theme from '../../theme';

import { ListEmpty } from '.';

interface ProvidersProps {
  children?: React.ReactNode;
}

const Providers: React.FC = ({ children }: ProvidersProps) => (
  <ThemeProvider theme={theme}>
    { children }
  </ThemeProvider>
);

const message = "Teste";

describe('ListEmpty Component', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(
      <ListEmpty
        message={message}
      />,
      { wrapper: Providers}
    );

    const listEmptyComponent = getByTestId("list-empty");

    expect(listEmptyComponent).toBeTruthy();
  });

  it('should show message', () => {
    const { getByText } = render(
      <ListEmpty
        message={message}
      />,
      { wrapper: Providers}
    );

    expect(getByText(message)).toBeTruthy();
  });
})
