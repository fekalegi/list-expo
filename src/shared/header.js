import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Header() {
    return (
        <View style={styles.header}>
            <Icon
                    onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                    style={[{ color: 'white', marginLeft: 8 }]}
                    size={24}
                    name={'menu'}
                />
            <View>
                <Text style={styles.headerText}></Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333',
        letterSpacing: 1,
    }
})