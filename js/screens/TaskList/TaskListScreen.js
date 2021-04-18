import React, { useState } from "react";
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
import { TaskCard, QuoteCard } from "../../common/Card";
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
			status
			quote{
				vehicle {
					id
					make
					model
					year
					imgUrl
				},
				services{
					type,
					price,
				}
			}
			mechanic{
				firstName
				lastName
				phone
			}
		}
	}
`;

const APPOINTMENTS_QUERY = gql`
	query($customerID: Int!) {
		appointments(customerID: $customerID) {
			id
			scheduleDate
			status
			quote{
				vehicle {
					id
					make
					model
					year
					imgUrl
				}
				services{
					type,
					price,
				}
			}
			mechanic{
				firstName
				lastName
				phone
			}
		}
	}
`;

const QUOTES_QUERY = gql`
	query($customerID: Int!) {
		quotes(customerID: $customerID) {
			id
			services {
				id
				type
				price
			}
			vehicle {
				id
				make
				model
				year
				vehicleType
				imgUrl
			}
			costEstimate
			createdAt
		}
	}
`;

const QUOTES_SUBSCRIPTION = gql`
	subscription($customerID: Int!) {
		newQuote(customerID: $customerID) {
			id
			services {
				id
				type
				price
			}
			vehicle {
				id
				make
				model
				year
				vehicleType
				imgUrl
			}
			costEstimate
			createdAt
		}
	}
`;

/* <TaskListScreen> */

export const TaskListScreen = ({ navigation, route }) => {
	const { currentUser } = route.params;
	console.log(currentUser);
	const [displayType, setDisplayType] = useState("task");
  
	const renderItemPresent = ({item}) => {
		return (
			<TaskCard item={item} navigation={navigation} route={route} to="TaskDetailPresent"/>
		);
	};

	const renderItemQuotes = ({item}) => {
		console.log('this is');
		return (
			<QuoteCard item={item} navigation={navigation} route={route} to="QuoteDetail"/>
		);
	}

	const { subscribeToMore, data, error, loading } = useQuery(
		APPOINTMENTS_QUERY,
		{
			variables: { customerID: currentUser.id },
			onError: (error) => console.log(JSON.stringify(error, null, 2)),
		}
	);

	const switchToTask = () => {
		setDisplayType("task");
		console.log(data.appointments);
	};

	const switchToQuote = () => {
		setDisplayType("quote");
		console.log(data.quotes);
	};

	const {
		subscribeToMore: subscribeToMoreQuotes,
		data: quoteData,
		error: quoteError,
		loading: quoteLoading,
	} = useQuery(QUOTES_QUERY, {
		variables: {
			customerID: currentUser.id,
		},
		onError: (error) => console.log(JSON.stringify(error, null, 2)),
	});

	if (quoteData) console.log("quoteData: ", quoteData);

	// if (data) console.log("data: ", data);
	if (loading) console.log("Loading...");
	if (error) console.error(`Error! ${error.message}`);

	subscribeToMoreQuotes({
		document: QUOTES_SUBSCRIPTION,
		variables: { customerID: currentUser.id },
		updateQuery: (prev, { subscriptionData }) => {
			const newQuote = subscriptionData.data.newQuote;
			console.log("newQuote: ", newQuote);
			if (!prev.quotes.find((quote) => quote.id === newQuote.id))
				return Object.assign(
					{},
					{
						quotes: [...prev.quotes, newQuote],
					}
				);
		},
	});

	subscribeToMore({
		document: APPOINTMENTS_SUBSCRIPTION,
		variables: { customerID: currentUser.id },
		updateQuery: (prev, { subscriptionData }) => {
			const newAppointment = subscriptionData.data.newAppointment;
			// console.log(newAppointment);
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
					<TouchableOpacity style={displayType == "task" ? styles.switchBtnActive : styles.switchBtn} onPress={switchToTask}>
						<Text style={displayType == "task" ? styles.tabActive : styles.tab}>Tasks</Text>
					</TouchableOpacity>
					<TouchableOpacity style={displayType == "quote" ? styles.switchBtnActive : styles.switchBtn} onPress={switchToQuote}>
					    <Text style={displayType == "quote" ? styles.tabActive : styles.tab}>Quotes</Text>
					</TouchableOpacity>
				</View>
				<Button
					title={"Get a Quote"}
					onPress={() =>
						navigation.navigate("QuoteVehicle", { currentUser: currentUser })
					}
				/>
				<View>
					<Text>{displayType == "task" ? "Appointments" : "Quotes"}</Text>
					{data ? (
						<FlatList data={displayType == "task" ? data.appointments : quoteData.quotes} renderItem={displayType == "task" ? renderItemPresent : renderItemQuotes} />
					) : (
						<Text>No upcoming appointments</Text>
					)}
				</View>
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
