import React, {useEffect} from 'react'
import {View,Text} from 'react-native'
import {AuthContext} from './components/context'


Logout = ({navigation}) => {
    
    const { signOut } = React.useContext(AuthContext)

      useEffect(() => {
        signOut()
        
    }, []);    
      return (
        <View>
          {alert("Logged Out")}
          <Text>Logged out</Text>
        </View>
      )
    }
    
   
export default Logout