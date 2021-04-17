import * as React from "react";
import {
	View,
	Text,
	Button,
	StyleSheet,
	FlatList,
	TouchableOpacity,
} from "react-native";
import { colors, commonStyles } from "./Style";
import { Icon } from "./Svg";
import { BtnLarge } from "./Buttons";

class TabNav extends React.Component {
	props: {
		to: string,
		title: String,
		navigate: () => mixed,
		active: string, //check if tab is activated
		routeProps: Object,
		callbackFunction: any,
	};

	render() {
		let to = this.props.to;
		if (this.props.callbackFunction) {
			console.log(this.props.callbackFunction);
		}
		return (
			<View style={styles.bottomNav}>
				<Button
					style={styles.navBtn}
					title={this.props.title}
					onPress={async () => {
						if (this.props.callbackFunction) {
							await this.props.callbackFunction();
						}
						this.props.navigate(
							to,
							this.props.routeProps ? this.props.routeProps : null
						);
					}}
				/>
			</View>
		);
	}
}
const BtmNavOptions = [
	{ title: "Home", screen: "TaskList", icon: "home" },
	{ title: "My Vehicles", screen: "VehicleList", icon: "vehicle" },
	{ title: "Account", screen: "Profile", icon: "account" },
];

/* < NavItem /> */
//used for quote pages navigation
export function NavGroup({
	navigation,
	options = [
		{ title: "Back", to: "TaskList", data: {}, disabled: false },
		{ title: "Next", to: "VehicleList", data: {}, disabled: false },
	],
	routeProps,
	callbackFunction,
}) {
	const navigate = navigation.navigate;

	console.log("callbackFunction: ", callbackFunction);
	return (
		<View style={styles.navGroupContainer}>
			<TabNav
				style={styles.navGroupItem}
				title={options[0].title}
				to={options[0].to}
				navigate={navigate}
				routeProps={routeProps}
				callbackFunction={callbackFunction}
			/>
			<TabNav
				style={styles.navGroupItem}
				title={options[1].title}
				to={options[1].to}
				navigate={navigate}
				routeProps={routeProps}
				callbackFunction={callbackFunction}
			/>
			{/* !!!!----------    BtnLarge will need to be modified to accept the callabckFunction used in the TabNavs above   ---------------!!!

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
			</View> */}
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
	activated = BtmNavOptions[0].title, //which page the user is on
	navigation,
	routeProps,
}) {
	return (
		<View style={[styles.BtmNavContainer, commonStyles.shadowUp]}>
			<NavItem
				title={BtmNavOptions[0].title}
				to={BtmNavOptions[0].screen}
				icon={BtmNavOptions[0].icon}
				navigation={navigation}
				active={activated == BtmNavOptions[0].title}
				routeProps={routeProps}
			/>
			<NavItem
				title={BtmNavOptions[1].title}
				to={BtmNavOptions[1].screen}
				icon={BtmNavOptions[1].icon}
				navigation={navigation}
				active={activated == BtmNavOptions[1].title}
				routeProps={routeProps}
			/>
			<NavItem
				title={BtmNavOptions[2].title}
				to={BtmNavOptions[2].screen}
				icon={BtmNavOptions[2].icon}
				navigation={navigation}
				active={activated == BtmNavOptions[2].title}
				routeProps={routeProps}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	BtmNavContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		backgroundColor: "white",
		paddingTop: 24,
		paddingBottom: 32,
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
	},
	navItemContainer: {
		justifyContent: "center",
		alignItems: "center",
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
