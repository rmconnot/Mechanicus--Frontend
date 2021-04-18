import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "./Styles";
import { gql, useMutation } from "@apollo/client";
import {colors, fonts, commonStyles} from '../../common/Style';
import {BtnLarge} from '../../common/Buttons'
import {Icon} from '../../common/Svg'

const CUSTOMER_MUTATION = gql`
	mutation($email: String!, $phone: String!, $password: String!) {
		createCustomer(email: $email, phone: $phone, password: $password) {
			id
		}
	}
`;

export const SignUpScreen = ({ navigation }) => {
	const [input, setInput] = useState({
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
	});
	const [makeRequest, { data }, error] = useMutation(CUSTOMER_MUTATION, {
		onError: (error) => console.error(`Error! ${error}`),
	});

	const passwordValidation = () => {
		if (input.password != input.confirmPassword) {
			Alert.alert("Password error", "Passwords do not match", [
				{ text: "OK", style: "OK" },
			]);
			return false;
		} else if (input.password.length < 6) {
			Alert.alert(
				"Password error",
				"Password length must exceed 6 characters",
				[{ text: "OK", style: "OK" }]
			);
			return false;
		}
		return true;
	};

	const phoneValidation = () => {
		if (input.phone.length != 12) {
			Alert.alert("Phone number error", "Invalid phone number", [
				{ text: "OK", style: "OK" },
			]);
			return false;
		}
		return true;
	};

	const handleSubmission = async () => {
		let validPassword = await passwordValidation();
		let validPhone = await phoneValidation();
		if (validPassword && validPhone) {
			makeRequest({
				variables: {
					email: input.email,
					phone: input.phone,
					password: input.password,
				},
			}).then((result) => {
				if (result != undefined) {
					navigation.navigate("TaskList", {
						currentUser: {
							id: result.data.createCustomer.id,
						},
					});
					return;
				}
			});
		}
	};

	const [status, onChangeStatus] = React.useState('false');
	const changeStatus = () => {
		onChangeStatus(!status);
	};

	return (
		<View style={commonStyles.pageContainer}>
			<View style={[styles.row, styles.title]}>
				<Text style={commonStyles.h1}>Sign Up</Text>
			</View>
			<View style={styles.content}>
				<Text style={[commonStyles.body, styles.label]}>Email</Text>
				<TextInput
					style={styles.inputBox}
					placeholder="username@email.address"
					placeholderTextColor={colors.gray4}
					autoCapitalize="none"
					onChangeText={(text) =>
						setInput((prevState) => ({ ...prevState, email: text.trim() }))
					}
				/>
			
				<Text style={[commonStyles.body, styles.label]}>Phone</Text>
				<TextInput
					style={styles.inputBox}
					placeholder="123-456-7890"
					placeholderTextColor={colors.gray4}
					autoCapitalize="none"
					onChangeText={(text) =>
						setInput((prevState) => ({ ...prevState, phone: text.trim() }))
					}
				/>
			
				<Text style={[commonStyles.body, styles.label]}>Password</Text>
				<TextInput
					secureTextEntry={true}
					style={styles.inputBox}
					placeholder="8 digit numbers"
					placeholderTextColor={colors.gray4}
					autoCapitalize="none"
					onChangeText={(text) =>
						setInput((prevState) => ({ ...prevState, password: text.trim() }))
					}
				/>
			
				<Text style={[commonStyles.body, styles.label]}>Confirm password</Text>
				<TextInput
					secureTextEntry={true}
					style={styles.inputBox}
					placeholder="8 digit numbers"
					placeholderTextColor={colors.gray4}
					autoCapitalize="none"
					onChangeText={(text) =>
						setInput((prevState) => ({
							...prevState,
							confirmPassword: text.trim(),
						}))
					}
				/>
			

			<View style={styles.policyContainer}>
				
				<TouchableOpacity
					activeOpacity={0.6}
					onPress={(e) => changeStatus()}
					
					>
					<View 
						style={[styles.checkboxMark, status ? styles.checkboxMarkActive : ""]}>
							<Icon name='complete' color = {"white"} size = {16}/>
					</View>

				</TouchableOpacity>
				<Text style={[commonStyles.note, {marginLeft:8}]} >
					I agree with Mechanicus's terms and policies
				</Text>
			</View>
			</View>

			<BtnLarge title="Sign Up" onPress={handleSubmission}/>
			
			<TouchableOpacity 
			style={[styles.row, styles.optionRow]}
			onPress={() => navigation.navigate("LogIn")}
			>
				<Text style={commonStyles.note}>Already have an account?  </Text>
				<Text style={[commonStyles.note, {color: colors.primaryDark}]}>Log in</Text>
			</TouchableOpacity>
		</View>
	);
};
