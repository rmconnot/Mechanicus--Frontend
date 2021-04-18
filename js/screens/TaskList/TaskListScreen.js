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
import { commonStyles } from "../../common/Style";

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
			quote {
				services {
					id
					type
				}
				vehicle {
					id
					make
					model
					year
					vehicleType
				}
			}
		}
	}
`;

const APPOINTMENTS_QUERY = gql`
	query($customerID: Int!) {
		appointments(customerID: $customerID) {
			id
			scheduleDate
			quote {
				services {
					id
					type
				}
				vehicle {
					id
					make
					model
					year
					vehicleType
				}
			}
			#mechanicID
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
			}
			vehicle {
				id
				make
				model
				year
				vehicleType
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
			}
			vehicle {
				id
				make
				model
				year
				vehicleType
			}
			costEstimate
			createdAt
		}
	}
`;

/* <TaskListScreen> */

export const TaskListScreen = ({ navigation, route }) => {
	const { currentUser } = route.params;
	// console.log(currentUser);

	/////  !!!------------ I think we will need to pass the current user's ID as a route param for the taskCards  -----------------!!! //////////

	const renderItemPast = ({ item }) => {
		return <TaskCard item={item} navigation={navigation} to="TaskDetailPast" />;
	};
	const renderItemPresent = ({ item }) => {
		return (
			<TaskCard item={item} navigation={navigation} to="TaskDetailPresent" />
		);
	};

	const { subscribeToMore, data, error, loading } = useQuery(
		APPOINTMENTS_QUERY,
		{
			variables: { customerID: currentUser.id },
			onError: (error) => console.log(JSON.stringify(error, null, 2)),
		}
	);

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
		<SafeAreaView style={commonStyles.container}>
			<View style={commonStyles.pageContainer}>
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
				<View>
					<Text>Upcoming appointments</Text>
					<FlatList 
					data={data? data.appointments:[]} 
					renderItem={renderItemPresent}
					keyExtractor={(item) => item.id.toString()} 
					/>
				</View>
			</View>
			<BottomNav navigation={navigation} routeProps={route} activated = "Home" />
		</SafeAreaView>
	);
};
