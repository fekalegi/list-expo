import React, {useState} from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import {globalStyles} from './styles/global'
import Card from './shared/card'
import API_KEY from './config/api_key'


Feed = ({navigation}) => {

  const [movies, setMovies] = useState([
    {genre: 'Trending', fetch: `/trending/all/week?${API_KEY}&language=en-US`, key:'1', isTrend:true},
    {genre: 'Netflix Originals', fetch: `/discover/tv?${API_KEY}&with_network=213`, key:'2', isTrend:false},
    {genre: 'Top Rated', fetch: `/tv/top_rated?${API_KEY}&language=en-US`, key:'3', isTrend:true},
    {genre: 'Action Movies', fetch: `/discover/tv?${API_KEY}&with_genre=28`, key:'4', isTrend:false},
    {genre: 'Comedy Movies', fetch: `/discover/tv?${API_KEY}&with_genres=35`, key:'5', isTrend:false},
    {genre: 'Animation Movies', fetch: `/discover/tv?${API_KEY}&with_genres=16`, key:'6', isTrend:false},
    {genre: 'Romance Movies', fetch: `/discover/tv?${API_KEY}&with_genres=10749`, key:'7', isTrend:false},
    {genre: 'Documentaries', fetch: `/discover/tv?${API_KEY}&with_genres=99`, key:'8', isTrend:false},
  ]);


  return (
    <View style={globalStyles.container}>
      <FlatList 
         data={movies}
         renderItem={({item})=>(
             <TouchableOpacity onPress={()=> navigation.navigate('ByGenre', item)}>
                <Card>
                  <Text style={globalStyles.titleText}> {item.genre} </Text>
                </Card>
             </TouchableOpacity>
         )} 
         />
    </View>
  );
}

export default Feed;