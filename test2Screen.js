import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import BottomNav from './js/common/BottomNav';
import TopNav from './js/common/TopNav';




/* <ProfileScreen> */
export function test2Screen({navigation}) {

    return (
        <View style={styles.container}> 

            <TopNav navigation={navigation} activated = "Quotes"/>
            
        </View>
        
    );
} 


const styles = StyleSheet.create({
	container: {
        flex: 1,
	},
	
});