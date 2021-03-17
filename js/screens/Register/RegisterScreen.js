import * as React from 'react';
import { View, Text, Button } from 'react-native';


/* <RegisterScreen> */
export default function RegisterScreen({ navigation }) {
    return (
        <View> 
           <Text>hello, new user</Text>
           <Button
            title="Go home"
            onPress={() => navigation.navigate('TaskList')}
        />
        </View>
    );
} 