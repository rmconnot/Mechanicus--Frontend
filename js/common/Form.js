import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	Button,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	TextInput
} from "react-native";
import {colors, fonts, commonStyles} from './Style';

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
/*=============================*/

/* <Input box> */
class FormInputBox extends React.Component {
	props: {
		placeholder: String,
		name: String,
		title: String
	};

	state: {
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
		verification:"",
		address1:"",
		address2:""
	}

	render() {
		// console.log("TabNav active: ", this.props.title.toLowerCase());
		let name = this.props.name
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
			<FormInputBox placeholder="    username@email.address" name="email" title="Email"/>
			<FormInputBox placeholder="    123-456-7890" name="phone" title="Phone"/>
			<FormInputBox placeholder="    8 digit numbers" name="password" title="Password"/>
			<FormInputBox placeholder="    8 digit numbers" name="confirmPassword" title="Confirm password"/>
		</View>
	);
}

export function LogInInput() {
	
	return (
		<View style={styles.formGroup}>
			<FormInputBox placeholder="    username@email.address" name="email" title="Email"/>
			<FormInputBox placeholder="    8 digit numbers" name="password" title="password"/>
		</View>
	);
}


/* <Checkbox> */
export function Checkbox({
	id = "test",
	text = "option displayed",
	checked = false,
	handleStatus = () => {}, //handle status change in checkboxes
}) {
	const [status, onChangeStatus] = React.useState(checked);
	const changeStatus = () => {
		handleStatus({ checked: !status, id: id });
		onChangeStatus(!status);
	};
	return (
		<TouchableOpacity
			style={styles.checkboxContainer}
			activeOpacity={0.6}
			onPress={(e) => changeStatus()}
		>
			<Text>{text}</Text>
			<View
				style={[styles.checkboxMark, status ? styles.checkboxMarkActive : ""]}
			></View>
		</TouchableOpacity>
	);
}

export function ServiceCheckbox({
	id = "test",
	text = "option displayed",
	price = 100,
	checked = false,
	handleStatus = () => {}, //handle status change in checkboxes
}) {
	const [status, onChangeStatus] = React.useState(checked);
	const changeStatus = () => {
		handleStatus({ checked: !status, id: id });
		onChangeStatus(!status);
	};
	return (
		<TouchableOpacity
			style={styles.checkboxContainer}
			activeOpacity={0.6}
			onPress={(e) => changeStatus()}
		>
			<Text>
				{text},{price}
			</Text>
			<View
				style={[styles.checkboxMark, status ? styles.checkboxMarkActive : ""]}
			></View>
		</TouchableOpacity>
	);
}

export function CheckboxGroup({
	options = sampleOptions,
	handleCheckedServices,
}) {
	const initSelections = () => {
		let result = [];
		options.forEach((item) => {
			if (item.checked) result.push(item.id);
		});
		return result;
	};

	//selections: stored ids of checked options
	const [selections, onChangeSelections] = React.useState(
		initSelections(options)
	);
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
		return (
			<ServiceCheckbox
				id={item.id}
				text={item.type}
				price={item.price}
				checked={item.checked}
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
			/>
			{/* <Text>{selections}</Text> */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {},
	checkboxContainer: {
		width: "100%",
		flexDirection: "row",
		margin: 4,
		padding: 8,
		justifyContent: "space-between",
		alignItems: "center",
	},
	checkboxMark: {
		width: 24,
		height: 24,
		borderColor: "#666",
		borderWidth: 1,
		margin: 4,
	},
	checkboxMarkActive: {
		backgroundColor: "#666",
	},
	inputBox: {
		borderStyle: "solid",
		backgroundColor: 'white',
		paddingVertical: 12,
		marginHorizontal: 60,
		marginBottom: 40,
		borderRadius: 4,
	},
	inputText: {
		paddingLeft: 60,
		fontSize: fonts.body,
		color: colors.text
	},
	formGroup: {
		display:"flex",
	},


});
