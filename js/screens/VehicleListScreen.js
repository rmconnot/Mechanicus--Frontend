import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomNav from '../common/BottomNav';


/* <VehicleListScreen> */
export default function VehicleListScreen({ navigation }) {
    return (
        <View style={styles.container}> 
            <View>
                <Text>garage, vehicle list</Text>
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