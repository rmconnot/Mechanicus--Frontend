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
} from "react-native";
import { TaskProgress } from "../../common/Progress";
import { VehicleInfoCard } from "../../common/Card";
import { commonStyles } from "../../common/commonStyles";
import { styles } from "./Styles";
import { gql, useQuery } from "@apollo/client";

const imageURL = {
	circle: "./images/circle.png",
	line: "./images/line.png",
};

const APPOINTMENT_QUERY = gql`
	query($appointmentID: Int!) {
		appointment(appointmentID: $appointmentID) {
			scheduleDate
			status
			mechanic {
				firstName
				lastName
				phone
			}
			quote {
				vehicle {
					year
					make
					model
					imgUrl
					vin
				}
				services {
					type
					price
				}
			}
		}
	}
`;

const sampleQuotes = [
	{
		id: 1,
		scheduleDate: "03/04/2021",
		status: "confirm",
		services: [
			{
				price: 100,
				type: "Vehicle Inspection",
			},
			{
				price: 110,
				type: "Oil change",
			},
		],
		mechanic: {
			firstName: "Michael",
			lastName: "Williams",
			phone: "123-456-7890",
		},
		vehicle: {
			vin: "0987654321",
			vehicleType: "SUV",
			year: 2010,
			make: "Chevrolet",
			model: "Trailblazer",
			imgUrl:
				"https://www.gannett-cdn.com/presto/2020/07/10/PDTF/76f14475-53f5-4abe-ae0f-a4f4911c8be3-IMG_2481.JPG",
		},
	},

	{
		id: 2,
		scheduleDate: "05/04/2021",
		status: "confirm",
		services: [
			{
				price: 100,
				type: "Vehicle Inspection",
			},
			{
				price: 110,
				type: "Oil change",
			},
		],
		mechanic: {
			firstName: "Bill",
			lastName: "Davis",
			phone: "123-456-7890",
		},
		vehicle: {
			vin: "1122334455",
			vehicleType: "Truck",
			year: 2005,
			make: "Toyota",
			model: "Tundra",
			imgUrl:
				"https://www.toyota.com/imgix/responsive/images/mlp/colorizer/2021/tundra/8W2/1.png",
		},
	},
];

export default function TaskDetailPresentScreen({ navigation, route }) {
	const { appointmentID } = route.params;
	console.log(appointmentID);

	const { loading, data, error } = useQuery(APPOINTMENT_QUERY, {
		variables: {
			appointmentID: appointmentID,
		},
	});

	console.log(data);
	// data = data.appointment;

	if (loading) return <Text>Loading...</Text>;
	if (error) return <Text>Oh no... {error.message}</Text>;


	var serviceTypeList = [];
	var servicePriceList = [];
	var renderList = [];
	var totalPrice = 0;

	// extract service type and price from the object
	for (let i = 0; i < data.appointment.quote.services.length; i++) {
		serviceTypeList.push(data.appointment.quote.services[i].type);
		servicePriceList.push(data.appointment.quote.services[i].price);
		totalPrice += data.appointment.quote.services[i].price;
	}

	for (let i = 0; i < serviceTypeList.length; i++) {
		renderList.push(
			<View key={i} style={[commonStyles.row, commonStyles.spaceBetween]}>
				<Text>{serviceTypeList[i]}</Text>
				<Text>$ {servicePriceList[i]}</Text>
			</View>
		);
	}

	return (
		<View style={commonStyles.container}>
			<View>
				<View>
					<Text>
						{data.appointment.quote.vehicle.make}, {data.appointment.quote.vehicle.year}
					</Text>
					<Text>{data.appointment.quote.vehicle.vin}</Text>
					<Text>{data.appointment.scheduleDate}</Text>
				</View>
				<View>
					<Button
						title="Cancel"
						onPress={() => Alert.alert("jump to the cancel page")}
					/>
				</View>
				<TaskProgress />
			</View>
			<View>
				<Text style={commonStyles.sectionTitle}>Mechanician</Text>
				<View style={commonStyles.row}>
					<Text>Name: </Text>
					<Text>
						{data.appointment.mechanic.firstName} {data.appointment.mechanic.lastName}
					</Text>
				</View>
				<View style={commonStyles.row}>
					<Text>Phone: </Text>
					<Text> {data.appointment.mechanic.phone}</Text>
				</View>
			</View>
			<View>
				<Text style={commonStyles.sectionTitle}>Vehicle</Text>
				<VehicleInfoCard item={ data.appointment.quote.vehicle } />
			</View>

			<View>
				<Text style={commonStyles.sectionTitle}>Service</Text>
				{renderList}
			</View>
			<View>
				<Text>Total Price: $ {totalPrice}</Text>
			</View>
		</View>
	);
}