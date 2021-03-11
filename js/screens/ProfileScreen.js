import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import BottomNav from '../common/BottomNav';



/* <ProfileScreen> */
export default function ProfileScreen({ navigation }) {
    return (
        <View style={styles.container}> 
            <View>
                <Text>user's account info</Text>
            </View>
            <BottomNav navigation={ navigation }/>
        </View>
    );
} 

const styles = StyleSheet.create({
	container: {
        flex: 1,
		justifyContent: "space-between",
	},
	
});