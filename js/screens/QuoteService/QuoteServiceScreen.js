import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	Button,
	StyleSheet,
	Alert,
	SafeAreaView,
} from "react-native";
import { CheckboxGroup } from "../../common/Form";
import { NavGroup } from "../../common/BottomNav";
import { QuoteProgress } from "../../common/Progress";
import { gql, useQuery } from "@apollo/client";
import { TabRouter } from "@react-navigation/routers";

const SERVICES_QUERY = gql`
	query {
		services {
			id
			type
			price
		}
	}
`;

const navOption = [
	{
		title: "Back",
		to: "QuoteVehicle",
	},
	{
		title: "Next",
		to: "QuoteReview",
	},
];
const emptyServiceList = [
	{
		id: "01",
		type: "",
		price: 0,
	},
];

/* <QuoteServiceScreen> */
export default function QuoteServiceScreen({ navigation, route }) {
	// console.log("route params: ", route.params);
	const { currentUser } = route.params;
	const { data, error, loading } = useQuery(SERVICES_QUERY);

	const [selectedServices, setSelectedServices] = useState(
		route.params.selectedServices || []
	);

	if (error) {
		Alert.alert("Error!", error.message, [{ text: "OK", style: "OK" }]);
	}

	const handleCheckedServices = (servicesList) => {
		setSelectedServices(servicesList);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View>
				<QuoteProgress curStep={2} status={[true, true, false]} />
				<CheckboxGroup
					initSelections={selectedServices}
					options={data ? data.services : emptyServiceList}
					handleCheckedServices={handleCheckedServices}
				/>
			</View>

			<NavGroup
				navigation={navigation}
				options={navOption}
				routeProps={{
					...route.params,
					selectedServices: selectedServices,
				}}
				disabled={selectedServices.length == 0}
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
