import React from "react";
import {
	TextInput,
	Text,
	View,
	FlatList,
	TouchableOpacity,
	Alert,
	Image,
	Button,
	StyleSheet,
} from "react-native";

export class VehicleCard extends React.Component {
	constructor(props) {
		super(props);
	}

	props: {
		item: Object,
	};

	static defaultProps = {
		item: {
			id: 1,
			make: "Honda",
			model: "CR-V",
			year: "2019",
			imgUrl: "https://cka-dash.s3.amazonaws.com/131-1018-WTS230/mainimage.jpg",
		},
	};

	render() {
		const item = this.props.item;
		return (
			<View style={styles.row}>
				<View style={styles.col2}>
					{/* <Image
						style={{ width: "100%", height: 100 }}
						source={{ uri: item.vehicle.imgUrl }}
					/> */}
				</View>
				<View style={styles.col2}>
					<Text>
						{item.vehicle.make}, {item.vehicle.year}
					</Text>
					<Text>{item.vehicle.model}</Text>
				</View>
			</View>
		);
	}
}

export class TaskCard extends React.Component {
	constructor(props) {
		super(props);
	}

	//to avoid warning
	static defaultProps = {
		item: Object,
		navigation: Object,
		to: String,
	};

	static defaultProps = {
		item: {
			id: 1,
			make: "Honda",
			model: "CR-V",
			year: "2019",
			imgUrl: "https://cka-dash.s3.amazonaws.com/131-1018-WTS230/mainimage.jpg",
		},
		to: "TaskDetailPast",
	};

	render() {
		const { item, to, currentUser } = this.props;

		var serviceTypeList = [];
		var servicePriceList = [];
		var renderList = [];

		// extract service type and price from the object
		for (let i = 0; i < item.services.length; i++) {
			serviceTypeList.push(item.services[i].service.type);
			servicePriceList.push(item.services[i].service.price);
		}

		for (let i = 0; i < serviceTypeList.length; i++) {
			renderList.push(<Text key={i}>{serviceTypeList[i]}</Text>);
		}
		// console.log(serviceDicts);
		// console.log(serviceTypeList);
		return (
			<TouchableOpacity
				style={[styles.row, styles.cardShape]}
				onPress={(e) =>
					this.props.navigation.navigate(to, {
						currentUser: currentUser,
					})
				}
			>
				<View style={styles.col2}>
					<Image
						style={{ width: "100%", height: 100 }}
						source={{ uri: item.vehicle.imgUrl }}
					/>
				</View>
				<View style={styles.col2}>
					<Text>
						{item.vehicle.make}, {item.vehicle.year}
					</Text>
					<Text>{item.vehicle.model}</Text>
					<Text>{item.scheduleDate}</Text>
					<Text>Service: {renderList}</Text>
					<Text>
						Mechanician: {item.mechanician.firstName}{" "}
						{item.mechanician.lastName}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
	},
	row: {
		flexDirection: "row",
		marginVertical: 6,
		marginHorizontal: 8,
	},
	col2: {
		//half of the row
		flex: 0.5,
		paddingHorizontal: 4,
	},
	cardShape: {
		elevation: 3,
		backgroundColor: "white",
		padding: 8,
	},
});