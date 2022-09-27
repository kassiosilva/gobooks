import { useState, useRef } from 'react';
import { Alert, FlatList, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TOKEN } from '@env';

import api from '@services/api';

import { Search } from '@components/Search';
import { BookCard, BookProps } from '@components/BookCard';
import { ListEmpty } from '@components/ListEmpty';

import {
  Container,
  Header,
  Greeting,
  GreetingText,
  MenuHeader,
  Title
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
  const [loading, setLoading] = useState(false);

  const searchInputRef = useRef<TextInput>(null);

  async function fetchBooks({ value, page = 0 }: FetchBooksProps) {
    try {
      if(value.trim().length === 0) {
        return Alert.alert('Ops..', 'Informe o nome do livro');
      }

      setLoading(true);

      const { data } = await api.get(`/volumes?q=${value}&key=${TOKEN}&startIndex=${page}&maxResults=10`);

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
          authors: book?.volumeInfo?.authors,
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
    } finally {
      setLoading(false);
    }
  }

  function handleSearch() {
    setBooks([]);
    fetchBooks({ value: search });
    searchInputRef.current?.blur();
  }

  function handleLoadMore() {
    fetchBooks({ value: search, page: newPage });
  }

  function handleClear() {
    setSearch('');
  }

  function handleGoToDetails(item: BookProps) {
    navigation.navigate('bookDetails', { data: item });
  }

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingText>Olá, leitor</GreetingText>
        </Greeting>
      </Header>

      <Search
        loading={loading}
        inputRef={searchInputRef}
        onChangeText={setSearch}
        value={search}
        onSearch={handleSearch}
        onClear={handleClear}
        autoCorrect={false}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
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
        contentContainerStyle={
          [
            books.length === 0 && { flex: 1 },
            {
              paddingTop: 20,
              paddingBottom: 125,
              marginHorizontal: 24,
            }
          ]
        }
        ListEmptyComponent={() => (
          <ListEmpty message="Que tal pesquisar um livro?" />
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
    </Container>
  );
}
