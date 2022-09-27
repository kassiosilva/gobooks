import { FlatList } from 'react-native';
import { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { ButtonBack } from '@components/ButtonBack';
import { BookCard, BookProps } from '@components/BookCard';
import { ListEmpty } from '@components/ListEmpty';

import { favoritesGetAll } from '@storage/favorites/favoritesGetAll';

import {
  Container,
  Header,
  HeaderContent,
  Title,
} from './styles';

export function Favorites() {
  const navigation = useNavigation();

  const [favorites, setFavorites] = useState<BookProps[]>([]);

  async function fetchFavoritesBooks() {
    try {
      const data = await favoritesGetAll();

      setFavorites(data);
    } catch(error) {
      console.log(error);
    }
  }

  function handleGoToDetails(item: BookProps) {
    navigation.navigate('bookDetails', { data: item });
  }

  useFocusEffect(useCallback(() => {
    fetchFavoritesBooks();
  }, []));

  return (
    <Container>
      <Header>
        <HeaderContent>
          <ButtonBack />

          <Title>Favoritos</Title>
        </HeaderContent>
      </Header>

      <FlatList 
        data={favorites}
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
            favorites.length === 0 && { flex: 1 },
            {
              paddingTop: 20,
              paddingBottom: 125,
              marginHorizontal: 24,
            }
          ]
        }
        ListEmptyComponent={() => (
          <ListEmpty message="Adicione aqui os seus livros favoritos" />
        )}
      />
    </Container>
  );
}

