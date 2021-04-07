import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "./Styles";
import { gql, useMutation } from "@apollo/client";

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
		if (input.phone.length != 10) {
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
			/*
			const { result } = await SMS.sendSMSAsync(
				input.phone,
				'My sample HelloWorld message'
			);*/
			
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
		<View style={styles.container}>
			<Text style={styles.logo}>Create Account</Text>
			<View style={styles.inputView}>
				<TextInput
					style={styles.inputText}
					placeholder="Enter your Email"
					placeholderTextColor="#003f5c"
					autoCapitalize="none"
					onChangeText={(text) =>
						setInput((prevState) => ({ ...prevState, email: text.trim() }))
					}
				/>
			</View>
			<View style={styles.inputView}>
				<TextInput
					style={styles.inputText}
					placeholder="Enter your phone number"
					placeholderTextColor="#003f5c"
					autoCapitalize="none"
					onChangeText={(text) =>
						setInput((prevState) => ({ ...prevState, phone: text.trim() }))
					}
				/>
			</View>
			<View style={styles.inputView}>
				<TextInput
					// secureTextEntry
					style={styles.inputText}
					placeholder="Enter your Password"
					placeholderTextColor="#003f5c"
					autoCapitalize="none"
					onChangeText={(text) =>
						setInput((prevState) => ({ ...prevState, password: text.trim() }))
					}
				/>
			</View>
			<View style={styles.inputView}>
				<TextInput
					// secureTextEntry
					style={styles.inputText}
					placeholder="Confirm your Password"
					placeholderTextColor="#003f5c"
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
