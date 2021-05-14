import * as React from "react";
import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import BottomNav from "../../common/BottomNav";
import { gql, useQuery } from "@apollo/client";
import styles from "./Styles";
import { Icon } from "../../common/Svg";
import { colors, commonStyles } from "../../common/Style";

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
	console.log(route.params);

	const { data, loading, error } = useQuery(CUSTOMER_QUERY, {
		variables: {
			id: currentUser.id, //use currentUser.id when get previous route
		},
	});

	if (loading) return <Text>Loading...</Text>;
	if (error) return <Text>Oh no... {error.message}</Text>;

	return (
		<SafeAreaView style={commonStyles.container}>
			<View style={[commonStyles.pageContainer, { flex: 1 }]}>
				<Text style={styles.warningText}>Page under construction</Text>
				<View style={styles.titleRow}>
					<Icon name="account" color={colors.gray4} size={56} />
					<Text style={[commonStyles.h2, styles.userName]}>
						{data.customerProfile.firstName} {data.customerProfile.lastName}
					</Text>
				</View>

				<View style={styles.group}>
					<Text style={[commonStyles.body, styles.label]}>info</Text>

					<View style={styles.inputBox}>
						<Text style={commonStyles.h3}>Zipcode</Text>
						{/* <Text style={styles.inputTextContent}>{data.customerProfile.zipcode}</Text> */}
					</View>
					<View style={styles.inputBox}>
						<Text style={commonStyles.h3}>Addresses</Text>
						{/* <Text>{data.customerProfile.streetAddress2} {data.customerProfile.streetAddress1}</Text> */}
					</View>
				</View>

				<View style={styles.group}>
					<Text style={[commonStyles.body, styles.label]}>Settings</Text>

					<View style={styles.inputBox}>
						<Text style={commonStyles.h3}>Notification</Text>
					</View>
					<View style={styles.inputBox}>
						<Text style={commonStyles.h3}>About Mechanicus</Text>
					</View>
				</View>
			</View>
			<BottomNav
				navigation={navigation}
				routeProps={route}
				activated="Account"
			/>
		</SafeAreaView>
	);
}
