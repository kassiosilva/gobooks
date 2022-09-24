import { useState, useEffect } from 'react';
import { Alert, FlatList } from 'react-native';

import api from '@services/api';

import { Search } from '@components/Search';
import { BookCard, BookProps } from '@components/BookCard';

import {
  Container,
  Header,
  Greeting,
  GreetingText,
  MenuHeader,
  Title,
} from './styles';

export function Home() {
  const [books, setBooks] = useState<BookProps[]>([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const { data } = await api.get('/volumes?q=react&key=AIzaSyD-p6_ShBCgbXTAwrrfIJiolNLHVhrg0E8');
  
        const newData = data.items.map(book => {
          return {
            id: book.id,
            photo_url: book.volumeInfo.imageLinks.smallThumbnail,
            name: book.volumeInfo.title,
            description: book.volumeInfo.subtitle
          }
        }) as BookProps[];

        console.log(newData);
  
        setBooks(newData);
      } catch (error) {
        Alert.alert('Ops...', 'Não foi possível realizar a sua consulta');
      }
    }
 
    fetchBooks();
  }, [])

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingText>Olá, Kássio</GreetingText>
        </Greeting>
      </Header>

      <Search onSearch={() => {}} onClear={() => {}} />

      <MenuHeader>
        <Title>Livros</Title>
      </MenuHeader>

      <FlatList 
        data={books}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <BookCard data={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 24,
        }}
      />
    </Container>
  );
}