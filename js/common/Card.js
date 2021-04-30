import React, { useEffect, useState } from "react";
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
import { commonStyles, colors } from "./Style";
import { BtnSmall } from "./Buttons";
import { Icon } from "./Svg";
import { resultKeyNameFromField } from "@apollo/client/utilities";

const sampleAppointment = {
	id: 1,
	status: "upcoming",
	scheduleDate: "04/05/2021",
	mechanic: {
		firstName: "Michael",
		lastName: "Williams",
		phone: "123-456-7890",
	},
	quote: {
		id: 1,
		createdAt: "04/05/2021",
		costEstimate: 120.63,
		vehicle: {
			make: "Honda",
			model: "CR-V",
			year: "2019",
			imgUrl:
				"https://file.kelleybluebookimages.com/kbb/base/evox/CP/10858/2017-Ford-Focus-front_10858_032_2400x1800_YZ.png",
			vin: "12345678901234567",
		},
		services: [
			{
				id: "01",
				type: "Vehicle Inspection",
				price: 100,
			},
			{
				id: "02",
				type: "Oil change",
				price: 100,
			},
		],
	},
};
const imageHeight = 50;
const taskStatus = {
	// pending approved canceled completed
	pending: {
		color: colors.secondaryDark,
		bgColor: colors.secondaryLight,
	},
	approved: {
		color: colors.primaryDark,
		bgColor: colors.primaryLight,
	},
	completed: {
		color: colors.gray3,
		bgColor: colors.gray6,
	},
	canceled: {
		color: colors.gray3,
		bgColor: colors.gray6,
	},
};
export const Tag = ({
	title = "text",
	color = colors.gray3,
	bgColor = colors.gray6,
}) => {
	return (
		<View style={[commonStyles.tag, { backgroundColor: bgColor }]}>
			<Text style={[commonStyles.note, { color: color }]}>{title}</Text>
		</View>
	);
};

/* DETAIL VIEWS */
/*=======================================*/

//only displays vehicle information, for quotes and appointment details
export const VehicleInfoCard = ({
	item, //vehicle data object
}) => {
	if (item) {
		return (
			<View style={[commonStyles.card, commonStyles.cardBody]}>
				<View style={[styles.col_A, styles.imgContainer]}>
					<Image style={styles.vehicleImg} source={{ uri: item.imgUrl }} />
				</View>
				<View style={styles.col_B}>
					<Text style={commonStyles.h3}>
						{item.make} {item.model}
					</Text>
					<Text style={commonStyles.body}>{item.year}</Text>
					<Text style={[commonStyles.cap2, { marginTop: 12 }]}>
						VIN {item.vin||"--"}
					</Text>
				</View>
			</View>
		);
	}

	return (
		<View style={[commonStyles.card, commonStyles.cardBody]}>
			<Text style={[commonStyles.body, { color: colors.gray4 }]}>
				No Vehicle
			</Text>
		</View>
	);
};

export const MechanicInfoCard = ({
	item = sampleAppointment.mechanic, //vehicle data object
}) => {
	if (item) {
		return (
			<View style={commonStyles.card}>
				<Text style={[commonStyles.h3, { marginBottom: 12 }]}>
					{item.firstName} {item.lastName}
				</Text>
				<View style={styles.row}>
					<Icon name={"phone"} size={18} color={colors.primaryDark} />
					<Text style={[commonStyles.body, { marginLeft: 8 }]}>
						{item.phone}
					</Text>
				</View>
			</View>
		);
	}

	return (
		<View style={[commonStyles.card, commonStyles.cardBody]}>
			<Text style={[commonStyles.body, { color: colors.gray4 }]}>
				Mechanic not assigned
			</Text>
		</View>
	);
};

//including part and service info
export const ServiceInfoCard = ({
	item, //billItems
	handleTotalPrice,
}) => {
	const tax_rate = 0.06;

	const renderItem = ({ item }) => {
		const { type, cost} = item;
		return (
			<View style={styles.entry}>
				<Text style={commonStyles.body}>{type}</Text>
				<Text style={commonStyles.body}>{cost.toFixed(2)}</Text>
			</View>
		);
	};

	const [bill, setBill] = useState(get_bill_info(item));

	useEffect(() => {
		if (handleTotalPrice && item) {
			handleTotalPrice(bill.total*(1+tax_rate));
		}
	});

	if (item) {
		return (
			<View style={commonStyles.card}>
				<Text style={[commonStyles.h4, styles.subTitle]}>Labor</Text>
				<FlatList
					data={bill.services}
					renderItem={renderItem}
					keyExtractor={(item) => (item ? item.id.toString() : "")}
				/>

				<View style={commonStyles.dividingLine}></View>
				
				<Text style={[commonStyles.h4, styles.subTitle]}>Parts</Text>
				<FlatList
					data={bill.parts}
					renderItem={renderItem}
					keyExtractor={(item) => (item ? item.id.toString() : "")}
				/>
				
				<View style={commonStyles.dividingLine}></View>

				<View style={styles.entry}>
					<Text style={commonStyles.body}>Tax</Text>
					<Text style={commonStyles.body}>{(bill.total*tax_rate).toFixed(2)}</Text>
				</View>

				<View style={styles.totalEntry}>
					<Text style={commonStyles.body}>Total $  </Text>
					<Text style={commonStyles.h3}> {(bill.total*(1+tax_rate)).toFixed(2)}</Text>
				</View>
			</View>
		);
	}

	return (
		<View style={commonStyles.card}>
			<Text style={[commonStyles.body, { color: colors.gray4 }]}>
				No services selected
			</Text>
		</View>
	);
};

/* LIST VIEWS */
/*=======================================*/

// VEHICLE, card displayed in vehicle list
export const VehicleCard = ({
	navigation,
	route,
	item = sampleAppointment.quote.vehicle, //vehicle data object
}) => {
	return (
		<View style={[commonStyles.card, commonStyles.shadowDefault]}>
			<View style={[commonStyles.cardHeader, styles.spaceBetween]}>
				<Text style={commonStyles.h3}>
					{item.make} {item.model}
				</Text>
				<BtnSmall
					title={"Get A Quote"}
					onPress={() =>
						navigation.navigate("QuoteVehicle", {
							...route.params,
							selectedVehicle: item.id,
						})
					}
				/>
			</View>

			<View style={commonStyles.cardBody}>
				<View style={[styles.col_A, styles.imgContainer]}>
					<Image style={styles.vehicleImg} source={{ uri: item.imgUrl }} />
				</View>
				<View style={styles.col_B}>
					<Text style={commonStyles.body}>{item.year}</Text>
					<Text style={[commonStyles.cap2, { marginTop: 12 }]}>
						VIN {item.vin||"--"}
					</Text>
				</View>
			</View>
		</View>
	);
};

// QUOTE, cards displayed in quote list
export const QuoteCard = ({
	navigation,
	route,
	item = sampleAppointment.quote,
}) => {
	console.log(item);
	const { createdAt, costEstimate, billItems, vehicle } = item;
	const currentUser = route.params.currentUser;
	let serviceInfo = get_service(billItems);
	
	return (
		<TouchableOpacity
			style={[commonStyles.card, commonStyles.shadowDefault]}
			onPress={(e) =>
				navigation.navigate("QuoteDetail", {
					...route.params,
					quote: item,
				})
			}
		>
			<View style={[commonStyles.cardHeader, styles.spaceBetween]}>
				<View style={styles.row}>
					<Icon name="money" size={24} color={colors.primaryDark} />
					<Text style={commonStyles.h3}>{item.costEstimate}</Text>
				</View>
				<BtnSmall
					title={"schedule"}
					onPress={() =>
						navigation.navigate("Schedule", {
							...route.params,
							quoteID: item.id,
							// currentUser: currentUser,
						})
					}
				/>
			</View>

			<View style={commonStyles.cardBody}>
				<View style={styles.col_A}>
					<Image style={styles.vehicleImg} source={{ uri: vehicle.imgUrl }} />
				</View>
				<View style={styles.col_B}>
					<Text style={[commonStyles.body, commonStyles.m_b_s]}>
						{vehicle.make} {vehicle.model}
					</Text>
					<Text style={commonStyles.note}>
						Service({serviceInfo.length}): {serviceInfo.str}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

// APPOINTMENT, cards displayed in appointment list
export const TaskCard = ({ 
	navigation, 
	item = sampleAppointment, 
	route 
}) => {
	const tagStyle = taskStatus[item.status] || {
		color: colors.secondaryDark,
		bgColor: colors.secondaryLight,
	};
	const { billItems, vehicle } = item.quote;

	let serviceInfo = get_service(billItems);
	let mechanicStr = "unassigned";
	if (item.mechanic) {
		mechanicStr = item.mechanic.firstName + " " + item.mechanic.lastName;
	}

	return (
		<TouchableOpacity
			style={[commonStyles.card, commonStyles.shadowDefault]}
			onPress={(e) =>
				navigation.navigate("TaskDetailPresent", {
					...route,
					appointment: item,
				})
			}
		>
			<View style={commonStyles.cardHeader}>
				<Tag
					title={item.status}
					color={tagStyle.color}
					bgColor={tagStyle.bgColor}
				/>
				<Text
					style={[
						commonStyles.h3,
						item.status == "completed" ? { color: colors.gray3 } : "",
					]}
				>
					{item.scheduleDate}
				</Text>
			</View>

			<View style={commonStyles.cardBody}>
				<View style={styles.col_A}>
					<Image style={styles.vehicleImg} source={{ uri: vehicle.imgUrl }} />
				</View>
				<View style={styles.col_B}>
					<Text style={[commonStyles.body, commonStyles.m_b_s]}>
						{vehicle.make} {vehicle.model}
					</Text>
					<Text style={commonStyles.note}>
						Service({serviceInfo.length}): {serviceInfo.str}
					</Text>
					<Text style={commonStyles.note}>Mechanic: {mechanicStr}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const get_service = (billItems) => {
	let result = "";
	let length = 0;
	let maxLength = 50;

	for (let i = 0; i < Math.min(billItems.length, 3); i++) {
		let item = billItems[i];
		if(item.service){
			result += item.service.type + ", ";
			length++;
		}
	}

	result = result.slice(0, -2);

	if (result.length >= maxLength) {
		result = result.slice(0, maxLength - 3);
		result += "...";
	}

	return {
		length: length,
		str: result,
	};
};

const get_bill_info = (billItems) => {
	let partData = [],
		serviceData = [],
		total = 0;

	billItems.forEach( (record) => {
		if(record.service) {
			serviceData.push({
				...record.service,
				cost: record.cost,
			});
		}
		else if (record.part) {
			partData.push({
				...record.part,
				cost: record.cost,
			});
		}
		total += record.cost;
	} );

	return {
		services: serviceData,
		parts: partData,
		total: total,
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
	},
	row: {
		flexDirection: "row",
	},
	col2: {
		//half of the row
		flex: 0.5,
		paddingHorizontal: 4,
	},
	col_A: {
		flex: 0.4,
		paddingRight: 24,
	},
	col_B: {
		flex: 0.6,
	},
	spaceBetween: {
		justifyContent: "space-between",
	},
	vehicleImg: {
		width: "100%",
		height: imageHeight,
	},
	entry: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16,
	},
	subTitle: {
		marginBottom: 12,
	},
	totalEntry: {
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
	},
});
