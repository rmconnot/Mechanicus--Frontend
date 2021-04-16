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


	render() {
		let to = this.props.to;
		
		// console.log("TabNav active: ", this.props.title.toLowerCase());
		if (this.props.active) {
			return (
				<View style={[styles.topNav, commonStyles.shadowDefault]}>
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
					<Image
							style={{ width: "30%" }}
							source={require('../../assets/underline_active.png')}
						/>
				</View>
			);
		}
		else {
			return (
				<View style={[styles.topNav, commonStyles.shadowDefault]}>
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
}

/* <TopNav> */
export default function TopNav({ 
	navigation, 
	activated = "Appointments",
	routeProps
}) {
	const navigate = navigation.navigate;
	return (
		<View style={styles.container}>
			<TabNav title="Appointments" to="test1" navigate={navigate} active={activated=="Appointments"} routeProps={routeProps}/>
			<TabNav title="Quotes" to="test2" navigate={navigate}  active={activated=="Quotes"} routeProps={routeProps}/>
		</View>
	);
}

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

	topNav: {
		flex:0.36,
		alignItems: 'center',
	},
	activeBtn: {
		color: colors.text,
		fontSize: fonts.h2,
	},
	inactiveBtn: {
		color: colors.gray3,
		fontSize: fonts.body,
		marginTop: 2
	},

});
