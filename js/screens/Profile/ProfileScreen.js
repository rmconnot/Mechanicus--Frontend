import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import BottomNav from '../../common/BottomNav';
import { gql, useQuery } from "@apollo/client";

const CUSTOMER_QUERY = gql`
	query($id: Int!) {
		customerProfile(id: $id) {
			firstName
            lastName
            zipcode
            streetAddress1
            streetAddress2
		}
	}
`;

/* <ProfileScreen> */
export function ProfileScreen({ navigation, route }) {
    const { currentUser } = route.params;

    const {data, loading, error} = useQuery(CUSTOMER_QUERY,{
        variables: {
            id: 1   //use currentUser.id when get previous route
        },
    });

    if (loading) return (<Text>Loading...</Text>);
    if (error) return (<Text>Oh no... {error.message}</Text>);

    return (
        <View style={styles.container}> 
            <View>
                <Text>{data.customerProfile.firstName}{data.customerProfile.lastName}</Text>
                <View>
                    <Text>info</Text>
                </View>
                <View>
                    <Text>Zipcode: {data.customerProfile.zipcode}</Text>
                    <Text>Addresses: {data.customerProfile.streetAddress2} {data.customerProfile.streetAddress1}</Text>
                </View>
            </View>

            <View>
                <View>
                    <Text>Settings</Text>
                </View>
                <View>
                    <Text>Notification</Text>
                    <Text>About us</Text>
                </View>
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