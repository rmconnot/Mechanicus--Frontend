import React, { useState } from "react";
import {
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Button,
	Platform,
	Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "./Styles";
import { gql, useMutation } from "@apollo/client";
import Moment from "moment";

const APPOINTMENT_MUTATION = gql`
	mutation(
		$address: String!
		$customerID: Int!
		$quoteID: Int!
		$scheduleDate: String!
	) {
		createAppointment(
			address: $address
			customerID: $customerID
			quoteID: $quoteID
			scheduleDate: $scheduleDate
		) {
			id
		}
	}
`;

export function ScheduleScreen({ navigation, route }) {
	console.log("scheduleScreen route.params: ", route.params);

	const currentDate = Date.now();

	const [scheduleInput, setScheduleInput] = useState({
		date: currentDate,
		address: "",
		phone: "",
	});

	const [appointmentID, setAppointmentID] = useState();

	const [createAppointment, { data: appointmentData }] = useMutation(
		APPOINTMENT_MUTATION,
		{
			onError: (error) => console.log(JSON.stringify(error, null, 2)),
		}
	);

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		//setShow(Platform.OS === 'ios');
		setScheduleInput((prevState) => {
			return { ...prevState, date: currentDate };
		});
	};

	console.log("scheduleInput: ", scheduleInput);

	console.log("variables: ", {
		customerID: route.params.currentUser,
		quoteID: route.params.quoteID,
		scheduleDate: Moment(scheduleInput.date)
			.format("DD-MMM-YYYY h:mm A")
			.toString(),
		address: scheduleInput.address,
	});

	const handleConfirmation = () => {
		createAppointment({
			variables: {
				customerID: route.params.currentUser,
				quoteID: route.params.quoteID,
				scheduleDate: Moment(scheduleInput.date)
					.format("DD-MMM-YYYY h:mm A")
					.toString(),
				address: scheduleInput.address,
			},
		}).then((result) => {
			console.log("result: ", result);
			setAppointmentID(result.data.createAppointment.id);
		});
	};

	return (
		<View style={styles.container}>
			<Text style={styles.logo}>Schedule</Text>
			<View style={styles.inputView}>
				<DateTimePicker
					value={scheduleInput.date}
					mode="date"
					is24Hour={true}
					display="default"
					onChange={onChange}
				/>
			</View>
			<View style={styles.inputView}>
				<DateTimePicker
					value={scheduleInput.date}
					mode="time"
					is24Hour={true}
					// minuteInterval={15}
					display="default"
					onChange={onChange}
				/>
			</View>
			<View style={styles.inputView}>
				<TextInput
					style={styles.inputText}
					placeholder="Enter your Address"
					placeholderTextColor="#003f5c"
					autoCapitalize="none"
					onChangeText={(text) =>
						setScheduleInput((prevState) => {
							return { ...prevState, address: text };
						})
					}
				/>
			</View>
			<View style={styles.inputView}>
				<TextInput
					style={styles.inputText}
					placeholder="Enter your phone number"
					placeholderTextColor="#003f5c"
					autoCapitalize="none"
					onChangeText={(text) =>
						setScheduleInput((prevState) => {
							return { ...prevState, phone: text };
						})
					}
				/>
			</View>
			<TouchableOpacity
				style={styles.registerBtn}
				onPress={
					// Alert.alert("jump to the payment page" + scheduleInput.date)
					handleConfirmation
				}
			>
				<Text style={styles.registerText}>Confirm</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.cancelBtn}
				onPress={() => Alert.alert("jump to the quote page")}
			>
				<Text style={styles.cancelText}>Cancel</Text>
			</TouchableOpacity>
		</View>
	);
}
