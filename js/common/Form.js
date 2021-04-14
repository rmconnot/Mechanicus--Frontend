import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { VehicleCard } from './Card';

/* consts */
const sampleOptions = [
	{
		id: "1",
		text: "first option",
		checked: false,
		value: "01",
	},
	{
		id: "2",
		text: "second option",
		checked: true,
		value: "02",
	},
];
/*=============================*/

/* <Checkbox> */
export function Checkbox({
	id = "test",
	text = "option displayed",
	checked = false,
	handleStatus = () => {}, //handle status change in checkboxes
}) {
    const [status, onChangeStatus] = useState(checked);
    const changeStatus = () => {
        handleStatus({checked: !status, id: id});
        onChangeStatus(!status);
    };
    return (
        <TouchableOpacity 
        style={styles.checkboxContainer}
        activeOpacity={0.6}
        onPress={ e => changeStatus() }
        > 
            <Text>{text}</Text>
            <View style={[styles.checkboxMark,status?styles.checkboxMarkActive:""]}></View>
        </TouchableOpacity>
    );
} 

export function ServiceCheckbox({
	id = "test",
	text = "option displayed",
	price = 100,
	checked = false,
	handleStatus = () => {}, //handle status change in checkboxes
}) {
    const [status, onChangeStatus] = useState(checked);
    const changeStatus = () => {
        handleStatus({checked: !status, id: id});
        onChangeStatus(!status);
    };
    return (
        <TouchableOpacity 
        style={styles.checkboxContainer}
        activeOpacity={0.6}
        onPress={ e => changeStatus() }
        > 
            <Text>{text},{price}</Text>
            <View style={[styles.checkboxMark,status?styles.checkboxMarkActive:""]}></View>
        </TouchableOpacity>
    );
} 

export function CheckboxGroup({
    selections = [],//stored ids of checked item
    options = sampleOptions,
    handleSelections,
}) {    

    const renderItem = ({item}) => {
        return (
            <ServiceCheckbox 
            id={item.id} 
            text={item.type} 
            price={item.price} 
            checked={selections.includes(item.id)} 
            handleStatus={handleSelections}
            />
        );
    };
    return (
        <View>
            <FlatList 
            data={options}
            renderItem={renderItem}
            keyExtractor={item => String(item.id) }
            />
        </View>
    );
}

/* <Radio> */
//radio selections
export function VehicleRadio({
    options = [],
    selected = "",
    handleSelection = () => {}
}){
    const renderItem = ({item}) => {
        return (
            <TouchableOpacity
            style={
                item.id == selected? styles.radioSelected: ""
            }
            activeOpacity={0.6}
            onPress={ e => handleSelection(item.id) }>
                <VehicleCard item={item} />
            </TouchableOpacity>
        );
    };
    return (
        <View>
            <FlatList 
            data={options}
            renderItem={renderItem}
            keyExtractor={item => String(item.id) }
            />
        </View>
    );
}

const styles = StyleSheet.create({
	container: {},
	checkboxContainer: {
		width: "100%",
		flexDirection: "row",
		margin: 4,
		padding: 8,
		justifyContent: "space-between",
		alignItems: "center",
	},
	checkboxMark: {
		width: 24,
		height: 24,
		borderColor: "#666",
		borderWidth: 1,
		margin: 4,
	},
	checkboxMarkActive: {
		backgroundColor: "#666",
	},
    checkboxContainer: {
        width: "100%",
        flexDirection: "row",
        margin: 4,
        padding: 8,
        justifyContent: "space-between",
        alignItems: "center",
    },
    checkboxMark: {
        width: 24,
        height: 24,
        borderColor: "#666",
        borderWidth: 1,
        margin: 4,
    },
    checkboxMarkActive: {
        backgroundColor: "#666"
    },
    radioSelected: {
        borderWidth: 2,
        borderColor: "black",
    }
    
});
