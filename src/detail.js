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

  return (
    <View style={globalStyles.container}>
            <Text style={globalStyles.titleText}>{route.params.title}</Text>
            <Text style={globalStyles.titleText}>{route.params.body}</Text>
            <Text style={globalStyles.titleText}>{route.params.rating}</Text>
    </View>
  );
}

export default Detail;