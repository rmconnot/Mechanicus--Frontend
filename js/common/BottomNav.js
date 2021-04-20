import * as React from "react";
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import {colors, fonts, commonStyles} from './Style';
import ImageSrcs from './Images';
import { BtnLarge } from './Buttons';
import { Icon } from './Svg';


const BtmNavOptions = [
	{ title: "Home", screen: "TaskList", icon: "home" },
	{ title: "My Vehicles", screen: "VehicleList", icon: "vehicle" },
	{ title: "Account", screen: "Profile", icon: "account" },
];

export function NavGroup({
	navigation,
	options = [
		{ title: "Back", to: "TaskList", },
		{ title: "Next", to: "VehicleList", },
	],
	routeProps = null,
	disabled = false,
}) {
	
	
	if(options.length==1){
		return (
			<View style={styles.navGroupContainer}>
				<View style={styles.navGroupItem}>
				</View>
				<View style={styles.navGroupItem}>
					<BtnLarge
					disabled={disabled}
					style={styles.navGroupItem}
					title={options[0].title}
					onPress={() =>
						navigation.navigate(
							options[0].to, routeProps,
						)}
					/>
				</View>
			</View>
		);
	}
	return (
		<View style={styles.navGroupContainer}>
			<View style={styles.navGroupItem}>
				<BtnLarge
					title = {options[0].title}
					sub = {options[0].title == "Back"}
					onPress = {() =>
						navigation.navigate(
							options[0].to, routeProps,
						)}
				/>
			</View>
			<View style={styles.navGroupItem}>
				<BtnLarge
					style={styles.navGroupItem}
					title={options[1].title}
					onPress={() =>
						navigation.navigate(
							options[1].to, routeProps,
						)}
					disabled={disabled}
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
			onPress={() => navigation.navigate(to, {...routeProps.params})}
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
	return (
		<View style={[styles.bottomNav, commonStyles.shadowUp]}>
			<NavItem 
			active={ activated == BtmNavOptions[0].title}
			title={ BtmNavOptions[0].title } 
			icon={ BtmNavOptions[0].icon } 
			to = { BtmNavOptions[0].screen } 
			navigation={navigation}  
			routeProps={routeProps}/>
			<NavItem 
			active={ activated == BtmNavOptions[1].title}
			title={ BtmNavOptions[1].title } 
			icon={ BtmNavOptions[1].icon } 
			to = { BtmNavOptions[1].screen } 
			navigation={navigation}  
			routeProps={routeProps}/>
			<NavItem 
			active={ activated == BtmNavOptions[2].title}
			title={ BtmNavOptions[2].title } 
			icon={ BtmNavOptions[2].icon } 
			to = { BtmNavOptions[2].screen } 
			navigation={navigation}  
			routeProps={routeProps}/>
		</View>
	);
}

const styles = StyleSheet.create({
	bottomNav: {
		flex: 0.1,
		flexDirection: "row",
		justifyContent: "space-around",
		backgroundColor: "white",
		paddingVertical: 24,
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
		paddingVertical: 12,
		justifyContent: "space-between",
		borderTopColor: colors.gray6,
		borderTopWidth: 1,
	},
	navGroupItem: {
		minWidth: "30%",
	},
});
