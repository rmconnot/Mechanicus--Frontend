import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "./Styles";
import { gql, useMutation } from "@apollo/client";
import {colors, fonts, commonStyles} from '../../common/Style';

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

	return (
		<View>
			<Text style={styles.title}>Sign Up</Text>
			<View>
				<Text style={styles.inputText}>Email</Text>
				<TextInput
					style={styles.inputBox}
					placeholder="    username@email.address"
					placeholderTextColor={colors.gray4}
					autoCapitalize="none"
					onChangeText={(text) =>
						setInput((prevState) => ({ ...prevState, email: text.trim() }))
					}
				/>
			</View>
			<View>
				<Text style={styles.inputText}>Phone</Text>
				<TextInput
					style={styles.inputBox}
					placeholder="    123-456-7890"
					placeholderTextColor={colors.gray4}
					autoCapitalize="none"
					onChangeText={(text) =>
						setInput((prevState) => ({ ...prevState, phone: text.trim() }))
					}
				/>
			</View>
			<View>
				<Text style={styles.inputText}>Password</Text>
				<TextInput
					// secureTextEntry
					style={styles.inputBox}
					placeholder="    8 digit numbers"
					placeholderTextColor={colors.gray4}
					autoCapitalize="none"
					onChangeText={(text) =>
						setInput((prevState) => ({ ...prevState, password: text.trim() }))
					}
				/>
			</View>
			<View>
				<Text style={styles.inputText}>Confirm password</Text>
				<TextInput
					// secureTextEntry
					style={styles.inputBox}
					placeholder="    8 digit numbers"
					placeholderTextColor={colors.gray4}
					autoCapitalize="none"
					onChangeText={(text) =>
						setInput((prevState) => ({
							...prevState,
							confirmPassword: text.trim(),
						}))
					}
				/>
			</View>
			<TouchableOpacity style={styles.registerBtn} onPress={handleSubmission}>
				<Text style={styles.registerText}>Register as New User</Text>
			</TouchableOpacity>
			{/* <TouchableOpacity
				style={styles.cancelBtn}
				onPress={() => {
					this.props.navigation.goBack();
				}}
			>
				<Text style={styles.cancelText}>Cancel</Text>
			</TouchableOpacity> */}
		</View>
	);
};
