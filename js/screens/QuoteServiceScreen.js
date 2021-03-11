import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { CheckboxGroup } from '../common/Form';
import { NavGroup } from '../common/BottomNav';

const navOption = [
    {
        title: "Back", to: "QuoteVehicle",
    },{
        title: "Next", to: "QuoteReview",
    }
];
const sampleServiceList = [
    {  
        id: "01",
        text: "Vehicle Inspection", 
    },{  
        id: "02",
        text: "Oil change", 
    },{  
        id: "03",
        text: "Brake repair", 
    },{  
        id: "04",
        text: "Battery replacement", 
    },{ 
        id: "05",
        text: "Battery Jump Service", }
];

/* <QuoteServiceScreen> */
export default function QuoteServiceScreen({ navigation }) {
    let navigate = navigation.navigate;
    return (
        <View style={styles.container}> 
            <View>
                <CheckboxGroup options={sampleServiceList} />
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