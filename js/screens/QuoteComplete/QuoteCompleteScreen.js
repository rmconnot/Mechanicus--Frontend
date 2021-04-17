import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavGroup } from '../../common/BottomNav';
import { QuoteProgress } from '../../common/Progress';


/* <QuoteVehicleScreen> */
export default function QuoteCompleteScreen({ navigation }) {
    return (
        <View style={styles.container}> 
            <View>
                <Text>Congratulations!</Text>
            </View>
            <View>
                <Text>
                    Your appointment has been successfully scheduled!
                </Text>
                <Text>
                    Your assigned mechanic will contact you before your task begins.
                </Text>
            </View>
            <Button
                title="Get a quote"
                onPress={() => navigation.navigate("TaskList") }
            />
        </View>
    );
} 

const styles = StyleSheet.create({
	container: {
        flex: 1,
		justifyContent: "space-between",
	},
	
});