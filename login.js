import React, {useState,useEffect} from 'react'
import { StyleSheet, View, TextInput, Text, Button } from 'react-native'
import db from './src/config/db'
import createTable from './components/createTable'
import {AuthContext} from './components/context'


Login = ({navigation}) => {
  
  const [user, onChangeUser] = useState()
  const [pass, onChangePass] = useState()
  
  const { signIn } = React.useContext(AuthContext)

  useEffect(() => {
    createTable()
  }, []);


  const getData = () => {
    try {
        db.transaction((tx) => {
          tx.executeSql("select * from Users WHERE username =? AND password =?", [user,pass], (_, { rows }) =>
          {const len = rows.length
            if(len == 0){
              console.log("error")
            }else{
              signIn(rows)
            }
          }
        )
        })
    } catch (error) {
        console.log(error);
    }
  }
    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page </Text>
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
        onPress={getData}
        title="Login"
        color="#65509f"
      />
      </View>
      <View style={styles.Button}>
      <Button
        onPress={() => {navigation.navigate('Register')}}
        title="Register"
        color="#65509f"
      />
      </View>
    </View>
  )
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
  
export default Login