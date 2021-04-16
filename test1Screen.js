import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import BottomNav, { NavGroup } from './js/common/BottomNav';
import TopNav from './js/common/TopNav';




/* <ProfileScreen> */
export function test1Screen({navigation}) {
    const [input, setInput] = useState({
		status: "",
	});

    return (
        <View style={styles.container}> 
            <TopNav navigation={navigation} activated = "Appointments"/>
            <Text>test 1 screen</Text>
        </View>
        
    );
} 


const styles = StyleSheet.create({
	container: {
        flex: 1,
	},
	
});