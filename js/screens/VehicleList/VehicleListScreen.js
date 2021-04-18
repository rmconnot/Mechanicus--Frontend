import React, { useState } from "react";
import { TextInput, Text, View, FlatList, TouchableOpacity, Alert, Image, Button } from 'react-native';
import { commonStyles } from '../../common/commonStyles';
import BottomNav from '../../common/BottomNav';
import { VehicleCard } from '../../common/Card';
import { styles } from './Styles';
import { gql, useQuery } from "@apollo/client";

const vehicleQuery = gql`query ($customerID: Int!) {
	vehicle (customerID: $customerID) {
        year
        make
        model
        imgUrl
	}}`;

const sampleVehicle =  [{
    id:1,
    make:'Honda', 
    model:'CR-V', 
    year:"2019", 
    imgUrl:'https://cka-dash.s3.amazonaws.com/131-1018-WTS230/mainimage.jpg'
}, 
{
    id:2,
    make:'Toyota', 
    model:'Highlander', 
    year:"2021", 
    imgUrl: 'https://www.motortrend.com/uploads/sites/5/2020/11/2021-Toyota-Highlander-XSE-30.jpg'
}];

        

export const VehicleListScreen = ({ navigation }) => {

    const [result, reexecuteQuery] = useQuery({
        query: vehicleQuery,
        variables: {
            customerID: 1
        },
    });
    const { data, fetching, error } = result;

    if (fetching) return (<Text>Loading...</Text>);
    if (error) return (<Text>Oh no... {error.message}</Text>);

    

    const renderItem = ({item}) => {
        return (
            <View style={commonStyles.cardShape}>
                <VehicleCard item={item} />
                <View style={styles.listButtonsContainer}>
                    <Button
                        title="Get a quote"
                        onPress={() => navigation.navigate("QuoteVehicle") }
                    />
                </View>
            </View>
        );
    };


    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <View style={styles.headerSeection}>
                    <View style={styles.titleSection}>
                        <Text>My Vehicles</Text>
                        <Button
                            title="Edit"
                            onPress={() => Alert.alert('jump to the edit page')}
                        />
                    </View>

                    <Button
                        title="Add a new vehicle"
                        onPress={() => Alert.alert('jump to the add page')}
                    />
                </View>
                <FlatList
                    data={data?data.vehicle:sampleVehicle}
                    renderItem={renderItem}
                />
            </View>
            <BottomNav navigation={ navigation }/>
        </View>
    )
}