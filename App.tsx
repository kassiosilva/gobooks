import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native';
import { ThemeProvider } from 'styled-components';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold 
} from '@expo-google-fonts/roboto';
import { StatusBar } from 'expo-status-bar';

import theme from './src/theme';

import { Home } from '@screens/Home';
import { BookDetails } from '@screens/BookDetails';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <ThemeProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="light" translucent backgroundColor="transparent" />

        {fontsLoaded ? <Home /> : <ActivityIndicator />}
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
