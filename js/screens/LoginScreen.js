import * as React from 'react';
import { View, Text, Button } from 'react-native';


/* <LoginScreen> */
export default function Login({ navigation }) {
    return (
        <View> 
           <Text>welcome returned customer</Text>
           <Button
            title="Go home"
            onPress={() => navigation.navigate('TaskList')}
        />
        </View>
    );
} 