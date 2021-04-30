import React from "react";
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
	ScrollView
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

const APPOINTMENT_QUERY = gql`
	query($appointmentID: Int!) {
		appointment(appointmentID: $appointmentID) {
			id
			scheduleDate
			status
			mechanic {
				firstName
				lastName
				phone
			}
			quote {
				vehicle {
					year
					make
					model
					imgUrl
					vin
				}
				billItems {
					service {
						id
						type
					}
					part {
						id
						type
					}
					cost
				}
			}
		}
	}
`;


export default function TaskDetailPresentScreen({ navigation, route }) {
	const { appointmentID } = route.params;
	console.log(appointmentID);

	const { loading, data, error } = useQuery(APPOINTMENT_QUERY, {
		variables: {
			appointmentID: appointmentID,
		},
	});

	const currentAppointmentStep = {
		PENDING: 0,
		CANCELED: 0,
		APPROVED: 1,
		PAID: 2,
		COMPLETED: 2,
	};

	console.log(data);
	// data = data.appointment;

	if (loading) return <Text>Loading...</Text>;
	if (error) return <Text>Oh no... {error.message}</Text>;

	return (
		<SafeAreaView style={commonStyles.container}>
			<ScrollView style={commonStyles.pageContainer}>

			<TaskProgress curStep={currentAppointmentStep[data.appointment.status]} />

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

// 			<View style={styles.section}>
// 				<Text style={commonStyles.sectionTitle}>Service</Text>
// 				<ServiceInfoCard item={appointment.quote.billItems} />
// 			</View>

// 			{appointment.status === "completed" ? (
			{data.appointment.status != "COMPLETED" &&
			data.appointment.status != "PAID" ? (
				<View style={styles.section}>
					<Text style={commonStyles.sectionTitle}>Service</Text>
					<ServiceInfoCard item={data.appointment.quote.services} />
				</View>
			) : null}

			{data.appointment.status === "COMPLETED" ||
			data.appointment.status === "PAID" ? (
				<View style={commonStyles.card}>
					<View style={styles.totalEntry}>
						<Text style={commonStyles.body}>Total Price </Text>
						<Text style={commonStyles.h3}> {data.appointment.finalCost}</Text>
					</View>
				</View>
			) : null}

			{data.appointment.status === "COMPLETED" ? (
				<PaymentModule
					navigation={navigation}
					route={route}
					appointment={appointment}
				/>
			) : null}
			</ScrollView>
		</SafeAreaView>
	);
}
