import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
  useNavigationState
} from '@react-navigation/native';

import { globalStyles } from './styles/global';

Detail = ({route, navigation}) => {

  // const index = useNavigationState(state => console.log(state));



  /*useFocusEffect(
    React.useCallback(() => {
      fetch('https://restcountries.eu/rest/v2/capital/tallinn')
        .then(response => {
          response.json().then((data) => {
            // console.log(data);
          })
        })
      return () => console.log("lost focus")
    }
    )
  )*/

  return (
    <View style={globalStyles.container}>
            <Text>{route.params.title}</Text>
            <Text>{route.params.body}</Text>
            <Text>{route.params.rating}</Text>
    </View>
  );
}

export default Detail;