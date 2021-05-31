import React, {useState,useEffect} from 'react'
import { ToastAndroid, StyleSheet, View, TextInput, Text, Button } from 'react-native'
import * as SQLITE from 'expo-sqlite'
import createTable from './components/createTable'


Register = ({navigation}) => {
  
      const [user, onChangeUser] = useState()
      const [pass, onChangePass] = useState()

      useEffect(() => {
        createTable()
    }, []);
    
    const db = SQLITE.openDatabase("db.db")
    

    const setData = async () => {
      if (user.length == 0 || pass.length == 0) {
          Alert.alert('Warning!', 'Please write your data.')
      } else {
          try {
              db.transaction(async (tx) => {
                  tx.executeSql(
                      "INSERT INTO Users (username, password) VALUES (?,?)",[user,pass]
                  ) 
              })
              ToastAndroid.show('Request sent successfully!', ToastAndroid.SHORT)
              navigation.navigate('Login');
          } catch (error) {
              console.log(error);
          }
      }
    }
    

    handlePress = () => {
      getData()
      console.log(user, pass)}
    
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Register Page </Text>
          <View style={styles.garis} />
          <View style={styles.wrapperInput}>
            <TextInput 
            style={styles.textInput}
            onChangeText={onChangeUser}
            value={user} 
            placeholder="Username" />
          </View>
          <View style={styles.wrapperInput}>
            <TextInput
            style={styles.textInput}
            onChangeText={onChangePass}
            value={pass}
            secureTextEntry={true}
            placeholder="Password" />
          </View>
          <View style={styles.Button}>
          <Button
            onPress={setData}
            title="Register"
            color="#65509f"
          />
          </View>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 30,
        padding: 30,
      },
      garis:{
        borderBottomWidth: 1,
        marginTop: 10,
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold'    
      },
      textInput: {
        borderRadius: 6,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: {width: 1, height: 1},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        paddingLeft: 10,
        height: 40
      },
      wrapperInput: {
        textAlign: 'center',
        justifyContent: 'center',
        padding: 10,
        marginTop: 20,
      },
      Button: {
        marginTop: 20,
      },
    });
  
export default Register