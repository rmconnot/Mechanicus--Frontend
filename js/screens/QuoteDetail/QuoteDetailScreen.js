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
		mechanician: {
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
		mechanicianID: {
			firstName: "Bill",
			lastName: "Davis",
			phone: "123-456-7890",
		},
		vehicleID: {
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

export default function QuoteDetailScreen({ navigation, route }) {
	const data = route.params.quote;

	// console.log(data.quote[0]);

	var serviceTypeList = [];
	var servicePriceList = [];
	var renderList = [];

	// extract service type and price from the object
	for (let i = 0; i < data.services.length; i++) {
		serviceTypeList.push(data.services[i].type);
		servicePriceList.push(data.services[i].price);
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
					<Button
						title="Cancel"
						onPress={() => Alert.alert("jump to the cancel page")}
					/>
				</View>
				<TaskProgress />
			</View>
			<View>
				<Text style={commonStyles.sectionTitle}>Vehicle</Text>
				<VehicleInfoCard item={data.vehicle} />
			</View>

			<View>
				<Text style={commonStyles.sectionTitle}>Services</Text>
				{renderList}
			</View>
			<View>
				<Text>Total Price: $ {data.costEstimate}</Text>
			</View>
		</View>
	);
}