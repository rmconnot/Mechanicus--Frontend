import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	Button,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	TextInput,
	Checkbox,
	Image,
} from "react-native";
import { colors, fonts, commonStyles } from "./Style";
import { Icon } from "./Svg";

/* consts */
const sampleOptions = [
	{
		id: "1",
		text: "first option",
		checked: false,
		value: "01",
	},
	{
		id: "2",
		text: "second option",
		checked: true,
		value: "02",
	},
];

const sampleServiceList = [
	{
		id: "01",
		type: "Vehicle Inspection",
		price: 120,
	},
	{
		id: "02",
		type: "Oil change",
		price: 100,
		options: [
			{
				id: "02-1",
				type: "synthetic oil",
				price: 65,
			},
			{
				id: "02-2",
				type: "synthetic blends",
				price: 70,
			},
			{
				id: "02-3",
				type: "high mileage oil",
				price: 100,
			},
			{
				id: "02-4",
				type: "conventional oil",
				price: 120,
			},
		],
	},
	{
		id: "03",
		type: "Brake repair",
		price: 90,
	},
	{
		id: "04",
		type: "Battery replacement",
		price: 70,
	},
	{
		id: "05",
		type: "Battery Jump Service",
		price: 20,
	},
];

/*=============================*/
/* <Radio> */

/*=============================*/
/* <Input box> */
class FormInputBox extends React.Component {
	props: {
		placeholder: String,
		name: String,
		title: String,
	};

	state: {
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
		verification: "",
		address1: "",
		address2: "",
	};
	render() {
		// console.log("TabNav active: ", this.props.title.toLowerCase());
		let name = this.props.name;
		return (
			<View>
				<Text style={styles.inputText}>{this.props.title}</Text>
				<TextInput
					style={styles.inputBox}
					placeholder={this.props.placeholder}
					placeholderTextColor={colors.gray4}
					autoCapitalize="none"
					onChangeText={(text) =>
						this.setState((prevState) => ({ ...prevState, name: text.trim() }))
					}
				/>
			</View>
		);
	}
}

export function SignUpInput() {
	return (
		<View style={styles.formGroup}>
			<FormInputBox
				placeholder="    username@email.address"
				name="email"
				title="Email"
			/>
			<FormInputBox placeholder="    123-456-7890" name="phone" title="Phone" />
			<FormInputBox
				placeholder="    8 digit numbers"
				name="password"
				title="Password"
			/>
			<FormInputBox
				placeholder="    8 digit numbers"
				name="confirmPassword"
				title="Confirm password"
			/>
		</View>
	);
}

export function LogInInput() {
	return (
		<View style={styles.formGroup}>
			<FormInputBox
				placeholder="    username@email.address"
				name="email"
				title="Email"
			/>
			<FormInputBox
				placeholder="    8 digit numbers"
				name="password"
				title="password"
			/>
		</View>
	);
}

/*=============================*/
/* <Checkbox> */
export function ServiceCheckbox({
	item, 
	checked = false,
	handleStatus = () => {}, //handle status change in checkboxes
}) {
	const { id, type, price, parts, laborTime } = item;
	const [status, onChangeStatus] = React.useState(checked),
		  [toggled, setToggled] = React.useState(true);
	const changeStatus = () => {
		handleStatus({ checked: !status, id: id });
		onChangeStatus(!status);
	};
	const renderPartItem = ({item}) => <PartCheckbox item={item} />;

	return (
		<View style={[
			commonStyles.shadowDefault, commonStyles.card, 
			status ? styles.active : null,
		]}>
			<View style={commonStyles.rowSpread}>
				<TouchableOpacity 
				style={[commonStyles.rowLeft, {flex: 2/3}]} 
				onPress={changeStatus} >
					<View style={[
						styles.checkboxMark, 
						status ? styles.checkboxMarkActive : null,
					]}>
						<Icon name={"complete"} color={"white"} />
					</View>
					<Text style={styles.serviceText}>{type}</Text>
				</TouchableOpacity>

				<View style={{flexDirection: "row"}}>
					<Icon name="money" color={colors.primaryDark} size={24} />
					<Text style={styles.servicePrice}>{( price || laborTime*95 ).toFixed(1)}</Text>
					<TouchableOpacity
					style={{marginLeft:12}}
					onPress={()=>setToggled(!toggled)}
					>
						<Icon name={toggled?"arrow_down":"arrow_top"} color={colors.gray3} size={24}/>
					</TouchableOpacity>
				</View>
			</View>

			{toggled ? null : (
				<FlatList
				data={parts}
				renderItem={renderPartItem}
				keyExtractor={(item) => item.id.toString()}
				/>
			)}
		</View>
	);
}
export function PartCheckbox({
	item,
}) {
	const {id, type, price} = item;
	return (
		<View>
			<Text>{type}</Text>
			<Text>{price}</Text>
		</View>
	);
}

export function CheckboxGroup({
	initSelections = [], //initSelections
	options = sampleServiceList,
	handleCheckedServices,
	Menuchecked = false,
}) {
	//selections: stored ids of checked options
	const [selections, onChangeSelections] = React.useState(initSelections);
	const handleStatus = (item) => {
		let temp = selections.slice();
		let index = selections.indexOf(item.id);
		//if item is not checked and exist in selections, remove it from selections
		if (!item.checked && index != -1) {
			temp.splice(index, 1);
			onChangeSelections(temp);
		} //if item is checked and not in selections, add it in
		else if (item.checked && index == -1) {
			temp.push(item.id);
			onChangeSelections(temp);
		}
	};

	const renderItem = ({ item }) => {
		if (item.options) {
			return <SubOptions item={item} handleStatus={handleStatus} />;
		}
		return (
			<ServiceCheckbox
				item={item}
				id={item.id}
				text={item.type}
				price={item.price}
				laborTime={item.laborTime}
				checked={selections.includes(item.id)}
				handleStatus={handleStatus}
			/>
		);
	};

	useEffect(() => {
		console.log("selections: ", selections);
		if (selections) {
			handleCheckedServices(selections);
		}
	});

	return (
		<View>
			<FlatList
				data={options}
				renderItem={renderItem}
				keyExtractor={(item) => item.id.toString()}
				style={styles.flatListContainer}
				ListEmptyComponent={
					<View style={[commonStyles.card, commonStyles.cardBody]}>
						<Text style={[commonStyles.body, { color: colors.gray4 }]}>
							Loading Services...
						</Text>
					</View>
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {},
	active: {//for service checkbox container
		borderColor: colors.primaryDark,
		borderWidth: 1,
	},
	hideFlatList: {
		opacity: 0,
		height: 0,
	},
	showFlatList: {
		width: "90%",
		marginLeft: 35,
	},
	flatListContainer: {
		width: "95%",
		paddingLeft: 20,
	},
	checkboxMark: {
		width: 16,
		height: 16,
		borderColor: colors.primaryDark,
		borderWidth: 1,
		borderRadius: 2,
		marginRight: 12,
		justifyContent: "center",
		alignItems: "center",
	},
	checkboxMarkActive: {
		backgroundColor: colors.primaryDark,
	},
	serviceText: {
		fontSize: fonts.body,
		color: colors.text,
	},
	servicePrice: {
		fontSize: fonts.h3,
		color: colors.text,
	},
	inputBox: {
		borderStyle: "solid",
		backgroundColor: "white",
		paddingVertical: 12,
		marginHorizontal: 60,
		marginBottom: 40,
		borderRadius: 4,
	},
	inputText: {
		paddingLeft: 60,
		fontSize: fonts.body,
		color: colors.text,
	},
	formGroup: {
		display: "flex",
	},
});
