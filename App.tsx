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

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" translucent backgroundColor="transparent" />

      {fontsLoaded ? <Home /> : <ActivityIndicator />}
    </ThemeProvider>
  );
}
