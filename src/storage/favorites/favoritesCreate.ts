import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppError } from '@utils/AppError'; 

import { BookProps } from '@components/BookCard';

import { FAVORITES_COLLECTION } from '@storage/storageConfig';
import { favoritesGetAll } from './favoritesGetAll';

export async function favoritesCreate(newFavoriteBook: BookProps) {
  try {
    const storedFavorites: BookProps[] = await favoritesGetAll();

    const favoriteAlreadyExists = storedFavorites.some(
      book => book.id === newFavoriteBook.id
    );

    if (favoriteAlreadyExists) {
      throw new AppError('Esse livro já está favoritado.');
    }

    const storage = JSON.stringify([...storedFavorites, newFavoriteBook]);

    await AsyncStorage.setItem(FAVORITES_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
}

