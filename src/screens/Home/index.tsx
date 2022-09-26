import { useState, useEffect } from 'react';
import { Alert, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

interface FetchBooksProps {
  value: string;
  page?: number;
}

export function Home() {
  const navigation = useNavigation();

  const [books, setBooks] = useState<BookProps[]>([]);
  const [search, setSearch] = useState('');

  async function fetchBooks({ value, page = 0}: FetchBooksProps) {
    try {
      const { data } = await api.get(`/volumes?q=${value}&key=AIzaSyD-p6_ShBCgbXTAwrrfIJiolNLHVhrg0E8&startIndex=${page}&maxResults=40`);

      const newData = data.items.map(book => {
        const thumbnail = book?.volumeInfo?.imageLinks?.smallThumbnail;
        const price = book?.saleInfo?.listPrice?.amount;

        return {
          id: book?.id,
          photo_url: thumbnail,
          name: book?.volumeInfo?.title,
          subtitle: book?.volumeInfo?.subtitle,
          description: book?.volumeInfo?.description,
          price,
          author: book?.volumeInfo?.authors[0],
          publisher: book?.volumeInfo?.publisher,
          publishedDate: book?.volumeInfo?.publishedDate,
          moreInfos: book?.volumeInfo?.previewLink,
        }
      }) as BookProps[];

      setBooks(oldBooks => [...oldBooks, ...newData]);
    } catch (error) {
      console.log(error);
      Alert.alert('Ops...', 'Não foi possível realizar a sua consulta');
    }
  }

  function loadMore() {
    let page = 0;

    if (books.length) {
      page = books.length;
    }

    console.log(page);

    fetchBooks({ value: search, page });
  }

  function handleSearch() {
    setBooks([]);
    fetchBooks({ value: search });
  }

  function handleClear() {
    setSearch('');
  }

  function handleGoToDetails(item: BookProps) {
    console.log('ITEM', item);
    navigation.navigate('bookDetails', { data: item });
  }

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingText>Olá, Kássio</GreetingText>
        </Greeting>
      </Header>

      <Search
        onChangeText={setSearch}
        value={search}
        onSearch={handleSearch}
        onClear={handleClear}
      />

      <MenuHeader>
        <Title>Livros</Title>
      </MenuHeader>

      <FlatList 
        data={books}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <BookCard
            data={item}
            onPress={() => handleGoToDetails(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 24,
        }}
        // onEndReached={loadMore}
        // onEndReachedThreshold={0.1}
      />
    </Container>
  );
}
