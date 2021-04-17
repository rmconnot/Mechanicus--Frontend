import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import BottomNav, { NavGroup } from './js/common/BottomNav';
import TopNav from './js/common/TopNav';
import {CheckboxItem, ServiceCheckbox, CheckboxGroup} from './js/common/Form';


const sampleServiceList = [
	{
		id: "01",
		type: "Vehicle Inspection",
		price: 120,
	},
	{
		id: "02",
		type: "Oil change",
		price: 100,
        options: [
			{
				id: "02-1",
				type: "synthetic oil",
				price: 65,
			},
			{
				id: "02-2",
				type: "synthetic blends",
				price: 70,
			},
			{
				id: "02-3",
				type: "high mileage oil",
				price: 100,
			},
			{
				id: "02-4",
				type: "conventional oil",
				price: 120,
			},
			
		]
	},
	{
		id: "03",
		type: "Brake repair",
		price: 90,
	},
	{
		id: "04",
		type: "Battery replacement",
		price: 70,
	},
	{
		id: "05",
		type: "Battery Jump Service",
		price: 20,
	},
];

/* <ProfileScreen> */
export function test1Screen({navigation}) {

    const [servicesListProp, setServicesListProp] = useState();

    const handleCheckedServices = (servicesList) => {
		console.log("servicesList: ", servicesList);
		setServicesListProp(servicesList);
	};

    return (
        <View style={styles.container}> 
            <TopNav navigation={navigation} activated = "Appointments"/>
            <CheckboxGroup
					handleCheckedServices={handleCheckedServices}
				/>
        </View>
        
    );
} 


const styles = StyleSheet.create({
	container: {
        flex: 1,
	},
	
});