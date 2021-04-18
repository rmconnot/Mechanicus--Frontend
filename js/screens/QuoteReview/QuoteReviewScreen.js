import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { NavGroup } from "../../common/BottomNav";
import { QuoteProgress } from "../../common/Progress";
import { ServiceInfoCard, VehicleCard, VehicleInfoCard } from "../../common/Card";
import { FlatList } from "react-native-gesture-handler";
import { render } from "react-dom";
import { styles } from "./Styles";
import { useQuery, gql, useMutation } from "@apollo/client";
import { VehicleItem } from "../../common/vehicleCard";
import { colors, commonStyles } from "../../common/Style";
import {  BtnLarge, BtnBare } from "../../common/Buttons";

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
	const sectionTitleStyle = [commonStyles.body, {color: colors.gray3}];
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

	let servicesArray = [];

	if (servicesData) {
		for (let service of servicesData.services) {
			servicesArray.push(service.id);
		}
		// console.log("servicesArray: ", servicesArray);
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
			<View style={commonStyles.pageContainer}>
				<QuoteProgress curStep={3} status={[true, true, true]} />
				<View style={styles.content}>
					<View style={styles.row}>
						<Text style={sectionTitleStyle}>Vehicle</Text>
						<BtnBare onPress={() => navigation.navigate(
							"QuoteVehicle", route
							)}/>
					</View>
					<VehicleInfoCard item={ vehicleData? vehicleData.vehicle : "" }/>
					
					<View style={styles.row}>
						<Text style={sectionTitleStyle}>Service</Text>
						<BtnBare onPress={() => navigation.navigate(
							"QuoteService", route
							)}/>
					</View>
					<ServiceInfoCard item={ servicesData? servicesData.services : "" }/>
				</View>
				
				<BtnLarge title={"confirm & schedule"} onPress={saveQuote} />
			</View>
		</View>
	);
}
