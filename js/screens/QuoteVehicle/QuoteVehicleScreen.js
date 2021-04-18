import React, { useState } from "react";
import {
	View,
	Text,
	Button,
	StyleSheet,
	ScrollView,
	FlatList,
	SafeAreaView,
} from "react-native";
import { NavGroup } from "../../common/BottomNav";
import { QuoteProgress } from "../../common/Progress";
import { VehicleInfoCard } from "../../common/Card";
import { BtnDisplay } from "../../common/Buttons";
import { commonStyles } from '../../common/Style';
import { gql, useQuery } from "@apollo/client";
import { RadioButton } from "react-native-paper";


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

	const [selectedVehicle, setSelectedVehicle] = useState();

	const { data, loading, error } = useQuery(
		VEHICLES_QUERY, 
		{	
			variables: {customerID: currentUser.id,},
			onError: (error) => console.log(JSON.stringify(error, null, 2)),
		}
	);

	const renderVehicleItem = ({ item }) => (
		<VehicleInfoCard item={item}/>
	);

	return (
		<SafeAreaView style={commonStyles.container}>
			<View style={commonStyles.pageContainer}>
				<QuoteProgress curStep={1} status={[true, false, false]} />
				<Text>quote: select vehicle</Text>
				<BtnDisplay title="New Vechicle" icon="add" left={true} onPress={
                    () => navigation.navigate("AddVehicleManual",{...route})
                }/>
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
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-between",
	},
});
