import React, { useState } from "react";
import {
	TextInput,
	Text,
	View,
	FlatList,
	TouchableOpacity,
	Alert,
	SafeAreaView,
} from "react-native";
import { commonStyles } from "../../common/Style";
import BottomNav from "../../common/BottomNav";
import { TopNavBar } from "../../common/TopNav";
import { VehicleCard } from "../../common/Card";
import { BtnDisplay } from "../../common/Buttons";
import { styles } from "./Styles";
import { gql, useQuery } from "@apollo/client";

const VEHICLES_QUERY = gql`
	query($customerID: Int!) {
		vehicles(customerID: $customerID) {
			id
			year
			make
			model
			imgUrl
		}
	}
`;

const VEHICLES_SUBSCRIPTION = gql`
	subscription($customerID: Int!) {
		newVehicle(customerID: $customerID) {
			id
			vin
			vehicleType
			year
			make
			model
			imgUrl
		}
	}
`;

const sampleVehicle = [
	{
		id: 1,
		make: "Honda",
		model: "CR-V",
		year: "2019",
		imgUrl: "https://cka-dash.s3.amazonaws.com/131-1018-WTS230/mainimage.jpg",
	},
	{
		id: 2,
		make: "Toyota",
		model: "Highlander",
		year: "2021",
		imgUrl:
			"https://www.motortrend.com/uploads/sites/5/2020/11/2021-Toyota-Highlander-XSE-30.jpg",
	},
];

export const VehicleListScreen = ({ navigation, route }) => {
	const { currentUser } = route.params;
	const { subscribeToMore, data, error, loading } = useQuery(VEHICLES_QUERY, {
		variables: { customerID: currentUser.id },
		onError: (error) => console.log(JSON.stringify(error, null, 2)),
	});

	subscribeToMore({
		document: VEHICLES_SUBSCRIPTION,
		variables: { customerID: currentUser.id },
		updateQuery: (prev, { subscriptionData }) => {
			const newVehicle = subscriptionData.data.newVehicle;
			if (!prev.vehicles.find((vehicle) => vehicle.id === newVehicle.id))
				return Object.assign(
					{},
					{
						vehicles: [...prev.vehicles, newVehicle],
					}
				);
		},
	});

	const renderItem = ({ item }) => {
		return <VehicleCard item={item} navigation={navigation} route={route} />;
	};

	return (
		<SafeAreaView style={commonStyles.container}>
			<TopNavBar title="My Vehicles" plain={true} />
			<View style={[commonStyles.pageContainer, { flex: 1 }]}>
				<BtnDisplay
					title="New Vechicle"
					icon="add"
					left={true}
					onPress={() =>
						navigation.navigate("AddVehicleManual", { ...route.params })
					}
				/>
				<FlatList
					data={data ? data.vehicles : []}
					renderItem={renderItem}
					keyExtractor={(item) => item.id.toString()}
				/>
			</View>
			<BottomNav
				navigation={navigation}
				routeProps={route}
				activated="My Vehicles"
			/>
		</SafeAreaView>
	);
};
