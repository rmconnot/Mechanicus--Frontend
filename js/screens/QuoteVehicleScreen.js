import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavGroup } from '../common/BottomNav';

const navOption = [
    {
        title: "Back", to: "QuoteVehicle",
    },{
        title: "Next", to: "QuoteService",
    }
];

/* <QuoteVehicleScreen> */
export default function QuoteVehicleScreen({ navigation }) {
    return (
        <View style={styles.container}> 
            <View>
                <Text>quote: select vehicle</Text>
            </View>
            <NavGroup navigation={navigation} options={navOption}/>
        </View>
    );
} 

const styles = StyleSheet.create({
	container: {
        flex: 1,
		justifyContent: "space-between",
	},
	
});