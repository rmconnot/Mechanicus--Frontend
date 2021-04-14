import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { NavGroup } from "../../common/BottomNav";
import { QuoteProgress } from "../../common/Progress";
import { VehicleCard } from "../../common/Card";
import { FlatList } from "react-native-gesture-handler";
import { render } from "react-dom";
import { styles } from "./Styles";
import { useQuery, gql } from "@apollo/client";
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

function ServiceEntry({ text = "service diaplay name", price = 123.0 }) {
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

	const renderItem = (item) => {
		return <ServiceEntry text={item.text} price={item.price} />;
	};

	let sum = 0; //total price

	if (servicesData) {
		for (let service of servicesData.services) {
			sum = sum + service.price;
		}
	}

	return (
		<View style={styles.container}>
			<View>
				<QuoteProgress curStep={3} status={[true, true, false]} />
				<View>
					<Text>Vehicle</Text>
					<VehicleItem
						make={vehicleData.vehicle.make}
						model={vehicleData.vehicle.model}
						year={vehicleData.vehicle.year}
						vin={vehicleData.vehicle.vin}
						vehicleType={vehicleData.vehicle.vehicleType}
						id={vehicleData.vehicle.id}
					/>
				</View>
				<View>
					<Text>Service</Text>
					<FlatList
						data={servicesData.services}
						renderItem={renderItem}
						keyExtractor={(item) => item.id}
					/>
					<View>
						<Text>Total price:{sum}</Text>
					</View>
				</View>
			</View>
			<NavGroup navigation={navigation} options={navOption} />
		</View>
	);
}
