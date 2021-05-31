import React, {useState,useEffect} from 'react'
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import axios from 'axios'

import { globalStyles } from './styles/global'
import Card from './shared/card'
import img_baseURL from './config/img_baseURL'



const TMDB = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});


ByGenre = ({route, navigation}) => {

    const [movies, setMovies] = useState({
        byGen: []
      });
    
      useEffect(() => {
        const byGen = TMDB.get(route.params.fetch)
        
        Promise.all([
          byGen,
        ]).then((results) => {
          const moviesEntry = Object.entries(movies).map(([key, values], index, isTrend) => [
            key,
            results[index].data.results,
          ])
          const newMovies = {}
          moviesEntry.forEach((entry) => {
            newMovies[entry[0]] = entry[1]
          })
          setMovies(newMovies)
        })
      },[])

    return (
        <View style={globalStyles.container}>
            <FlatList
                data={movies.byGen}
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
            />
        </View>
     );
}

export default ByGenre;