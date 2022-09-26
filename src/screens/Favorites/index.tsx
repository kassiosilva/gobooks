import { FlatList } from 'react-native';
import { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { ButtonBack } from '@components/ButtonBack';
import { BookCard, BookProps } from '@components/BookCard';

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

  async function fetchGroups() {
    try {
      const data = await favoritesGetAll();

      console.log(data);

      setFavorites(data);
    } catch(error) {
      console.log(error);
    }
  }

  function handleGoToDetails(item: BookProps) {
    navigation.navigate('bookDetails', { data: item });
  }

  useFocusEffect(useCallback(() => {
    fetchGroups();
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
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 24,
        }}
      />
    </Container>
  );
}

