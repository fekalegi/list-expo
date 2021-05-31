import React, {useState,useEffect} from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import API_KEY from '../../config/api_key'
import axios from 'axios'

import { globalStyles } from '../../styles/global';
import Card from '../../shared/card';
import img_baseURL from '../../config/img_baseURL'
import * as SecureStore from 'expo-secure-store'



const TMDB = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});


Favorites = ({route, navigation}) => {

    const [movies, setMovies] = useState([])
    const [refresh, setRefresh] = useState(false)
    const bootstrapAsync = async () => {
      try {
        let responses = []
        let data = []
        let res = await SecureStore.getItemAsync('isfavorited')
        if(res){
          const isfav = res
          const arr = isfav.split(',')
          console.log(res)
          arr.forEach(async (e)=>{
            const a = e.replace(/[^a-zA-Z0-9]/g, "")
            if(a!==''){
              responses.push(TMDB.get(`/tv/${a}?${API_KEY}&language=en-US`).then(
                (e) => {
                  data.push(e.data)
                  setMovies(data)
                }
              ))
            }
          })
        }
      } catch (e) {
        console.log(e)
      }
    }

    useEffect(() => {
      bootstrapAsync()
    },[]
    )

    return (
        <View style={globalStyles.container}>
            <FlatList
                data={movies}
                renderItem={({item})=>(
                    <TouchableOpacity onPress={()=> navigation.navigate('Detail', item)}>
                        <Card>
                        <Image source={{uri: img_baseURL+item.poster_path}}
                            style={globalStyles.posterimg}
                            resizeMode='cover'
                        />
                        <Text style={globalStyles.titleText}>{item.title !== "" && item.title || item.name !== "" && item.name}</Text>
                        </Card>
                    </TouchableOpacity>
                )}
                refreshing={refresh}
                onRefresh={bootstrapAsync} 
            />
        </View>
     );
}

export default Favorites;