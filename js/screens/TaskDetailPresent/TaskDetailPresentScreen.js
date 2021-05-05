import React, {useState} from "react";
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
	Pressable
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

const APPOINTMENT_QUERY = gql`
	query($appointmentID: Int!) {
		appointment(appointmentID: $appointmentID) {
			id
			scheduleDate
			status
			finalCost
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
				services {
					id
					type
					price
				}
			}
		}
	}
`;

const APPOINTMENT_MUTATION = gql`
	mutation($id: Int!, $status: String!) {
		updateAppointment(id: $id, status: $status) {
			id
		}
	}
`;

const sampleQuotes = [
	{
		id: 1,
		scheduleDate: "03/04/2021",
		status: "confirm",
		services: [
			{
				price: 100,
				type: "Vehicle Inspection",
			},
			{
				price: 110,
				type: "Oil change",
			},
		],
		mechanic: {
			firstName: "Michael",
			lastName: "Williams",
			phone: "123-456-7890",
		},
		vehicle: {
			vin: "0987654321",
			vehicleType: "SUV",
			year: 2010,
			make: "Chevrolet",
			model: "Trailblazer",
			imgUrl:
				"https://www.gannett-cdn.com/presto/2020/07/10/PDTF/76f14475-53f5-4abe-ae0f-a4f4911c8be3-IMG_2481.JPG",
		},
	},

	{
		id: 2,
		scheduleDate: "05/04/2021",
		status: "confirm",
		services: [
			{
				price: 100,
				type: "Vehicle Inspection",
			},
			{
				price: 110,
				type: "Oil change",
			},
		],
		mechanic: {
			firstName: "Bill",
			lastName: "Davis",
			phone: "123-456-7890",
		},
		vehicle: {
			vin: "1122334455",
			vehicleType: "Truck",
			year: 2005,
			make: "Toyota",
			model: "Tundra",
			imgUrl:
				"https://www.toyota.com/imgix/responsive/images/mlp/colorizer/2021/tundra/8W2/1.png",
		},
	},
];

export default function TaskDetailPresentScreen({ navigation, route }) {
	const { appointmentID } = route.params;
	const [modalVisible, setModalVisible] = useState(false);
	console.log(appointmentID);

	const { loading, data, error } = useQuery(APPOINTMENT_QUERY, {
		variables: {
			appointmentID: appointmentID,
		},
	});

	const [updateAppointment, { data: appointmentData }] = useMutation(
		APPOINTMENT_MUTATION,
		{
			onError: (error) => console.log(JSON.stringify(error, null, 2)),
		}
	);

	console.log(data);
	// data = data.appointment;

	if (loading) return <Text>Loading...</Text>;
	if (error) return <Text>Oh no... {error.message}</Text>;

	return (
		<View style={commonStyles.pageContainer}>
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

			<TaskProgress />

			<View style={styles.section}>
				<Text style={commonStyles.sectionTitle}>Schedule</Text>
				<Text style={commonStyles.h3}>{data.appointment.scheduleDate}</Text>
			</View>

			{/* <View style={styles.section}>
				<Text style={commonStyles.sectionTitle}>Mechanician</Text>
				<MechanicInfoCard item={data ? data.appointment.mechanic : ""} />
			</View> */}

			<View style={styles.section}>
				<Text style={commonStyles.sectionTitle}>Vehicle</Text>
				<VehicleInfoCard item={data.appointment.quote.vehicle} />
			</View>

			<View style={styles.section}>
				<Text style={commonStyles.sectionTitle}>Service</Text>
				<ServiceInfoCard item={data.appointment.quote.services} />
			</View>

			{data.appointment.status === "completed" ? (
				<PaymentModule
					navigation={navigation}
					route={route}
					appointment={data.appointment}
				/>
			) : null}
		</View>
	);
}
