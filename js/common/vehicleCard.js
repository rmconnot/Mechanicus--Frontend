import * as React from "react";
import { View, StyleSheet } from "react-native";
import { RadioButton, Text } from "react-native-paper";

export const VehicleItem = ({ make, model, year, vin, vehicleType, id }) => (
	<View style={styles.radioButtonContainer}>
		<RadioButton value={id} />
		<View>
			<Text>
				{make}, {model}, {year}
			</Text>
			<Text>{vehicleType}</Text>
			<Text>{vin}</Text>
		</View>
	</View>
);

const styles = StyleSheet.create({
	radioButtonContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderStyle: "solid",
		borderWidth: 0.5,
	},
});
