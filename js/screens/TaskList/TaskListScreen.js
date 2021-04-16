import React from "react";
import {
	View,
	Text,
	Button,
	TouchableOpacity,
	FlatList,
	SafeAreaView,
} from "react-native";
import BottomNav from "../../common/BottomNav";
import { gql, useQuery } from "@apollo/client";
import { TaskCard } from "../../common/Card";
import { styles } from "./Styles";

const sampleQuotes = [
	{
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
		mechanician: {
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
		mechanicianID: {
			firstName: "Bill",
			lastName: "Davis",
			phone: "123-456-7890",
		},
		vehicleID: {
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

const APPOINTMENTS_SUBSCRIPTION = gql`
	subscription($customerID: Int!) {
		newAppointment(customerID: $customerID) {
			id
			scheduleDate
			vehicle {
				id
				make
				model
				year
			}
		}
	}
`;

const APPOINTMENTS_QUERY = gql`
	query($customerID: Int!) {
		appointments(customerID: $customerID) {
			id
			scheduleDate
			vehicle {
				id
				make
				model
				year
			}
			#mechanicID
			#scheduleDate
			#service?
		}
	}
`;

/* <TaskListScreen> */

export const TaskListScreen = ({ navigation, route }) => {
	const { currentUser } = route.params;
	// console.log(currentUser);

	// const renderItemPast = ({ item }) => {
	// 	return (
	// 		<TaskCard
	// 			item={item}
	// 			navigation={navigation}
	// 			to="TaskDetailPast"
	// 			currentUser={currentUser}
	// 		/>
	// 	);
	// };
	// const renderItemPresent = ({ item }) => {
	// 	return (
	// 		<TaskCard
	// 			item={item}
	// 			navigation={navigation}
	// 			to="TaskDetailPresent"
	// 			currentUser={currentUser}
	// 		/>
	// 	);
	// };

	const { subscribeToMore, data, error, loading } = useQuery(
		APPOINTMENTS_QUERY,
		{
			variables: { customerID: currentUser.id },
			onError: (error) => console.log(JSON.stringify(error, null, 2)),
		}
	);

	if (loading) console.log("Loading...");
	if (error) console.error(`Error! ${error.message}`);

	subscribeToMore({
		document: APPOINTMENTS_SUBSCRIPTION,
		variables: { customerID: currentUser.id },
		updateQuery: (prev, { subscriptionData }) => {
			const newAppointment = subscriptionData.data.newAppointment;
			if (
				!prev.appointments.find(
					(appointment) => appointment.id === newAppointment.id
				)
			)
				return Object.assign(
					{},
					{
						appointments: [...prev.appointments, newAppointment],
					}
				);
		},
	});

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.main}>
				<View style={styles.tabContainer}>
					<Text style={styles.tab}>Tasks</Text>
					<Text style={styles.tab}>Quotes</Text>
				</View>
				<Button
					title={"Get a Quote"}
					onPress={() =>
						navigation.navigate("QuoteVehicle", { currentUser: currentUser })
					}
				/>
				{/* <View>
					<Text>Upcoming appointments</Text>
					{data ? (
						<FlatList data={data.appointments} renderItem={renderItemPresent} />
					) : (
						<Text>No upcoming appointments</Text>
					)}
				</View>
				<View>
					<Text>Past appointments</Text>
					<Text>March</Text>
					{data ? (
						<FlatList data={data.appointments} renderItem={renderItemPast} />
					) : (
						<Text>No upcoming appointments</Text>
					)}
				</View> */}
			</View>
			<BottomNav navigation={navigation} activated = "Task" />
		</SafeAreaView>
	);
};

// const smapleTasksList = [{
//     id:'1',
//     make:'Honda',
//     model:'CR-V',
//     year:"2019",
//     scheduleDate: '3/3/2021 12:30pm',
//     mechanician:'XXX XXX',
//     phone: '123-456-7890',
//     service: {
//         serviceOne: 'vehicle inspection',
//         serviceOnePrice: '$$$',
//         serviceTwo: 'oil Change',
//         serviceTwoPrice: '$$$'
//     },
//     imageURL:'https://cka-dash.s3.amazonaws.com/131-1018-WTS230/mainimage.jpg'
// },
// {
//     id: '2',
//     make:'Toyota',
//     model:'Highlander',
//     year:"2021",
//     scheduleDate: '4/3/2021 13:20pm',
//     mechanician:'XXX XXX',
//     phone: '123-456-7890',
//     service: {
//         serviceOne: 'brake repaire',
//         serviceOnePrice: '$$$',
//         serviceTwo: 'oil Change',
//         serviceTwoPrice: '$$$'
//     },
//     imageURL: 'https://www.motortrend.com/uploads/sites/5/2020/11/2021-Toyota-Highlander-XSE-30.jpg'
// }];
