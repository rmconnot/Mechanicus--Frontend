import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavGroup } from '../common/BottomNav';
import { QuoteProgress } from '../common/Progress';
import { VehicleCard } from '../common/Card';
import { FlatList } from 'react-native-gesture-handler';
import { render } from 'react-dom';

const navOption = [
    {
        title: "Cancel", to: "QuoteService",
    },{
        title: "Schedule", to: "QuoteReview",
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
export default function QuoteReviewScreen({ navigation }) {
    const renderItem = (item) => {
        return (
            <ServiceEntry text={item.text} price={item.price} />
        );
    };
    let sum = 0;//total price
    return (
        <View style={styles.container}> 
            <View>
                <QuoteProgress curStep={3} status={[true,true,false]} />
                <View>
                    <Text>Vehicle</Text>
                    <VehicleCard />
                </View>
                <View>
                    <Text>Service</Text>
                    <FlatList 
                        data={sampleServiceList}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                    <View>
                        <Text>Total price:{sum}</Text>
                    </View>
                </View>

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
    row:{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 8,
    }
	
});