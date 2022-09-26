import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppError } from '@utils/AppError'; 

import { BookProps } from '@components/BookCard';

import { FAVORITES_COLLECTION } from '@storage/storageConfig';
import { favoritesGetAll } from './favoritesGetAll';

export async function favoritesRemove(id: string) {
  try {
    const storedFavorites: BookProps[] = await favoritesGetAll();

    const favoritesWithoutDeletedOne = storedFavorites.filter(
      book => book.id !== id
    )

    const storage = 
      JSON.stringify([...favoritesWithoutDeletedOne]);

    await AsyncStorage.setItem(FAVORITES_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
}

