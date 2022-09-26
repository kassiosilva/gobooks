import { useTheme } from "styled-components/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from "@expo/vector-icons";

import { Home } from "@screens/Home";
import { Favorites } from "@screens/Favorites";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
  const { COLORS } = useTheme();

  return (
    <Navigator screenOptions={{
      tabBarActiveTintColor: COLORS.PRIMARY_800,
      tabBarInactiveTintColor: COLORS.SECONDARY_900,
      tabBarHideOnKeyboard: true,
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        height: 80,
        backgroundColor: COLORS.WHITE,
      }
    }}>
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          )
        }}
      />

      <Screen
        name="favorites"
        component={Favorites}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="staro" size={24} color={color} />
          )
        }}
      />
    </Navigator>
  );
}
