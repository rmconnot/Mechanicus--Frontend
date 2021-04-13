import * as React from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";


function TabNav({
	navigation,
	to,
	title = "next",
	active = true,
	data = {},
}){

	return (
		<View style={styles.bottomNav}>
			<Button
				style={styles.navBtn}
				title={title}
				onPress={() => navigation.navigate(to, data)}
			/>
		</View>
	);
}

export function NavGroup({
	navigation,
	options = [
		{ title: "Task", to: "TaskList", data: {} },
		{ title: "Garage", to: "VehicleList", data: {} },
	],
	data,
}) {
	const navigate = navigation.navigate;
	return (
		<View style={styles.navGroupContainer}>
			<TabNav
				style={styles.navGroupItem}
				title={options[0].title}
				to={options[0].to}
				navigation={navigation}
				data={data}
			/>
			<TabNav
				style={styles.navGroupItem}
				title={options[1].title}
				to={options[1].to}
				navigation={navigation}
				data={data}
			/>
		</View>
	);
}

/* <BottomNav> */
export default function BottomNav({ navigation }) {
	return (
		<View style={styles.container}>
			<TabNav title="Task" to="TaskList" navigate={navigate} />
			<TabNav title="My Vehicles" to="VehicleList" navigate={navigate} />
			<TabNav title="Profile" to="Profile" navigate={navigate} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "row",
		elevation: 8,
	},
	spaceBetween: {
		justifyContent: "space-between",
	},
	bottomNav: {
		flex: 1 / 3,
	},
	navBtn: {
		alignSelf: "stretch",
		backgroundColor: "#E0E0E0",
	},
	navGroupContainer: {
		width: "100%",
		flexDirection: "row",
		padding: 16,
		justifyContent: "space-between",
	},
	navGroupItem: {
		width: "30%",
	},
});
