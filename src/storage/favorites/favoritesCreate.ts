import AsyncStorage from '@react-native-async-storage/async-storage';

import { BookProps } from '@components/BookCard';

import { FAVORITES_COLLECTION } from '@storage/storageConfig';
import { favoritesGetAll } from './favoritesGetAll';

export async function favoritesCreate(newFavoriteBook: BookProps) {
  try {
    const storedFavorites = await favoritesGetAll();

    const storage = JSON.stringify([...storedFavorites, newFavoriteBook]);

    await AsyncStorage.setItem(FAVORITES_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
}

