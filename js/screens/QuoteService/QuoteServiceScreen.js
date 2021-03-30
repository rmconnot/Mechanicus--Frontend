import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { CheckboxGroup } from '../../common/Form';
import { NavGroup } from '../../common/BottomNav';
import { QuoteProgress } from '../../common/Progress';
import { useQuery } from "urql";

const retrieveServices = `
query {
	services {
        id
	    type
        price
	}
}
`;

const navOption = [
    {
        title: "Back", to: "QuoteVehicle",
    },{
        title: "Next", to: "QuoteReview",
    }
];
const emptyServiceList = [
    {  
        id: "01",
        type: "",
        price: 0, 
    },
];
const sampleServiceList = [
    {  
        id: "01",
        type: "Vehicle Inspection",
        price: 100,
    },{  
        id: "02",
        type: "Oil change", 
        price: 100
    },{  
        id: "03",
        type: "Brake repair", 
        price: 100
    },{  
        id: "04",
        type: "Battery replacement", 
        price: 100
    },{ 
        id: "05",
        type: "Battery Jump Service",
        price: 100 
    },
];

/* <QuoteServiceScreen> */
export default function QuoteServiceScreen({ navigation }) {
    let navigate = navigation.navigate;

    const [result, reexecuteQuery] = useQuery({
        query: retrieveServices,
    });
    const { data, fetching, error } = result;
    if (error) {
        Alert.alert("Error!",result.error.message,[
            { text: "OK", style: "OK" },
        ]);
    }
    if (data) {
        console.log(data.services);
    }

    return (
        <View style={styles.container}> 
            <View>
                <QuoteProgress curStep={2} status={[true,false,false]} />
                <CheckboxGroup options={data?data.services:emptyServiceList} />
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