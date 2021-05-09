import React, { useState } from "react";
import {
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Button,
	Platform,
	Alert,
	SafeAreaView,
	ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Moment from "moment";
import styles from "./Styles";
import { colors, commonStyles } from "../../common/Style";
import { Icon } from "../../common/Svg";
import { TopNavBar } from "../../common/TopNav";
import { BtnLarge, BtnBare } from "../../common/Buttons";
import { gql, useMutation } from "@apollo/client";
import { Picker } from "@react-native-community/picker";

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
			status: "PENDING"
		) {
			id
		}
	}
`;

export function ScheduleScreen({ navigation, route }) {
	console.log("scheduleScreen route.params: ", route.params);

	const currentDate = new Date();

	//trueHour refers to the hour the user is experiencing, same as trueDay
	const trueHour = currentDate.getHours();
	const trueDay = Moment(currentDate).format("DD-MMM-YYYY").toString();

	const [scheduleInput, setScheduleInput] = useState({
		date: currentDate,
		address: "",
		phone: "",
		time: "11:00-12:00pm",
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
		customerID: route.params.currentUser.id,
		quoteID: route.params.quoteID,
		scheduleDate:
			Moment(scheduleInput.date).format("DD-MMM-YYYY").toString() +
			scheduleInput.time,
		address: scheduleInput.address,
	});

	const handleConfirmation = async () => {
		await createAppointment({
			variables: {
				customerID: route.params.currentUser.id,
				quoteID: route.params.quoteID,
				scheduleDate:
					Moment(scheduleInput.date).format("DD-MMM-YYYY").toString() +
					" " +
					scheduleInput.time,
				address: scheduleInput.address,
			},
		});

		navigation.replace("TaskList", route.params);
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<TopNavBar
				title="Schedule"
				cancel={true}
				onPressBack={() => navigation.navigate("TaskList", route.params)}
				onPressCancel={() => navigation.navigate("TaskList", route.params)}
			/>
			<ScrollView style={[commonStyles.pageContainer, { marginTop: 12 }]}>
				<View
					style={[commonStyles.card, commonStyles.shadowDefault, styles.row]}
				>
					<View style={styles.col}>
						<View style={styles.labelContainer}>
							<Icon name="calendar" size={24} color={colors.primaryDark} />
							<Text style={commonStyles.h3}>Date</Text>
						</View>
						<View style={commonStyles.inputBox2}>
							<DateTimePicker
								value={scheduleInput.date}
								mode="date"
								is24Hour={true}
								display="default"
								onChange={onChange}
							/>
						</View>
					</View>

					<View style={styles.col}>
						<View style={styles.labelContainer}>
							<Icon name="clock" size={24} color={colors.primaryDark} />
							<Text style={commonStyles.h3}>Time</Text>
						</View>
						<View style={commonStyles.inputBox2}>
							<DateTimePicker
								value={scheduleInput.date}
								mode="time"
								is24Hour={true}
								// minuteInterval={15}
								display="default"
								onChange={onChange}
							/>
							{/* <Picker
								mode="dropdown"
								selectedValue={scheduleInput.time}
								style={{ height: 24, width: 300 }}
								onValueChange={(value) => setScheduleInput({time: value})}
							>
							<Picker.Item label={scheduleInput.date!=trueDay?"11:00-12:00pm":trueHour<11?"11:00-12:00pm":"not available"} value="11:00-12:00pm"/>
							<Picker.Item label={scheduleInput.date!=trueDay?"12:00-1:00pm":trueHour<12?"12:00-1:00pm":"not available"} value="12:00-1:00pm"/>
							<Picker.Item label={scheduleInput.date!=trueDay?"1:00-2:00pm":trueHour<13?"1:00-2:00pm":"not available"} value="1:00-2:00pm"/>
							<Picker.Item label={scheduleInput.date!=trueDay?"2:00-3:00pm":trueHour<14?"2:00-3:00pm":"not available"} value="2:00-3:00pm"/>
							<Picker.Item label={scheduleInput.date!=trueDay?"3:00-4:00pm":trueHour<15?"3:00-4:00pm":"not available"} value="3:00-4:00pm"/>
							<Picker.Item label={scheduleInput.date!=trueDay?"4:00-5:00pm":trueHour<16?"4:00-5:00pm":"not available"} value="4:00-5:00pm"/>
							<Picker.Item label={scheduleInput.date=trueDay?"5:00-6:00pm":trueHour<17?"5:00-6:00pm":"not available"} value="5:00-6:00pm"/>
							<Picker.Item label={scheduleInput.date!=trueDay?"6:00-6:30pm":trueHour<18?"6:00-6:30pm":"not available"} value="6:00-6:30pm"/>
							</Picker> */}
						</View>
					</View>
				</View>

				<View style={[commonStyles.card, commonStyles.shadowDefault]}>
					<View style={styles.labelContainer}>
						<Icon name="building" size={24} color={colors.primaryDark} />
						<Text style={commonStyles.h3}>Address</Text>
					</View>
					<TextInput
						style={[commonStyles.inputBox2, styles.multiline]}
						multiline={true}
						placeholder="street, apt number, state, postcode"
						placeholderTextColor={colors.gray4}
						autoCapitalize="none"
						onChangeText={(text) =>
							setScheduleInput((prevState) => {
								return { ...prevState, address: text };
							})
						}
					/>
				</View>
				<View style={[commonStyles.card, commonStyles.shadowDefault]}>
					<View style={styles.labelContainer}>
						<Icon name="phone" size={24} color={colors.primaryDark} />
						<Text style={commonStyles.h3}>Phone#</Text>
					</View>
					<TextInput
						style={commonStyles.inputBox2}
						placeholder="Enter your phone number"
						placeholderTextColor={colors.gray4}
						autoCapitalize="none"
						onChangeText={(text) =>
							setScheduleInput((prevState) => {
								return { ...prevState, phone: text };
							})
						}
					/>
				</View>
				<View style={{ marginTop: 48 }}>
					<BtnLarge title={"Confirm"} onPress={handleConfirmation} />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
