import * as React from "react";
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { colors, fonts, commonStyles} from './Style';
import { Icon } from './Svg';
import { BtnBare } from './Buttons';

export const TaskTop = ({
	activated = "appointments",
	handleStatus = null
})=>{
	const customColor = {
		active: colors.primaryDark,
		inactive: "transparent",
	};
	return (
	<View style={[styles.topNav, commonStyles.shadowDefault]}>

		<TouchableOpacity
		style={styles.tabContainer}
		onPress={ () => handleStatus("appointments") }
		>
			<Text style={
				activated == "appointments" ? styles.activeBtn : styles.inactiveBtn
			}>
				Appointments
			</Text>
			<View style={[
				styles.slider, 
				activated == "appointments" ? styles.primary : styles.transparent
			]}></View>
		</TouchableOpacity>

		<TouchableOpacity
		style={styles.tabContainer}
		onPress={ () => handleStatus("quotes") }
		>
			<Text style={
				activated == "quotes" ? styles.activeBtn : styles.inactiveBtn
			}>
				Quotes
			</Text>
			<View style={[
				styles.slider, 
				activated == "quotes" ? styles.primary : styles.transparent
			]}></View>
		</TouchableOpacity>

	</View>	
	);
};

export const TopNavBar = ({
	title = "page title",
	onPressBack = null,
	onPressCancel = null,
	cancel = false,
	plain = false
}) => {
	if(plain) {
		return (
			<View  style={[styles.topNavBar, styles.spaceBetween, commonStyles.shadowDefault]}>
				<Text style={commonStyles.h2}>{title}</Text>
			</View>
		);
	}
	if(cancel) {
		return (
			<View  style={[styles.topNavBar, styles.spaceBetween, commonStyles.shadowDefault]}>
				<TouchableOpacity 
				style={commonStyles.row}
				onPress={onPressBack}>
					<Icon name="arrow_left" color={colors.gray3} size={24} style={{transform: [{ rotate: "180deg" }]}}/>
					<Text style={[commonStyles.body,{marginLeft: 8, textTransform: "capitalize"}]}>{title}</Text>
				</TouchableOpacity>
				<BtnBare title="cancel" onPress={onPressCancel}/>
			</View>
		);
	}
	return (
		<View  style={[styles.topNavBar, commonStyles.shadowDefault]}>
			<TouchableOpacity 
			style={commonStyles.row}
			onPress={
				() => navigation.navigate(backTo, {...route.params})
			}>
				<Icon name="arrow_back" color={colors.gray3} size={16} style={{transform: [{ rotate: "180deg" }]}}/>
				<Text style={[commonStyles.body, {marginLeft: 8}]}>{title}</Text>
			</TouchableOpacity>
		</View>
	);
};

// class TabNav extends React.Component {
// 	props: {
// 		to: string,
// 		title: String,
// 		navigate: () => mixed,
// 		active: Boolean, //check if tab is activated
// 		routeProps: Object,
// 	};


// 	render() {
// 		let to = this.props.to;
		
// 		// console.log("TabNav active: ", this.props.title.toLowerCase());
// 		if (this.props.active) {
// 			return (
// 				<View style={[styles.topNav, commonStyles.shadowDefault]}>
// 					<TouchableOpacity
// 						style={this.props.active?styles.activeBtn:styles.inactiveBtn}
// 						onPress={() =>
// 							this.props.navigate(
// 								to,
// 								this.props.routeProps ? this.props.routeProps : null
// 							)
// 						}
// 					>
// 						<Text
// 							style={this.props.active?styles.activeBtn:styles.inactiveBtn}>
// 								{this.props.title}
// 						</Text>
// 					</TouchableOpacity>
// 					<Image
// 							style={{ width: "30%" }}
// 							source={require('../../assets/underline_active.png')}
// 						/>
// 				</View>
// 			);
// 		}
// 		else {
// 			return (
// 				<View style={[styles.topNav, commonStyles.shadowDefault]}>
// 					<TouchableOpacity
// 						style={this.props.active?styles.activeBtn:styles.inactiveBtn}
// 						onPress={() =>
// 							this.props.navigate(
// 								to,
// 								this.props.routeProps ? this.props.routeProps : null
// 							)
// 						}
// 					>
// 						<Text
// 							style={this.props.active?styles.activeBtn:styles.inactiveBtn}>
// 								{this.props.title}
// 						</Text>
// 					</TouchableOpacity>
// 				</View>
// 			);
// 		}


// 	}
// }

// /* <TopNav> */
// export default function TopNav({ 
// 	navigation, 
// 	activated = "Appointments",
// 	routeProps
// }) {
// 	const navigate = navigation.navigate;
// 	return (
// 		<View style={styles.container}>
// 			<TabNav title="Appointments" to="test1" navigate={navigate} active={activated=="Appointments"} routeProps={routeProps}/>
// 			<TabNav title="Quotes" to="test2" navigate={navigate}  active={activated=="Quotes"} routeProps={routeProps}/>
// 		</View>
// 	);
// }

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "row",
		backgroundColor: "white",
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		paddingTop: 100,
		paddingBottom: 20,
		paddingLeft:10
	},
	spaceBetween: {
		justifyContent: 'space-between',
	},
	tabContainer: {
		justifyContent: "center",
		alignItems: "center",
		marginRight: 48,
	},
	topNav: {
		// flex: 0.1,
		flexDirection: "row",
		backgroundColor: "white",
		paddingHorizontal: 16,
		paddingTop: 24,
		borderBottomLeftRadius: 24,
		borderBottomRightRadius: 24,
	},
	topNavBar: {
		flexDirection: "row",
		backgroundColor: "white",
		paddingHorizontal: 16,
		paddingVertical: 16,
		borderBottomLeftRadius: 24,
		borderBottomRightRadius: 24,
	},
	activeBtn: {
		color: colors.text,
		fontSize: fonts.h2,
	},
	inactiveBtn: {
		color: colors.gray3,
		fontSize: fonts.body,
		marginTop: 2,
		
	},
	slider: {
		width: 24,
		height: 6,
		borderRadius: 4,
		marginTop: 8,
	},
	primary: {
		backgroundColor: colors.primary,
	},
	transparent: {
		backgroundColor: "transparent",
	},
});