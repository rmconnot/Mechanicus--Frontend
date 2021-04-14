import * as React from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";

<<<<<<< HEAD
class TabNav extends React.Component {
	props: {
		to: string,
		title: String,
		navigate: () => mixed,
		active: Boolean, //check if tab is activated
		routeProps: Object,
	};

	render() {
		let to = this.props.to;
		console.log("TabNav routeProps: ", this.props.routeProps);
		return (
			<View style={styles.bottomNav}>
				<Button
					style={[styles.navBtn, this.props.active?styles.activeBtn:""]}
					title={this.props.title}
					onPress={() =>
						this.props.navigate(
							to,
							this.props.routeProps ? this.props.routeProps : null
						)
					}
				/>
			</View>
		);
	}
=======

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
>>>>>>> 45a3593e9a5317e669eece5071dc8c3753092d3d
}

export function NavGroup({
	navigation,
	options = [
		{ title: "Task", to: "TaskList", data: {} },
		{ title: "Garage", to: "VehicleList", data: {} },
	],
<<<<<<< HEAD
	routeProps,
=======
	data,
>>>>>>> 45a3593e9a5317e669eece5071dc8c3753092d3d
}) {
	const navigate = navigation.navigate;
	return (
		<View style={styles.navGroupContainer}>
			<TabNav
				style={styles.navGroupItem}
				title={options[0].title}
				to={options[0].to}
<<<<<<< HEAD
				navigate={navigate}
				routeProps={routeProps}
=======
				navigation={navigation}
				data={data}
>>>>>>> 45a3593e9a5317e669eece5071dc8c3753092d3d
			/>
			<TabNav
				style={styles.navGroupItem}
				title={options[1].title}
				to={options[1].to}
<<<<<<< HEAD
				navigate={navigate}
				routeProps={routeProps}
=======
				navigation={navigation}
				data={data}
>>>>>>> 45a3593e9a5317e669eece5071dc8c3753092d3d
			/>
		</View>
	);
}

/* <BottomNav> */
<<<<<<< HEAD
export default function BottomNav({ 
	navigation, 
	activated = "Task"
}) {
	let navigate = navigation.navigate;
	return (
		<View style={styles.container}>
			<TabNav title="Task" to="TaskList" navigate={navigate} active={activated=="Tasks"}/>
			<TabNav title="My Vehicles" to="VehicleList" navigate={navigate}  active={activated=="Vehicles"}/>
			<TabNav title="Profile" to="Profile" navigate={navigate}  active={activated=="Profile"}/>
=======
export default function BottomNav({ navigation }) {
	return (
		<View style={styles.container}>
			<TabNav title="Task" to="TaskList" navigate={navigate} />
			<TabNav title="My Vehicles" to="VehicleList" navigate={navigate} />
			<TabNav title="Profile" to="Profile" navigate={navigate} />
>>>>>>> 45a3593e9a5317e669eece5071dc8c3753092d3d
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
