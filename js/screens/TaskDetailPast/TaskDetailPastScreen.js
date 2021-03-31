import React, { useState } from "react";
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
import { TaskProgress } from '../../common/Progress';
import { VehicleCard } from '../../common/Card';
import { commonStyles } from '../../common/commonStyles';
import { styles } from './Styles';
import { useQuery } from "urql";

const imageURL = {
	circle: "./images/circle.png",
	line: "./images/line.png",
};

const quoteQuery = `query ($customerID: Int!) {
	quote (customerID: $customerID) {
        scheduleDate
        status
        services
		mechanicianID
        vehicleID
		customerID
	}}`;

const sampleQuotes = [
	{
		scheduleDate: "03/04/2021",
		status: "confirm",
		mechanicianID: 1,
		vehicleID: 1,
		customerID: 1,
	},

	{
		scheduleDate: "05/04/2021",
		status: "confirm",
		mechanicianID: 2,
		vehicleID: 2,
		customerID: 2,
	},
];



export class TaskDetailPastScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentNoteList: {
				id: 1,
				make: "Honda",
				model: "CR-V",
				year: "2019",
				imageURL:
					"https://cka-dash.s3.amazonaws.com/131-1018-WTS230/mainimage.jpg",
				vin: "1234567890",
				scheduleDate: "3/3/2021 12:30pm",
				mechanician: "XXX XXX",
				phone: "123-456-7890",
				service: {
					serviceOne: "Vehicle inspection",
					serviceOnePrice: "$$$",
					serviceTwo: "Oil Change",
					serviceTwoPrice: "$$$",
				},
			},
		};
	}

	render() {
		return (
			<View style={commonStyles.container}>
				<View>
					<View>
						<Text>
							{this.state.currentNoteList.make},{" "}
							{this.state.currentNoteList.year}
						</Text>
						<Text>{this.state.currentNoteList.vin}</Text>
						<Text>{this.state.currentNoteList.scheduleDate}</Text>
					</View>
					<TaskProgress />
				</View>
				<View>
					<Text style={commonStyles.sectionTitle}>Mechanician</Text>
					<View style={commonStyles.row}>
						<Text>Name</Text>
						<Text>{this.state.currentNoteList.mechanician}</Text>
					</View>
					<View style={commonStyles.row}>
						<Text>Phone</Text>
						<Text> {this.state.currentNoteList.phone}</Text>
					</View>
				</View>
				<View>
					<Text style={commonStyles.sectionTitle}>Vehicle</Text>
					<VehicleCard item={this.state.currentNoteList}/>
				</View>

				<View>
					<Text style={commonStyles.sectionTitle}>Service</Text>
					<View style={[commonStyles.row, commonStyles.spaceBetween]}>
						<Text>{this.state.currentNoteList.service.serviceOne}</Text>
						<Text> {this.state.currentNoteList.service.serviceOnePrice}</Text>
					</View>
					<View style={[commonStyles.row, commonStyles.spaceBetween]}>
						<Text>{this.state.currentNoteList.service.serviceTwo}</Text>
						<Text>{this.state.currentNoteList.service.serviceTwoPrice}</Text>
					</View>
				</View>
			</View>
		);
	}
}
