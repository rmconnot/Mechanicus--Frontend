import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import BottomNav from '../common/BottomNav';


/* <TaskListScreen> */
export default function TaskListScreen({ navigation }) {
    return (
        <View style={styles.container}> 
            <View>
                <Text>home page, task list</Text>
                <Button 
                    title={"Get a Quote"}
                    onPress={() => navigation.navigate("QuoteVehicle")}
                />
            </View>
            <BottomNav navigation={ navigation }/>
        </View>
    );
} 

const styles = StyleSheet.create({
	container: {
        flex: 1,
		justifyContent: "space-between",
	},
	
});