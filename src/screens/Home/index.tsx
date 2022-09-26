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
  const [newPage, setNewPage] = useState(10);

  async function fetchBooks({ value, page = 0 }: FetchBooksProps) {
    try {
      if(value.trim().length === 0) {
        return Alert.alert('Ops..', 'Informe o nome do livro');
      }

      const { data } = await api.get(`/volumes?q=${value}&key=AIzaSyD-p6_ShBCgbXTAwrrfIJiolNLHVhrg0E8&startIndex=${page}&maxResults=10`);

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
      setNewPage(oldPage => oldPage + 10);
    } catch (error) {
      console.log(error);
      Alert.alert('Ops...', 'Não foi possível realizar a sua consulta');
    }
  }

  function handleSearch() {
    setBooks([]);
    // setPage(0);
    fetchBooks({ value: search });
  }

  function handleLoadMore() {
    console.log(newPage);
    fetchBooks({ value: search, page: newPage });
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
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
    </Container>
  );
}
