import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { NavGroup } from "../../common/BottomNav";
import { QuoteProgress } from "../../common/Progress";
import { VehicleCard } from "../../common/Card";
import { FlatList } from "react-native-gesture-handler";
import { render } from "react-dom";
import { styles } from "./Styles";
import { useQuery, gql, useMutation } from "@apollo/client";
import { VehicleItem } from "../../common/vehicleCard";

const navOption = [
	{
		title: "Cancel",
		to: "QuoteService",
	},
	{
		title: "Schedule",
		to: "Schedule",
	},
];

const sampleServiceList = [
	{
		id: "01",
		text: "Vehicle Inspection",
		price: 123,
	},
	{
		id: "02",
		text: "Oil change",
		price: 123,
	},
	{
		id: "03",
		text: "Brake repair",
		price: 123,
	},
];

const VEHICLE_QUERY = gql`
	query($vehicleID: Int!) {
		vehicle(id: $vehicleID) {
			id
			vin
			vehicleType
			year
			make
			model
		}
	}
`;

const SERVICES_QUERY = gql`
	query($servicesList: [Int]) {
		services(servicesList: $servicesList) {
			id
			type
			price
		}
	}
`;

const QUOTE_MUTATION = gql`
	mutation(
		$costEstimate: Float!
		$customerID: Int!
		$status: String!
		$vehicleID: Int!
		$services: [Int]!
	) {
		createQuote(
			costEstimate: $costEstimate
			customerID: $customerID
			status: $status
			vehicleID: $vehicleID
			services: $services
		) {
			id
		}
	}
`;

function ServiceEntry({ text, price }) {
	return (
		<View style={styles.row}>
			<Text>{text}</Text>
			<Text>$ {price}</Text>
		</View>
	);
}
/* <QuoteReviewScreen> */
export default function QuoteReviewScreen({ navigation, route }) {
	// console.log(" QuoteReview route params: ", route.params);

	const [quoteID, setQuoteID] = useState(null);

	const {
		data: servicesData,
		loading: servicesLoading,
		error: servicesError,
	} = useQuery(SERVICES_QUERY, {
		variables: {
			servicesList: route.params.selectedServices,
		},
	});

	const {
		data: vehicleData,
		loading: vehicleLoading,
		error: vehicleError,
	} = useQuery(VEHICLE_QUERY, {
		variables: {
			vehicleID: route.params.selectedVehicle,
		},
	});

	const [createQuote, { data: quoteData, error }] = useMutation(QUOTE_MUTATION);

	if (error) {
		console.error(error.message);
	}

	const renderItem = (item) => {
		return <ServiceEntry text={item.item.type} price={item.item.price} />;
	};

	let sum = 0; //total price

	if (servicesData) {
		for (let service of servicesData.services) {
			sum = sum + service.price;
		}
	}

	const renderVehicleItem = () => {
		if (vehicleData) {
			return (
				<VehicleItem
					make={vehicleData.vehicle.make}
					model={vehicleData.vehicle.model}
					year={vehicleData.vehicle.year}
					vin={vehicleData.vehicle.vin}
					vehicleType={vehicleData.vehicle.vehicleType}
					id={vehicleData.vehicle.id}
				/>
			);
		} else {
			return <Text>No vehicle</Text>;
		}
	};

	let servicesArray = [];

	if (servicesData) {
		for (let service of servicesData.services) {
			servicesArray.push(service.id);
		}
		console.log("servicesArray: ", servicesArray);
	}

	const saveQuote = async () => {
		await createQuote({
			variables: {
				costEstimate: sum,
				customerID: route.params.id,
				status: "quote",
				vehicleID: vehicleData.vehicle.id,
				services: servicesArray,
			},
		}).then((result) => {
			setQuoteID(result.data.createQuote.id);
		});
	};

	return (
		<View style={styles.container}>
			<View>
				<QuoteProgress curStep={3} status={[true, true, false]} />
				<View>
					<Text>Vehicle</Text>
					{renderVehicleItem()}
				</View>
				<View>
					<Text>Service</Text>
					{servicesData ? (
						<FlatList
							data={servicesData.services}
							renderItem={renderItem}
							keyExtractor={(item) => item.id.toString()}
						/>
					) : (
						<Text>No services selected</Text>
					)}

					<View>
						<Text>Total price:{sum}</Text>
					</View>
				</View>
				<View>
					<TouchableOpacity onPress={saveQuote}>
						<Text>Save Quote</Text>
					</TouchableOpacity>
				</View>
			</View>
			<NavGroup
				navigation={navigation}
				options={navOption}
				routeProps={Object.assign({}, vehicleData, servicesData, {
					currentUser: route.params.id,
					quoteID: quoteID,
				})}
				callbackFunction={saveQuote}
			/>
		</View>
	);
}
