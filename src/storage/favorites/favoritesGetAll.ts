import AsyncStorage from '@react-native-async-storage/async-storage';

import { BookProps } from '@components/BookCard';

import { FAVORITES_COLLECTION } from '@storage/storageConfig';

export async function favoritesGetAll() {
  try {
    const storage = await AsyncStorage.getItem(FAVORITES_COLLECTION);
  
    const favorites: BookProps[] = storage ? JSON.parse(storage) : [];
    
    return favorites;
  } catch (error) {
    throw error;
  }
}
