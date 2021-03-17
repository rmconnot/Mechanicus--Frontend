import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavGroup } from '../common/BottomNav';
import { QuoteProgress } from '../common/Progress';

const navOption = [
    {
        title: "Back", to: "TaskList",
    },{
        title: "Next", to: "QuoteService",
    }
];

/* <QuoteVehicleScreen> */
export default function QuoteVehicleScreen({ navigation }) {
    return (
        <View style={styles.container}> 
            <View>
                <QuoteProgress curStep={1} status={[false,false,false]} />
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