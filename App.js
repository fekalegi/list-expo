import React, { useState } from 'react'
import Home from './src/home'
import Detail from './src/detail'

import Favorites from './src/screens/drawer/Favorites'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import * as SecureStore from 'expo-secure-store'
import {LogBox} from 'react-native'

import {
  NavigationContainer,
  DarkTheme,
  DrawerActions
} from '@react-navigation/native'

import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useColorScheme, AppearanceProvider } from 'react-native-appearance'
import ByGenre from './src/bygenre'
import Login from './login'
import MyTheme from './src/styles/myTheme'
import Register from './register'
import {AuthContext} from './components/context'
import secureStore from './src/config/secureStore'
import Logout from './logout'

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

const getFonts = () => Font.loadAsync({
  'nunitosans-regular' : require('./assets/fonts/NunitoSans-Regular.ttf'),
  'nunitosans-bold' : require('./assets/fonts/NunitoSans-Bold.ttf')
})


App = () => {

  const [fontsLoaded, setFontsLoaded] = useState(false)
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.id,
            username: action.token,
          }
        case 'SIGN_IN':
          return {
            ...prevState,
            username: action.id,
            userToken: action.token,
          }
        case 'SIGN_OUT':
          return {
            ...prevState,
            username: null,
            userToken: null,
          }
      }
    },
    {
      userToken: null,
      username: null,
      isFavorited: [],
    }
  )

  

  React.useEffect(() => {
    LogBox.ignoreAllLogs()
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await SecureStore.getItemAsync('userToken')
      } catch (e) {
        console.log(e)
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken })
    }

    bootstrapAsync()
  }, [])

  const authContext = React.useMemo(
    () => ({
      signIn: async (datas) => {
        let user = []
        let isfavor = []
        datas._array.map((res) => 
          user.push(res.username))
        datas._array.map((res) => 
          isfavor.push(res.isFavorited)) 
        const userToken = (Math.random() + 1).toString(36).substring(7)
        const username = user[0]
        const isfavorited = JSON.stringify(isfavor)
        try {
          secureStore('username', username)
          secureStore('userToken', userToken)
          secureStore('isfavorited', isfavorited)
          console.log(datas)
        } catch(e) {
          console.log("failed")
        }
        dispatch({type:'SIGN_IN',id: username, token: userToken, isFavorited: isfavorited})
      },
      signOut: () => {
        SecureStore.deleteItemAsync('userToken')
        SecureStore.deleteItemAsync('username')
        SecureStore.deleteItemAsync('isfavorited')
        dispatch({ type: 'SIGN_OUT' })},
      restoreToken: () => {
        dispatch({type: 'RESTORE_TOKEN'})}
    }),
    []
  )

  const colorScheme = useColorScheme();

  const linking = {
    Home: {
      screen: Home,
    },
    Detail: {
      screen: Detail,
    },
    ByGenre: {
      screen: ByGenre,
    },
    Login: {
      screen: Login,
    },
    Register: {
      screen: Register
    }
  }
  
  createRootStack = (props) =>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            animationEnabled: false,
          }}
        />
        <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: "Register"
        }}
      />
  </Stack.Navigator>

  createHomeStack = (props) =>
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        children={this.createDrawer}
        options={({ navigation }) => ({
          title: "Home",
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
          title: "Detail",
        }}
      />
      <Stack.Screen
        name="ByGenre"
        component={ByGenre}
        options={({ route }) => ({ title: route.params.genre })}
      />
    </Stack.Navigator>

  createDrawer = (props) =>
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Favorites" component={Favorites} options={{title: "Favorites"}} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>

if(fontsLoaded){
  return (
    <AuthContext.Provider value={authContext}>
      <AppearanceProvider>
        <NavigationContainer theme={colorScheme == 'dark' ? DarkTheme : MyTheme}
          linking={linking}
        >
          { state.userToken != null ? 
            this.createHomeStack() : 
            this.createRootStack()
          }
        </NavigationContainer>
      </AppearanceProvider>
    </AuthContext.Provider>
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