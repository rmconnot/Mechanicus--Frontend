import React, { useState } from "react";
import {
	View,
	Text,
	Button,
	StyleSheet,
	ScrollView,
	FlatList,
} from "react-native";
import { NavGroup } from "../../common/BottomNav";
import { QuoteProgress } from "../../common/Progress";
import { gql, useQuery } from "@apollo/client";
import { RadioButton } from "react-native-paper";
import { VehicleItem } from "../../common/vehicleCard";

const navOption = [
	{
		title: "Back",
		to: "TaskList",
	},
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
			# imgUrl
		}
	}
`;

/* <QuoteVehicleScreen> */
export default function QuoteVehicleScreen({ navigation, route }) {
	const { currentUser } = route.params;
	console.log("currentUser: ", currentUser);

	const [selectedVehicle, setSelectedVehicle] = useState();

	const { data, loading, error } = useQuery(VEHICLES_QUERY, {
		variables: {
			customerID: currentUser.id,
		},
	});

	const renderVehicleItem = ({ item }) => (
		<VehicleItem
			make={item.make}
			model={item.model}
			year={item.year}
			vin={item.vin}
			vehicleType={item.vehicleType}
			id={item.id}
		/>
	);

	console.log("data: ", data);

	return (
		<View style={styles.container}>
			<View>
				<QuoteProgress curStep={1} status={[false, false, false]} />
				<Text>quote: select vehicle</Text>
				{data != undefined && data.vehicles.length ? (
					<RadioButton.Group
						onValueChange={(newValue) => setSelectedVehicle(newValue)}
						value={selectedVehicle}
					>
						<FlatList
							data={data.vehicles}
							renderItem={renderVehicleItem}
							keyExtractor={(item) => item.id.toString()}
						/>
					</RadioButton.Group>
				) : null}
			</View>

			<NavGroup
				navigation={navigation}
				options={navOption}
				routeProps={Object.assign({}, currentUser, {
					selectedVehicle: selectedVehicle,
				})}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-between",
	},
});
