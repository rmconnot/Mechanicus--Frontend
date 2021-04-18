import * as React from "react";
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import {colors, fonts, commonStyles} from './Style';
import ImageSrcs from './Images';
import { BtnLarge } from './Buttons';


const BtmNavOptions = [
	{ title: "Home", screen: "TaskList", icon: "home" },
	{ title: "My Vehicles", screen: "VehicleList", icon: "vehicle" },
	{ title: "Account", screen: "Profile", icon: "account" },
];

export function NavGroup({
	navigation,
	options = [
		{ title: "Back", to: "TaskList", data: {}, disabled: false },
		{ title: "Next", to: "VehicleList", data: {}, disabled: false },
	],
	routeProps,
	callbackFunction = null,
}) {
	const navigate = navigation.navigate;
	const onPress = async () => {
		if (callbackFunction) {
			await callbackFunction();
		}
		navigation.navigate(
			to,
			routeProps ? routeProps : null
		);
	};
	// console.log("callbackFunction: ", callbackFunction);
	return (
		<View style={styles.navGroupContainer}>
			<View style={styles.navGroupItem}>
				<BtnLarge
					title = {options[0].title}
					sub = {options[0].title == "Back"}
					onPress = {() =>
						navigation.navigate(
							options[0].to,
							routeProps ? routeProps : null
						)}
				/>
			</View>
			<View style={styles.navGroupItem}>
				<BtnLarge
					style={styles.navGroupItem}
					title={options[1].title}
					onPress={() =>
						navigation.navigate(
							options[1].to,
							routeProps ? routeProps : null
						)}
					disabled={options[1].disabled}
				/>
			</View>
		</View>
	);
}

/* < NavItem /> */
//BottomNav's Child Component
const NavItem = ({
	active,
	title,
	icon, //name of icon
	to, //screen name
	navigation,
	routeProps,
}) => {
	let statusColor = active ? colors.primaryDark : colors.gray3;
	return (
		<TouchableOpacity
			style={styles.navItemContainer}
			onPress={() => navigation.navigate(to, routeProps ? routeProps : null)}
		>
			<Icon name={icon} size={24} color={statusColor} />
			<Text
				style={[
					commonStyles.note,
					{
						marginTop: 4,
						color: statusColor,
					},
				]}
			>
				{title}
			</Text>
		</TouchableOpacity>
	);
};
/* <BottomNav> */
export default function BottomNav({ 
	navigation, 
	activated = "Task",
	routeProps
}) {
	const navigate = navigation.navigate;
	return (
		<View style={styles.container}>
			<TabNav title="Task" to="TaskList" navigate={navigate} active={activated=="Task"} routeProps={routeProps}/>
			<TabNav title="My Vehicles" to="VehicleList" navigate={navigate}  active={activated=="Vehicles"} routeProps={routeProps}/>
			<TabNav title="Profile" to="Profile" navigate={navigate}  active={activated=="Profile"} routeProps={routeProps}/>
		</View>
	);
}

const styles = StyleSheet.create({
	BtmNavContainer: {
		flexDirection: "row",
		backgroundColor: "white",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		marginBottom: -30
	},
	spaceBetween: {
		justifyContent: "space-between",
	},
	bottomNav: {
		flex: 1 / 3,
		alignItems: 'center',
		paddingVertical: 30,
	},
	activeBtn: {
		color: colors.primaryDark,
		fontSize: fonts.note
	},
	inactiveBtn: {
		color: colors.gray3,
		fontSize: fonts.note
	},
	navGroupContainer: {
		backgroundColor: "white",
		flexDirection: "row",
		paddingHorizontal: 16,
		paddingBottom: 32,
		paddingTop: 12,
		justifyContent: "space-between",
		borderTopColor: colors.gray6,
		borderTopWidth: 1,
	},
	navGroupItem: {
		width: "30%",
	},
});
