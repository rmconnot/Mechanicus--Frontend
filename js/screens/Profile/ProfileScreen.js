import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import BottomNav from '../../common/BottomNav';



/* <ProfileScreen> */
export default function ProfileScreen({ navigation }) {
    return (
        <View style={styles.container}> 
            <View>
                <View>
                    <Text>info</Text>
                </View>
                <View>
                    <Text>Zipcode</Text>
                    <Text>Addresses</Text>
                </View>
            </View>

            <View>
                <View>
                    <Text>Settings</Text>
                </View>
                <View>
                    <Text>Notification</Text>
                    <Text>About us</Text>
                </View>
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