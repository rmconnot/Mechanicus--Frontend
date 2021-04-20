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
	const { vehicle, services, createdAt } = route.params.quote;
	console.log(route.params.quote);
	console.log(String(new Date()));
	return (
		<SafeAreaView style={commonStyles.pageContainer}>
			<View style={styles.section} >
				<Text style={commonStyles.sectionTitle}>Created At</Text>
				<Text style={commonStyles.h3}>{createdAt}</Text>
			</View>

			<View style={styles.section}>
				<Text style={commonStyles.sectionTitle}>Vehicle</Text>
				<VehicleInfoCard item={vehicle} />
			</View>

			<View style={styles.section}>
				<Text style={commonStyles.sectionTitle}>Services</Text>
				<ServiceInfoCard item={services}/>
			</View>
			
		</SafeAreaView>
	);
}