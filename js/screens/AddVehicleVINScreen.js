import * as React from 'react';
import { View, Text, Button } from 'react-native';


/* <AddVehicleVINScreen> */
export default function AddVehicleVINScreen({ navigation }) {
    return (
        <View> 
           <Text>add new vehicle by VIN number</Text>
           <Button
            title="Go home"
            onPress={() => navigation.navigate('TaskList')}
        />
        </View>
    );
} 