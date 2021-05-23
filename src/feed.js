import React, {useState} from 'react';
import { View, Text, Button, Platform, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {globalStyles} from './styles/global'
import { styles } from './styles/styles';

Feed = ({navigation}) => {


  const[reviews,setReviews] = useState([
    { title: 'Skyrim V : The Elder Scrolls', rating: 5, body: 'lorem ipsum', key: '1'},
    { title: 'Final Fantasy XIV', rating: 6, body: 'lorem ipsum', key: '2'},
    { title: 'Monster Hunter: Rise', rating: 7, body: 'lorem ipsum', key: '3'},
])


  return (
    <View style={globalStyles.container}>
            <FlatList 
                data={reviews}
                renderItem={({item})=>(
                    <TouchableOpacity onPress={()=> navigation.navigate('Detail', item)}>
                        <Text style={globalStyles.titleText}>{item.title} </Text>
                    </TouchableOpacity>
                )} />
      {
        Platform.select({
          ios:
            <Button
              title='Go to Feed Item'
              onPress={() => navigation.navigate('Detail', { foodName: "Detail Screen" })}
            />,
          android:
            <TouchableOpacity
              onPress={() => navigation.navigate('Detail', { foodName: "Detail Screen" })}>
              <Text style={styles.androidButtonText}>Go to FeedItem</Text>
            </TouchableOpacity>
        })
      }

    </View>
  );
}

export default Feed;