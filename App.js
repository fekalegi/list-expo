import React, { useState } from 'react';
import Feed from './src/feed';
import Detail from './src/detail';

import Contacts from './src/screens/drawer/Contacts';
import Favorites from './src/screens/drawer/Favorites';
import Settings from './src/screens/drawer/Settings';
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

import {
  NavigationContainer,
  DarkTheme,
  DrawerActions
} from '@react-navigation/native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useColorScheme, AppearanceProvider } from 'react-native-appearance';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const getFonts = () => Font.loadAsync({
  'nunitosans-regular' : require('./assets/fonts/NunitoSans-Regular.ttf'),
  'nunitosans-bold' : require('./assets/fonts/NunitoSans-Bold.ttf')
})


App = () => {

  const [fontsLoaded, setFontsLoaded] = useState(false)

  const colorScheme = useColorScheme();

  const MyTheme = {
    dark: false,
    colors: {
      primary: 'white',
      background: 'white',
      card: '#65509f',
      text: 'white',
      border: 'green',
    },
  }

  const linking = {
    prefixes: ['games://'],
    Feed: {
      screen: Feed,
    },
    Detail: {
      screen: Detail,
    }
  }

  createHomeStack = (props) =>
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        children={this.createDrawer}
        options={({ navigation }) => ({
          title: "List Expo",
          headerLeft: () =>
            <Icon
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              style={[{ color: 'white', marginLeft: 8 }]}
              size={24}
              name={'menu'}
            />
        })
        }
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          title: "Detail Screen"
        }}
      />
    </Stack.Navigator>

  createDrawer = (props) =>
    <Drawer.Navigator>
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Contacts" component={Contacts} />
      <Drawer.Screen name="Favorites" component={Favorites} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>

if(fontsLoaded){
  

  return (
    <AppearanceProvider>
      <NavigationContainer theme={colorScheme == 'dark' ? DarkTheme : MyTheme}
        linking={linking}
      >
        {this.createHomeStack()}
      </NavigationContainer>
    </AppearanceProvider>
  );
} else {
    return(
      <AppLoading 
        startAsync={getFonts}
        onFinish={()=>setFontsLoaded(true)}
        onError={()=>console.log("Error")}
      />
    )
}
}

export default App;