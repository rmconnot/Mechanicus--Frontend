import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import BottomNav from '../../common/BottomNav';
import { gql, useQuery } from "@apollo/client";
import styles from "./Styles";
import {Icon} from '../../common/Svg'
import { colors } from '../../common/Style';

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
    
    const { currentUser } = route.params.params;
    // console.log(currentUser)

    const {data, loading, error} = useQuery(CUSTOMER_QUERY,{
        variables: {
            id: currentUser.id   //use currentUser.id when get previous route
        },
    });

    if (loading) return (<Text>Loading...</Text>);
    if (error) return (<Text>Oh no... {error.message}</Text>);

    return (
        <View style={styles.container}> 
            <View>
                <View style={styles.profileIcon}>
                    <Icon name = "account" color = {colors.gray4} size = {56}/>
                </View>
                
                <Text style={styles.userName}>{data.customerProfile.firstName} {data.customerProfile.lastName}</Text>
                <View>
                    <Text style={styles.title}>info</Text>
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.inputTextTitle}>Zipcode</Text>
                    {/* <Text style={styles.inputTextContent}>{data.customerProfile.zipcode}</Text> */}
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.inputTextTitle}>Addresses</Text>
                    {/* <Text>{data.customerProfile.streetAddress2} {data.customerProfile.streetAddress1}</Text> */}
                </View>
            </View>

            <View>
                <View>
                    <Text style={styles.title}>Settings</Text>
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.inputTextTitle}>Notification</Text>
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.inputTextTitle}>About us</Text>
                </View>
            </View>
            <View style={styles.bottom}>
                <BottomNav navigation={ navigation } routeProps={route} activated = "Account"/>
            </View>
            
        </View>
    );
} 
