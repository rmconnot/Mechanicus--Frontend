import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { CheckboxGroup } from '../../common/Form';
import { NavGroup } from '../../common/BottomNav';
import { QuoteProgress } from '../../common/Progress';
import { useQuery } from "urql";
import { TabRouter } from '@react-navigation/routers';

const getServices = `
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
export default function QuoteServiceScreen({ route, navigation }) {

    //get service options from database
    //==========
    const [result, reexecuteQuery] = useQuery({
        query: getServices,
    });
    const { data, fetching, error } = result;
    if (error) {
        Alert.alert("Error!",result.error.message,[
            { text: "OK", style: "OK" },
        ]);
    }
    // if (data) {
    //     console.log(data.services);
    // }
    //===========

    const [selections, onChangeSelections] = useState(route.params.services||[]);
    const handleSelections = item => {
        let temp = selections.slice();
        let index = selections.indexOf(item.id);
        //if item is not checked and exist in selections, remove it from selections
        if(!item.checked && index!=-1){
            temp.splice(index,1);
            onChangeSelections(temp);
        }//if item is checked and not in selections, add it in
        else if(item.checked && index == -1){
            temp.push(item.id);
            onChangeSelections(temp);
        }
    };
    // console.log("####service");
    // console.log(route.params);

    return (
        <View style={styles.container}> 
            <View>
                <QuoteProgress curStep={2} status={[true,false,false]} />
                <CheckboxGroup selections={selections} options={data?data.services:emptyServiceList} handleSelections={handleSelections}/>
            </View>
            
            <NavGroup 
            navigation={navigation} 
            options={navOption} 
            data={{
                ...route.params,
                services: selections,
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