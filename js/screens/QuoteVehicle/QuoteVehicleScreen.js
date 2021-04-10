import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, FlatList } from 'react-native';
import { NavGroup } from '../../common/BottomNav';
import { QuoteProgress } from '../../common/Progress';
import { VehicleCard } from '../../common/Card';
import { VehicleRadio } from '../../common/Form';
import { useQuery } from "urql";

const getVehicles = `
query ($customerID: Int!){
	vehicles(customerID: $customerID){
        id
        vin
	    vehicleType
        make
        model
        year
        imgUrl
	}
}
`;

const navOption = [
    {
        title: "Back", to: "TaskList",
    },{
        title: "Next", to: "QuoteService",
    }
];

/* <QuoteVehicleScreen> */
export default function QuoteVehicleScreen({ 
    route,
    navigation,
    customerID = 1,
 }) {
    const [vehicle,setVehicle] = useState({});
    //get vehicle list from database
    //==========
    const [result, reexecuteQuery] = useQuery({
        query: getVehicles, 
        variables: { 
            customerID: customerID 
        },
    });
    const { data, fetching, error } = result;
    if (error) {
        Alert.alert("Error!",result.error.message,[
            { text: "OK", style: "OK" },
        ]);
    }
    // if (data) {
    //     console.log(data.vehicles);
    // }
    //==========

    const [selection, setSelection] = useState("");
    const handleSelection = id => {
        setSelection(id);
    };

    // console.log("####vehicle");
    // console.log(route.params);

    return (
        <View style={styles.container}> 
            <View>
                <QuoteProgress curStep={1} status={[false,false,false]} />
                <VehicleRadio 
                selected = {selection}
                options = {data?data.vehicles:[]} 
                handleSelection = {handleSelection}
                />
            </View>
            <NavGroup 
            navigation={navigation} 
            options={navOption} 
            data={{
                ...route.params,
                vehicle: selection,
            }}
            />
        </View>
    );
} 

const styles = StyleSheet.create({
	container: {
        flex: 1,
		justifyContent: "space-between",
	},
	
});