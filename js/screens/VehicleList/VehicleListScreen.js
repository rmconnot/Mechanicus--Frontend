import React, { useState } from "react";
import { TextInput, Text, View, FlatList, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { commonStyles } from '../../common/Style';
import BottomNav from '../../common/BottomNav';
import { VehicleCard } from '../../common/Card';
import { BtnDisplay } from '../../common/Buttons';
import { styles } from './Styles';
import { gql, useQuery } from "@apollo/client";

const VEHICLES_QUERY = gql`query ($customerID: Int!) {
	vehicles (customerID: $customerID) {
        id
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

        

export const VehicleListScreen = ({ navigation, route }) => {
    const { currentUser } = route.params;
    const { data, error, loading } = useQuery(
		VEHICLES_QUERY,
		{
			variables: { customerID: currentUser.id },
			onError: (error) => console.log(JSON.stringify(error, null, 2)),
		}
	);

    const renderItem = ({item}) => {
        return <VehicleCard item={item} navigation={navigation} route={route}/>;
    };


    return (
        <SafeAreaView style={commonStyles.container}>
            <View style={commonStyles.pageContainer}>
                <BtnDisplay title="New Vechicle" icon="add" left={true} onPress={
                    () => navigation.navigate("AddVehicleManual",{...route})
                }/>
                <FlatList
                    data={data?data.vehicles:[]}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
            <BottomNav navigation={ navigation } routeProps={ route } activated="My Vehicles"/>
        </SafeAreaView>
    )
}