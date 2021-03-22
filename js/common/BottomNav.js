import * as React from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";

class TabNav extends React.Component {
	props: {
		to: string,
		title: String,
		navigate: () => mixed,
		active: string, //check if tab is activated
	};

	render() {
		let to = this.props.to;
		return (
			<View style={styles.bottomNav}>
				<Button
					style={styles.navBtn}
					title={this.props.title}
					onPress={() => this.props.navigate(to)}
				/>
			</View>
		);
	}
}

export function NavGroup({
	navigation,
	options = [
		{ title: "Task", to: "TaskList" },
		{ title: "Garage", to: "VehicleList" },
	],
}) {
	const navigate = navigation.navigate;
	return (
		<View style={styles.navGroupContainer}>
			<TabNav
				style={styles.navGroupItem}
				title={options[0].title}
				to={options[0].to}
				navigate={navigate}
			/>
			<TabNav
				style={styles.navGroupItem}
				title={options[1].title}
				to={options[1].to}
				navigate={navigate}
			/>
		</View>
	);
}

/* <BottomNav> */
export default function BottomNav({ navigation }) {
	let navigate = navigation.navigate;
	return (
		<View style={styles.container}>
			<TabNav title="Task" to="TaskList" navigate={navigate} />
			<TabNav title="Garage" to="VehicleList" navigate={navigate} />
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
