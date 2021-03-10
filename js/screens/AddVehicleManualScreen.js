import * as React from 'react';
import { View, Text, Button } from 'react-native';


/* <AddVehicleManualScreen> */
export default function AddVehicleManualScreen({ navigation }) {
    return (
        <View> 
           <Text>add new vehicle manually</Text>
           <Button
            title="Go home"
            onPress={() => navigation.navigate('TaskList')}
        />
        </View>
    );
} 