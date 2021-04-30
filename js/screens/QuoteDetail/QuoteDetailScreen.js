import React from "react";
import {
	Text,
	View,
	FlatList,
	TouchableOpacity,
	Alert,
	SafeAreaView,
} from "react-native";
import { TaskProgress } from "../../common/Progress";
import { VehicleInfoCard, MechanicInfoCard, ServiceInfoCard } from "../../common/Card";
import { commonStyles } from "../../common/Style";
import { styles } from "./Styles";
import { gql, useQuery } from "@apollo/client";

export default function QuoteDetailScreen({ navigation, route }) {
	const { vehicle, billItems, createdAt } = route.params.quote;
	console.log(route.params.quote);
	const date = new Date(parseInt(createdAt)),
		dateStr = date.getMonth()+
		"/"+date.getDate()+
		"/"+date.getFullYear()+
		" "+date.getHours()+
		":"+date.getMinutes();
	return (
		<SafeAreaView style={commonStyles.pageContainer}>
			<View style={styles.section} >
				<Text style={commonStyles.sectionTitle}>Created At</Text>
				<Text style={commonStyles.h3}>{dateStr}</Text>
			</View>

			<View style={styles.section}>
				<Text style={commonStyles.sectionTitle}>Vehicle</Text>
				<VehicleInfoCard item={vehicle} />
			</View>

			<View style={styles.section}>
				<Text style={commonStyles.sectionTitle}>Services</Text>
				<ServiceInfoCard item={billItems}/>
			</View>
			
		</SafeAreaView>
	);
}