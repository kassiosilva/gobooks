import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { BookDetails } from "@screens/BookDetails";
import { AppTabRoutes } from "./app.tab.routes";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppStackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="appTab" component={AppTabRoutes} />
      <Screen name="bookDetails" component={BookDetails} />
    </Navigator>
  )
}
