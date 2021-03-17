import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavGroup } from '../common/BottomNav';
import { QuoteProgress } from '../common/Progress';

const navOption = [
    {
        title: "Back", to: "QuoteService",
    },{
        title: "Next", to: "QuoteReview",
    }
];

/* <QuoteReviewScreen> */
export default function QuoteReviewScreen({ navigation }) {
    return (
        <View style={styles.container}> 
            <View>
                <QuoteProgress curStep={3} status={[true,true,false]} />
                <Text>quote services</Text>
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
	
});