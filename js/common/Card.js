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
import { commonStyles } from "./Style";

export const Tag = ({
	title = "text",
}) => {
	return (
		<View style={commonStyles.tag}>
			<Text>{title}</Text>
		</View>
	);
};

export class VehicleCard extends React.Component {
    constructor(props) {
        super(props)
    }

    props={
        item : Object,
    }

    static defaultProps = {
        item: {
            id:1,
            vin: '123456789012',
            make:'Honda', 
            model:'CR-V', 
            year:"2019", 
            imgUrl:'https://cka-dash.s3.amazonaws.com/131-1018-WTS230/mainimage.jpg'
        }
    }

    render(){
        const item = this.props.item;
        return (
            <View style={styles.row}> 
                <View style={[styles.col2, styles.imgContainer]}>
                    <Image
                    style={{width: "100%",height:100}}
                    source={{ uri: item.imgUrl }}
                    resizeMode="contain" />
                </View>
                <View style={styles.col2}>
                    <Text>{item.vin}</Text>
                    <Text>{item.make}, {item.year}</Text>
                    <Text>{item.model}</Text>
                </View>
            </View>
        );
    }
}

//appointments
export class QuoteCard extends React.Component {
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
			createdAt: "04/05/2021",
			costEstimate: 120.63,
			vehicle: {
				make: "Honda",
				model: "CR-V",
				year: "2019",
				imgUrl: "https://cka-dash.s3.amazonaws.com/131-1018-WTS230/mainimage.jpg",
			},
			services: [
				{
					id: "01",
					type: "Vehicle Inspection",
					price: 100,
				}, {
					id: "02",
					type: "Oil change",
					price: 100,
				},
			],
		},
		to: "QuoteDetail",
	};

	render() {
		const { item, to, currentUser } = this.props;
		const { createdAt, costEstimate, services, vehicle } = item;

		var serviceTypeList = [];
		var servicePriceList = [];
		var renderList = [];

		// extract service type and price from the object
		for (let i = 0; i < services.length; i++) {
			serviceTypeList.push(services[i].type);
			servicePriceList.push(services[i].price);
		}

		for (let i = 0; i < serviceTypeList.length; i++) {
			renderList.push(<Text key={i}>{serviceTypeList[i]}. </Text>);
		}

		return (
			<TouchableOpacity
				style={[commonStyles.card, commonStyles.shadowDefault]}
				onPress={(e) =>
					this.props.navigation.navigate(to, {
						currentUser: currentUser,
					})
				}
			>
				<View style={styles.row}>
					<Text style={commonStyles.h3}>{ item.costEstimate }</Text>
					<Button 
					title={"schedule"}
					onPress={() =>
						this.props.navigate(
							"Schedule",
							this.props.routeProps ? this.props.routeProps : null
						)
					}
					/>
				</View>

				<View style={styles.row}>
					<View style={styles.col2}>
						<Image
							style={{ width: "100%", height: 80 }}
							source={{ uri: vehicle.imgUrl }}
						/>
					</View>
					<View style={styles.col2}>
						<Text style={commonStyles.body} >
							{vehicle.make} {vehicle.model}
						</Text>
						<Text>Service({services.length}): {renderList}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}


//appointments
export class TaskCard extends React.Component {
	constructor(props) {
		super(props);
	}

	//to avoid warning
	static defaultProps = {
		item: Object,
		navigation: Object,
        route: Object,
		to: String,
	};

	static defaultProps = {
		item: {
			id: 1,
            status: "confirm",
			scheduleDate: "04/05/2021",
			mechanic: {
                firstName: "Michael",
                lastName: "Williams",
                phone: "123-456-7890",
            },
			quote: {
				vehicle: {
					make: "Honda",
					model: "CR-V",
					year: "2019",
					imgUrl: "https://cka-dash.s3.amazonaws.com/131-1018-WTS230/mainimage.jpg",
				},
				services: [
					{
						id: "01",
						type: "Vehicle Inspection",
						price: 100,
					}, {
						id: "02",
						type: "Oil change",
						price: 100,
					},
				],
			}
            
		},
		to: "TaskDetailPast",
	};

	render() {
		const { item, to, currentUser } = this.props;
		const { services, vehicle } = item.quote;

		var serviceTypeList = [];
		var servicePriceList = [];
		var renderList = [];

		// extract service type and price from the object
		for (let i = 0; i < services.length; i++) {
			serviceTypeList.push(services[i].type);
			servicePriceList.push(services[i].price);
		}

		for (let i = 0; i < serviceTypeList.length; i++) {
			renderList.push(<Text key={i}>{serviceTypeList[i]}</Text>);
		}

		return (
			<TouchableOpacity
				style={[commonStyles.card, commonStyles.shadowDefault]}
				onPress={(e) =>
					this.props.navigation.navigate(to, {
						appointmentID: item.id,
					})
				}
			>
				<View style={styles.row}>
					<Tag title={item.status}/>
					<Text style={commonStyles.h3}>{ item.scheduleDate }</Text>
				</View>

				<View style={styles.row}>
					<View style={styles.col2}>
						<Image
							style={{ width: "100%", height: 80 }}
							source={{ uri: vehicle.imgUrl }}
						/>
					</View>
					<View style={styles.col2}>
						<Text style={commonStyles.body} >
							{vehicle.make} {vehicle.model}
						</Text>
						<Text>Service: {renderList}</Text>
						<Text>
							Mechanician: {item.mechanic.firstName}{" "}
							{item.mechanic.lastName}
						</Text>
					</View>
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
    cardContainer: {
        padding: 16,
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
		padding: 16,
	},
});
