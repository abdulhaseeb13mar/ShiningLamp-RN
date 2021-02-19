import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './OurResuables/RefNavigation';
import OurHome from './Main/OurHome';
import OurSingleProduct from './Main/OurSingleProduct';
import PersonalInfoShiningLamp from './Main/PersonalInfoShiningLamp';
import SearchShiningLamp from './Main/SearchShiningLamp';
import OurFavourites from './Main/OurFavourites';
const Stack = createStackNavigator();

function Routes(props) {
  return (
    <NavigationContainer
      ref={(ref) => {
        Navigator.InitializeRefNavigation(ref);
      }}>
      <Stack.Navigator
        initialRouteName="OurHome"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="OurHome" component={OurHome} />
        <Stack.Screen name="OurSingleProduct" component={OurSingleProduct} />
        <Stack.Screen
          name="PersonalInfoShiningLamp"
          component={PersonalInfoShiningLamp}
        />
        <Stack.Screen name="SearchShiningLamp" component={SearchShiningLamp} />
        <Stack.Screen name="OurFavourites" component={OurFavourites} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
