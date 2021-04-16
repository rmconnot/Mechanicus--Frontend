import * as React from "react";
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import {colors, fonts, commonStyles} from './Style';
import ImageSrcs from './Images';



class TabNav extends React.Component {
	props: {
		to: string,
		title: String,
		navigate: () => mixed,
		active: Boolean, //check if tab is activated
		routeProps: Object,
	};

	imageSelect = (title, active) => {

		const networkArray = {
		  'Task': active?ImageSrcs.icons.taskActive:ImageSrcs.icons.taskInactive,
		  'My Vehicles':active?ImageSrcs.icons.vehicleActive:ImageSrcs.icons.vehicleInactive,
		  'Profile':active?ImageSrcs.icons.profileActive:ImageSrcs.icons.profileInactive,
		};
	  
		return networkArray[title];
	  }; 
	
	// imageSrc1 = "../../assets/" + this.props.title.toLowerCase()
	// imageSrc2 = this.props.active?"_active.png":"_inactive.png"
	// imageSrc = imageSrc1 + imageSrc2


	render() {
		let to = this.props.to;
		console.log(this.props.routeProps);
		console.log(this.props.routeProps);
		
		// console.log("TabNav active: ", this.props.title.toLowerCase());
		return (
			<View style={[styles.bottomNav, commonStyles.shadowUp]}>
				<Image
					style={{ width: "15%" }}
					source={this.imageSelect(this.props.title, this.props.active)}/>
				<TouchableOpacity
					style={this.props.active?styles.activeBtn:styles.inactiveBtn}
					onPress={() =>
						this.props.navigate(
							to,
							this.props.routeProps ? this.props.routeProps : null
						)
					}
				>
					<Text
						style={this.props.active?styles.activeBtn:styles.inactiveBtn}>
							{this.props.title}
					</Text>
				</TouchableOpacity>
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
			<TabNav title="Task" to="TaskList" navigate={navigate} active={activated=="Task"} routeProps={routeProps}/>
			<TabNav title="My Vehicles" to="VehicleList" navigate={navigate}  active={activated=="Vehicles"} routeProps={routeProps}/>
			<TabNav title="Profile" to="Profile" navigate={navigate}  active={activated=="Profile"} routeProps={routeProps}/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
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
		width: "100%",
		flexDirection: "row",
		padding: 16,
		justifyContent: "space-between",
	},
	navGroupItem: {
		width: "30%",
	},
});
