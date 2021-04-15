import * as React from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";

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
}

export function NavGroup({
	navigation,
	options = [
		{ title: "Task", to: "TaskList", data: {} },
		{ title: "Garage", to: "VehicleList", data: {} },
	],
	routeProps,
}) {
	const navigate = navigation.navigate;
	return (
		<View style={styles.navGroupContainer}>
			<TabNav
				style={styles.navGroupItem}
				title={options[0].title}
				to={options[0].to}
				navigate={navigate}
				routeProps={routeProps}
			/>
			<TabNav
				style={styles.navGroupItem}
				title={options[1].title}
				to={options[1].to}
				navigate={navigate}
				routeProps={routeProps}
			/>
		</View>
	);
}

/* <BottomNav> */
export default function BottomNav({ 
	navigation, 
	activated = "Task",
	routeProps
}) {
	const navigate = navigation.navigate;
	return (
		<View style={styles.container}>
			<TabNav 
			title="Task" 
			to="TaskList" 
			navigate={navigate} 
			active={activated=="Tasks"}
			routeProps={routeProps}
			/>
			<TabNav 
			title="My Vehicles" 
			to="VehicleList" 
			navigate={navigate}  
			active={activated=="Vehicles"}
			routeProps={routeProps}
			/>
			<TabNav 
			title="Profile" 
			to="Profile" 
			navigate={navigate}  
			active={activated=="Profile"}
			routeProps={routeProps}
			/>
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
