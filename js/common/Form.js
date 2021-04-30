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
	selections,
	checked = false,
	handleStatus = () => {}, //handle status change in checkboxes
}) {
	const { id, type, price, parts, laborTime } = item;
	const [status, onChangeStatus] = React.useState(checked),
		  [toggled, setToggled] = React.useState(true);

	const changeStatus = () => {
		handleStatus({ 
			serviceID: id, 
			cost: price || laborTime*95 , 
			service: item,
		});
		if(!status) setToggled(false);
		onChangeStatus(!status);
	};
	
	const partChecked = (part) => {
		for(let i = 0; i < selections.length; i++ ){
			let obj = selections[i];
			if("partID" in obj && obj.partID==part.id) return true;
		}
		return false;
	};
	
	const renderPartItem = ({item}) => (
		<PartCheckbox 
		item={item} 
		checked={partChecked(item)}
		handleStatus={handleStatus}
		/>);

	
	return (
		<View style={[
			commonStyles.shadowDefault, styles.card, 
			status ? styles.active : null,
		]}>
			<View style={[commonStyles.rowSpread, styles.option]}>
				<TouchableOpacity 
				style={[commonStyles.rowLeft, {flex: 2/3}]} 
				onPress={changeStatus} 
				>
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
					disabled={!(parts && parts.length>0)}
					>
						<Icon name={toggled?"arrow_down":"arrow_top"} color={parts && parts.length>0?colors.gray3 : colors.gray5} size={24}/>
					</TouchableOpacity>
				</View>
			</View>

			{toggled ? null : (
				<View>
				<View style={styles.dividingLine}></View>
					<FlatList
					data={parts}
					renderItem={renderPartItem}
					keyExtractor={(item) => item.id.toString()}
					/>
				</View>
			)}
		</View>
	);
}
export function PartCheckbox({
	item,
	checked = false,
	handleStatus,
}) {
	const {id, type, price} = item,
		  [status, onChangeStatus] = useState(checked);

	const changeStatus = () => {
		handleStatus({ 
			partID: id, 
			cost: price, 
			part: item,
		});
		onChangeStatus(!status);
	};

	return (
		<TouchableOpacity
		onPress = {changeStatus}
		style={[
			commonStyles.rowSpread, styles.option, 
			status?styles.partActive:styles.partInactive]}
		>
			<View style={commonStyles.rowLeft}>
				<Icon name="complete" size={18} color={
					checked? colors.primaryDark : "transparent"
				}/>
				<Text style={[commonStyles.body, {marginLeft:12}]}>{type}</Text>
			</View>
			<View style={commonStyles.rowLeft}>
				<Icon name="money" size={18} color={checked? colors.primaryDark : colors.gray4}/>
				<Text style={commonStyles.body}>{price.toFixed(1)}</Text>
			</View>
		</TouchableOpacity>
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
		let index = find_bill_item(item);
		//if item is not checked and exist in selections, remove it from selections
		if (index != -1) {
			temp.splice(index, 1);
		} //if item is checked and not in selections, add it in
		else if (index == -1) {
			temp.push(item);
		}
		// console.log(selections);
		onChangeSelections(temp);
		handleCheckedServices(temp);
	};
	const find_bill_item = (item) => {
		if(selections.length<=0) return -1;
		if("serviceID" in item){
			for(let i=0; i<selections.length;i++){
				let obj = selections[i];
				if("serviceID" in obj && obj.serviceID==item.serviceID) return i;
			}
		} else if ("partID" in item) {
			for(let i=0; i<selections.length;i++){
				let obj = selections[i];
				if("partID" in obj && obj.partID==item.partID) return i;
			}
		}
		return -1;
	};

	const serviceChecked = (service) => {
		if(selections.length<=0) return false;
		for(let i = 0; i < selections.length; i++ ){
			let obj = selections[i];
			if("serviceID" in  obj && obj.serviceID==service.id) return true;
		}
		return false;
	};

	const renderItem = ({ item }) => {
		if (item.options) {
			return <SubOptions item={item} handleStatus={handleStatus} />;
		}
		return (
			<ServiceCheckbox
				item={item}
				selections={selections}
				checked={serviceChecked(item)}
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
		backgroundColor: "white",
	},
	card: {
        backgroundColor: colors.gray6,
        borderRadius: 8,
        marginBottom: 12,
	},
	option: {
		// backgroundColor: "white",
		padding: 12,
		borderRadius: 8,
	},
	dividingLine: {
		borderTopWidth: 1,
		borderTopColor: colors.gray5,
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
		width: 18,
		height: 18,
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
	partActive: {
		backgroundColor: "white",
	},
	partInactive: {
		backgroundColor: colors.gray6,
	},
});
