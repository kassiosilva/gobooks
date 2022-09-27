import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import theme from '../../theme';

import { BookCard } from '.';

interface ProvidersProps {
  children?: React.ReactNode;
}

const Providers: React.FC = ({ children }: ProvidersProps) => (
  <ThemeProvider theme={theme}>
    { children }
  </ThemeProvider>
);

const bookData = {
  id: '123',
  photo_url: 'http://books.google.com/books/content?id=NZCKCgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
  name: 'Teste',
  subtitle: 'teste',
  description: 'teste',
  price: 100,
  authors: ['João'],
  publisher: 'Editora',
  publishedDate: new Date('22-10-2021'),
  moreInfos: 'teste',
}

const onPress = jest.fn();

describe('BookCard Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <BookCard
        testID="book-card"
        data={bookData}
        onPress={onPress}
      />,
      { wrapper: Providers}
    );

    expect(getByText(bookData.name)).toBeTruthy();
    expect(getByText(bookData.subtitle)).toBeTruthy();
  });
})
