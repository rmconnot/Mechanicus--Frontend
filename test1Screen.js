import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput} from 'react-native';
import BottomNav, { NavGroup } from './js/common/BottomNav';
import TopNav from './js/common/TopNav';
import {CheckboxItem, ServiceCheckbox, CheckboxGroup} from './js/common/Form';
import {Picker} from '@react-native-community/picker';
import Moment from "moment";


/* <ProfileScreen> */
export function test1Screen({navigation}) {

	const [selectedValue, setSelectedValue] = useState("11:00-11:15am");
	const currentDate = new Date();
	const currentHour = currentDate.getHours();

	const inputDate = Moment(currentDate)
			.format("DD-MMM-YYYY h:mm A")
			.toString()
	
	const currentDay = Moment(currentDate)
	.format("DD-MMM-YYYY")
	.toString()


    return (
		<View style={styles.container}>
		<Picker
			mode="dropdown"
			selectedValue={selectedValue}
			style={{ height: 50, width: 300 }}
			onValueChange={(value, itemIndex) => setSelectedValue(value)}
		>
		  <Picker.Item label={inputDate.slice(0,11)!=currentDay?"11:00-12:00pm":currentHour<11?"11:00-12:00pm":"not available"} value="11:00-12:00pm"/>
		  <Picker.Item label={inputDate.slice(0,11)!=currentDay?"12:00-1:00pm":currentHour<12?"12:00-1:00pm":"not available"} value="12:00-1:00pm"/>
		  <Picker.Item label={inputDate.slice(0,11)!=currentDay?"1:00-2:00pm":currentHour<13?"1:00-2:00pm":"not available"} value="1:00-2:00pm"/>
		  <Picker.Item label={inputDate.slice(0,11)!=currentDay?"2:00-3:00pm":currentHour<14?"2:00-3:00pm":"not available"} value="2:00-3:00pm"/>
		  <Picker.Item label={inputDate.slice(0,11)!=currentDay?"3:00-4:00pm":currentHour<15?"3:00-4:00pm":"not available"} value="3:00-4:00pm"/>
		  <Picker.Item label={inputDate.slice(0,11)!=currentDay?"4:00-5:00pm":currentHour<16?"4:00-5:00pm":"not available"} value="4:00-5:00pm"/>
		  <Picker.Item label={inputDate.slice(0,11)!=currentDay?"5:00-6:00pm":currentHour<17?"5:00-6:00pm":"not available"} value="5:00-6:00pm"/>
		  <Picker.Item label={inputDate.slice(0,11)!=currentDay?"6:00-6:30pm":currentHour<18?"6:00-6:30pm":"not available"} value="6:00-6:30pm"/>
		</Picker>
	  </View>

        
    );
} 


const styles = StyleSheet.create({
	container: {
        flex: 1,
	},
	optionActive: {
		width:'100%'
	},
	optionInactive: {
		opacity: 0,
		width: "0%"
	},
	
});