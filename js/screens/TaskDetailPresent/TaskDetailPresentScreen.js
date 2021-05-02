import React, { useState } from "react";
import {
	TextInput,
	Text,
	View,
	FlatList,
	TouchableOpacity,
	Alert,
	Image,
	Button,
	SafeAreaView,
	ScrollView,
} from "react-native";
import { TaskProgress } from "../../common/Progress";
import {
	VehicleInfoCard,
	MechanicInfoCard,
	ServiceInfoCard,
} from "../../common/Card";
import { commonStyles, colors } from "../../common/Style";
import { styles } from "./Styles";
import { gql, useQuery } from "@apollo/client";
import PaymentModule from "../../common/Payment";

const imageURL = {
	circle: "./images/circle.png",
	line: "./images/line.png",
};

export default function TaskDetailPresentScreen({ navigation, route }) {
	const { appointment } = route.params;

	console.log("appoinment: ", appointment);

	const [totalPrice, setTotalPrice] = useState();

	const currentAppointmentStep = {
		PENDING: 1,
		CANCELED: 1,
		APPROVED: 2,
		PAID: 3,
		COMPLETED: 3,
	};

	const handleTotalPrice = (total) => {
		console.log("total: ", total);
		setTotalPrice(total);
	};

	return (
		<SafeAreaView style={commonStyles.container}>
			<ScrollView style={commonStyles.pageContainer}>
				<TaskProgress curStep={currentAppointmentStep[appointment.status]} />

				<View style={styles.section}>
					<Text style={commonStyles.sectionTitle}>Schedule</Text>
					<Text style={commonStyles.h3}>{appointment.scheduleDate}</Text>
				</View>

				<View style={styles.section}>
					<Text style={commonStyles.sectionTitle}>Mechanic</Text>
					<MechanicInfoCard item={appointment.mechanic} />
				</View>

				<View style={styles.section}>
					<Text style={commonStyles.sectionTitle}>Vehicle</Text>
					<VehicleInfoCard item={appointment.quote.vehicle} />
				</View>

				<View style={styles.section}>
					<Text style={commonStyles.sectionTitle}>Service</Text>
					<ServiceInfoCard
						item={appointment.quote.billItems}
						handleTotalPrice={handleTotalPrice}
					/>
				</View>

				{appointment.status === "COMPLETED" ? (
					<PaymentModule
						navigation={navigation}
						route={route}
						appointment={appointment}
						totalPrice={totalPrice}
					/>
				) : null}
			</ScrollView>
		</SafeAreaView>
	);
}
