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
import { commonStyles, colors } from '../../common/Style';
import { Icon } from '../../common/Svg';
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

/* <QuoteVehicleScreen> */
export default function QuoteVehicleScreen({ navigation, route }) {
	const { currentUser } = route.params;
	console.log(route.params);
	const [selectedVehicle, setSelectedVehicle] = useState(route.params.selectedVehicle || "");

	const { data, loading, error } = useQuery(
		VEHICLES_QUERY, 
		{	
			variables: {customerID: currentUser.id,},
			onError: (error) => console.log(JSON.stringify(error, null, 2)),
		}
	);

	const renderVehicleItem = ({ item }) => {
		return (
		<TouchableOpacity
		style = {[
			styles.optionContainer,
			item.id==selectedVehicle? commonStyles.shadowThemeFloat:""]}
		onPress = { () => setSelectedVehicle(item.id) }
		>
			<Icon name={item.id==selectedVehicle? "radio_checked":"radio_unchecked"} color={colors.primaryDark} size={24}/>
			<View style={styles.vehicleContainer}>
				<VehicleInfoCard item={item}/>
			</View>
		</TouchableOpacity>
		);
	};

	return (
		<SafeAreaView style={commonStyles.container}>
			<View style={commonStyles.pageContainer}>
				<QuoteProgress curStep={1} status={[true, false, false]} />
				<BtnDisplay title="New Vechicle" icon="add" left={true} onPress={
                    () => navigation.navigate("AddVehicleManual",{...route})
                }/>
				<FlatList
					data={data? data.vehicles:[]}
					renderItem={renderVehicleItem}
					keyExtractor={(item) => item.id.toString()}
				/>
			</View>

			<NavGroup
				navigation={navigation}
				options={navOption}
				routeProps={{
					...route.params,
					selectedVehicle: selectedVehicle,
				}}
				disabled={ selectedVehicle == "" }
			/>
		</SafeAreaView>
	);
}
