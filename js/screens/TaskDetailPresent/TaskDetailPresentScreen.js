import React, { useState } from "react";
import {
	TextInput,
	Text,
	View,
	FlatList,
	TouchableOpacity,
	Alert,
	Image,
	Modal,
	Button,
	Pressable,
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
import { gql, useQuery, useMutation } from "@apollo/client";
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
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						Alert.alert("Modal has been closed.");
						setModalVisible(!modalVisible);
					}}
				>
					<View style={styles.centerContainer}>
						<View style={styles.modalView}>
							<Text style={styles.modalTitle}>
								Are you sure you want to cancel this appointment?
							</Text>
							<Text style={styles.sectionTitle}>
								You will lose the appointment and quote if you cancel the task.
							</Text>
							<Pressable style={styles.yesButton}
								onPress={() => {
									updateAppointment({
										variables: {
											id: appointmentID,
											status: "canceled"
										}
									})
									.then((result) => {
										console.log("result: ", result);
										setModalVisible(!modalVisible);
										navigation.goBack();
										return;
									});
								}}
							>
								<Text style={{textAlign: "center"}}>
									YES
								</Text>
							</Pressable>
							<Pressable style={styles.noButton}
								onPress={() => setModalVisible(!modalVisible)}
							>
								<Text style={{textAlign: "center"}}>
									NO
								</Text>
							</Pressable>
						</View>
					</View>
				</Modal>
				<Button
					title="Cancel"
					onPress={() => setModalVisible(true)}
				/>
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
