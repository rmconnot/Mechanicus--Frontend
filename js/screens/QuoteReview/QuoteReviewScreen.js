import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavGroup } from '../../common/BottomNav';
import { QuoteProgress } from '../../common/Progress';
import { VehicleCard } from '../../common/Card';
import { FlatList } from 'react-native-gesture-handler';
import { render } from 'react-dom';
import { styles } from './Styles';
import { TabRouter } from '@react-navigation/routers';

const navOption = [
    {
        title: "Cancel", to: "QuoteService",
    },{
        title: "Schedule", to: "Schedule",
    }
];

const sampleServiceList = [
    {  
        id: "01",
        text: "Vehicle Inspection", 
        price: 123,
    },{  
        id: "02",
        text: "Oil change", 
        price: 123.
    },{  
        id: "03",
        text: "Brake repair", 
        price: 123
    }
];

function ServiceEntry({
    text = "service diaplay name",
    price = 123.0
}){
    return (
        <View style={styles.row} >
            <Text>{text}</Text>
            <Text>$ {price}</Text>
        </View>
    );
}
/* <QuoteReviewScreen> */
export default function QuoteReviewScreen({ route, navigation }) {
    let { vehicle, services } = route.params;
    const renderItem = (item) => {
        return (
            <ServiceEntry text={item.text} price={item.price} />
        );
    };
    let sum = 0;//total price
    // console.log("####review");
    // console.log(route.params);

    return (
        <View style={styles.container}> 
            <View>
                <QuoteProgress curStep={3} status={[true,true,false]} />
                <View>
                    <Text>Vehicle</Text>
                    <VehicleCard item={vehicle} />
                </View>
                <View>
                    <Text>Service</Text>
                    {/* <FlatList 
                        data={services}
                        renderItem={renderItem}
                        keyExtractor={item => String(item.id)}
                    /> */}
                    <View>
                        <Text>Total price:{sum}</Text>
                    </View>
                </View>

            </View>
            <NavGroup navigation={navigation} options={navOption} data={{
                ...route.params,
            }}/>
        </View>
    );
} 