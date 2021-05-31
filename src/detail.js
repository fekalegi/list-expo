import React from 'react'
import { View, Text, TouchableOpacity, Image, ToastAndroid } from 'react-native'

import { globalStyles } from './styles/global'
import Card from './shared/card'
import img_baseURL from './config/img_baseURL'
import { useState } from 'react/cjs/react.development'
import * as SecureStore from 'expo-secure-store'
import deleteFav from './query/deleteFav'
import addFav from './query/addFav'

Detail = ({route, navigation}) => {
  
  const [isFav, setIsFav] = useState(false)
  const [username, setUsername] = useState()

  const addtoFav = async () => {
    try {
      if(isFav == true){
        deleteFav(username,JSON.stringify(route.params.id))
        setIsFav(false)
        ToastAndroid.show(route.params.name || route.params.title + ' is Removed from Favorite!', ToastAndroid.SHORT)
      }else{
        addFav(username,JSON.stringify(route.params.id)).then(bootstrapAsync)
        setIsFav(true)
        ToastAndroid.show(route.params.name || route.params.title + ' is Added to Favorite!', ToastAndroid.SHORT)
      }
    } catch (error) {
        console.log(error);
    }
    
  }

  const bootstrapAsync = async () => {
    try {
      let result = await SecureStore.getItemAsync('username')
      if (result) {
        const user = result
        setUsername(result)
      } else {
        alert('No values stored under that key.')
      }
      let res = await SecureStore.getItemAsync('isfavorited')
      if(res){
        const isfav = res
        const arr = isfav.split(',')
        console.log(res)
        arr.forEach((e)=>{
          const a = e.replace(/[^a-zA-Z0-9]/g, "")
          if(route.params.id == a){
            setIsFav(true)
          }
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  React.useEffect(() => {
    bootstrapAsync()
  }, [])

  return (
    <View style={globalStyles.container}>
      <Card>
        <Image 
          source={{uri: img_baseURL+route.params.poster_path}}
          style={{
          width: 300,
          height: 200,
          }}
          resizeMode='cover'
        />
        <Text style={globalStyles.titleText}>{route.params.title !== "" && route.params.title || route.params.name !== "" && route.params.name}</Text>
        <Text style={globalStyles.overview}>{route.params.overview}</Text>
        <Text style={globalStyles.titleText}> Vote Average : {route.params.vote_average}</Text>
        <TouchableOpacity onPress={addtoFav}>
          {isFav 
          ? <Image style={{width: 50,height: 50}}source={require('../assets/heart_logo.png')} />
          : <Image style={{width: 50,height: 50}}source={require('../assets/empty_heart.png')} />}
        </TouchableOpacity>
      </Card>
    </View>
  );
}

export default Detail;