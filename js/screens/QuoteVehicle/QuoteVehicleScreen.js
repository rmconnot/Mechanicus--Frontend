import React, { useState } from "react";
import {
	View,
	Text,
	Button,
	StyleSheet,
	ScrollView,
	FlatList,
	SafeAreaView,
	TouchableOpacity,
} from "react-native";
import { NavGroup } from "../../common/BottomNav";
import { QuoteProgress } from "../../common/Progress";
import { VehicleInfoCard } from "../../common/Card";
import { BtnDisplay } from "../../common/Buttons";
import { commonStyles, colors } from "../../common/Style";
import { Icon } from "../../common/Svg";
import { gql, useQuery } from "@apollo/client";
import { RadioButton } from "react-native-paper";
import { styles } from "./Styles";

const navOption = [
	{
		title: "Next",
		to: "QuoteService",
	},
];

const VEHICLES_QUERY = gql`
	query($customerID: Int!) {
		vehicles(customerID: $customerID) {
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

/* <QuoteVehicleScreen> */
export default function QuoteVehicleScreen({ navigation, route }) {
	const { currentUser } = route.params;
	console.log("Quote Vehicle route params:", route.params);
	const [selectedVehicle, setSelectedVehicle] = useState(
		route.params.selectedVehicle || ""
	);

	const { subscribeToMore, data, loading, error } = useQuery(VEHICLES_QUERY, {
		variables: { customerID: currentUser.id },
		onError: (error) => console.log(JSON.stringify(error, null, 2)),
	});

	if (data) console.log("data: ", data);

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

	const renderVehicleItem = ({ item }) => {
		return (
			<TouchableOpacity
				style={[
					styles.optionContainer,
					item.id == selectedVehicle ? commonStyles.shadowThemeFloat : "",
				]}
				onPress={() => setSelectedVehicle(item.id)}
			>
				<Icon
					name={
						item.id == selectedVehicle ? "radio_checked" : "radio_unchecked"
					}
					color={colors.primaryDark}
					size={24}
				/>
				<View style={styles.vehicleContainer}>
					<VehicleInfoCard item={item} />
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<SafeAreaView style={commonStyles.container}>
			<View style={commonStyles.pageContainer}>
				<QuoteProgress curStep={1} status={[true, false, false]} />
				<BtnDisplay
					title="New Vechicle"
					icon="add"
					left={true}
					onPress={() => navigation.navigate("AddVehicleManual", route.params)}
				/>
				{data != undefined ? (
					<FlatList
						data={data.vehicles}
						renderItem={renderVehicleItem}
						keyExtractor={(item) => item.id.toString()}
					/>
				) : (
					<Text>No vehicles</Text>
				)}
			</View>

			<NavGroup
				navigation={navigation}
				options={navOption}
				routeProps={Object.assign({}, route.params, {
					selectedVehicle: selectedVehicle,
				})}
				disabled={selectedVehicle == ""}
			/>
		</SafeAreaView>
	);
}
