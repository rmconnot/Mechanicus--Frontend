import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput} from 'react-native';
import BottomNav, { NavGroup } from './js/common/BottomNav';
import TopNav from './js/common/TopNav';
import {CheckboxItem, ServiceCheckbox, CheckboxGroup} from './js/common/Form';
import {Picker} from '@react-native-community/picker'


/* <ProfileScreen> */
export function test1Screen({navigation}) {

	const [selectedValue, setSelectedValue] = useState("11:00-11:15am");
	const currentDate = new Date();
	const currentHour = currentDate.getHours();
	const currentDay = currentDate.getDay();
	
    return (
		<View style={styles.container}>
		<Picker
			mode="dropdown"
			selectedValue={selectedValue}
			style={{ height: 50, width: 300 }}
			onValueChange={(value, itemIndex) => setSelectedValue(value)}
		>
		  <Picker.Item label="11:00-12:00pm" value="11:00-12:00pm"/>
		  <Picker.Item label="12:00-1:00pm" value="12:00-1:00pm"/>
		  <Picker.Item label="1:00-2:00pm" value="1:00-2:00pm"/>
		  <Picker.Item label="2:00-3:00pm" value="2:00-3:00pm"/>
		  <Picker.Item label="3:00-4:00pm" value="3:00-4:00pm"/>
		  <Picker.Item label="4:00-5:00pm" value="4:00-5:00pm"/>
		  <Picker.Item label="5:00-6:00pm" value="5:00-6:00pm"/>
		  <Picker.Item label="6:00-6:30pm" value="6:00-6:30pm"/>
		</Picker>
		{console.log(selectedValue)}
	  </View>
        
    );
} 


const styles = StyleSheet.create({
	container: {
        flex: 1,
	},
	
});