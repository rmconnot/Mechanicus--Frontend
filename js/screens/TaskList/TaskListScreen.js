import React, { useState } from "react";
import {
	View,
	Text,
	Button,
	TouchableOpacity,
	FlatList,
	SafeAreaView,
	ScrollView,
} from "react-native";
import BottomNav from "../../common/BottomNav";
import { gql, useQuery } from "@apollo/client";
import { TaskCard, QuoteCard } from "../../common/Card";
import { styles } from "./Styles";
import { commonStyles } from "../../common/Style";
import { BtnDisplay } from "../../common/Buttons";
import TopNav, { TaskTop } from "../../common/TopNav";

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
			quote {
				vehicle {
					id
					vin
					make
					model
					year
					imgUrl
				}
				services {
					id
					type
					price
				}
			}
			mechanic {
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
			quote {
				vehicle {
					id
					vin
					make
					model
					year
					imgUrl
				}
				services {
					id
					type
					price
				}
			}
			mechanic {
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
				vin
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
				vin
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
	console.log(route.params);
	const [displayType, setDisplayType] = useState("appointments");

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
		variables: { customerID: currentUser.id },
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

	const renderItemPresent = ({ item }) => {
		return (
			<TaskCard
				item={item}
				navigation={navigation}
				route={route}
				to="TaskDetailPresent"
			/>
		);
	};

	const renderItemQuotes = ({ item }) => {
		return (
			<QuoteCard
				item={item}
				navigation={navigation}
				route={route}
				to="QuoteDetail"
			/>
		);
	};

	return (
		<SafeAreaView style={commonStyles.container}>
			<View style={{ flex: 1 }}>
				<TaskTop activated={displayType} handleStatus={setDisplayType} />
				<View style={commonStyles.pageContainer}>
					<FlatList
						ListHeaderComponent={
							<BtnDisplay
								onPress={() =>
									navigation.navigate("QuoteVehicle", {
										currentUser: currentUser,
									})
								}
							/>
						}
						ListFooterComponent={<View style={commonStyles.blankFooter}></View>}
						ListEmptyComponent={<Text>No upcoming appointments</Text>}
						data={
							displayType == "appointments"
								? data
									? data.appointments
									: ""
								: quoteData
								? quoteData.quotes
								: ""
						}
						renderItem={
							displayType == "appointments"
								? renderItemPresent
								: renderItemQuotes
						}
						keyExtractor={(item) => item.id.toString()}
					/>
				</View>
			</View>
			<BottomNav
				style={{ flex: 0.1 }}
				navigation={navigation}
				routeProps={route}
				activated="Home"
			/>
		</SafeAreaView>
	);
};
