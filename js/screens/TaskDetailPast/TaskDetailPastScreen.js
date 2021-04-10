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
import { VehicleCard } from "../../common/Card";
import { commonStyles } from "../../common/commonStyles";
import { styles } from "./Styles";
import { gql, useQuery } from "@apollo/client";

const imageURL = {
	circle: "./images/circle.png",
	line: "./images/line.png",
};

const QUOTE_QUERY = gql`
	query($customerID: Int!) {
		quote(customerID: $customerID) {
			scheduleDate
			status
			mechanician {
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
				service {
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

export default function TaskDetailPresentScreen({ navigation, route }) {
	const { currentUser } = route.params;
	console.log(currentUser);

	const { loading, data, error } = useQuery(QUOTE_QUERY, {
		variables: {
			customerID: 1,
		},
	});

	if (loading) return <Text>Loading...</Text>;
	if (error) return <Text>Oh no... {error.message}</Text>;

	// console.log(data.quote[0]);

	var serviceTypeList = [];
	var servicePriceList = [];
	var renderList = [];
	var totalPrice = 0;

	// extract service type and price from the object
	for (let i = 0; i < data.quote[0].services.length; i++) {
		serviceTypeList.push(data.quote[0].services[i].service.type);
		servicePriceList.push(data.quote[0].services[i].service.price);
		totalPrice += data.quote[0].services[i].service.price;
	}

	for (let i = 0; i < serviceTypeList.length; i++) {
		renderList.push(
			<View key={i} style={[commonStyles.row, commonStyles.spaceBetween]}>
				<Text>{serviceTypeList[i]}</Text>
				<Text> {servicePriceList[i]}</Text>
			</View>
		);
	}

	return (
		<View style={commonStyles.container}>
			<View>
				<View>
					<Text>
						{data.quote[0].vehicle.make}, {data.quote[0].vehicle.year}
					</Text>
					<Text>{data.quote[0].vehicle.vin}</Text>
					<Text>{data.quote[0].scheduleDate}</Text>
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
					<Text>Name</Text>
					<Text>
						{data.quote[0].mechanician.firstName}
						{data.quote[0].mechanician.lastName}
					</Text>
				</View>
				<View style={commonStyles.row}>
					<Text>Phone</Text>
					<Text> {data.quote[0].mechanician.phone}</Text>
				</View>
			</View>
			<View>
				<Text style={commonStyles.sectionTitle}>Vehicle</Text>
				<VehicleCard item={data ? data.quote[0] : sampleQuotes} />
			</View>

			<View>
				<Text style={commonStyles.sectionTitle}>Service</Text>
				{renderList}
			</View>
			<View>
				<Text>Total Price: {totalPrice}</Text>
			</View>
		</View>
	);
}