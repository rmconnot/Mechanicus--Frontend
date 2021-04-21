import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "./Styles";
import { gql, useMutation } from "@apollo/client";
import axios from "axios";
import { colors, fonts, commonStyles } from "../../common/Style";
import { BtnLarge, BtnSmall } from "../../common/Buttons";
import { Icon } from "../../common/Svg";

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
		verificationCodeInput: "",
	});

	let isCodeValid = false;
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

	const codeValidation = async () => {
		var axios = require("axios");
		let newCode = input.verificationCodeInput;

		var config = {
			method: "get",
			url: `https://api.dexatel.com/v1/verify/code?code=${newCode}&phone=1${input.phone}`,
			headers: {
				token: "a7f963318147e003908047e6f1c0b2d3",
				"Content-Type": "application/json",
			},
			data: "",
		};

		await axios(config)
			.then(function (response) {
				console.log(JSON.stringify(response.data));
				isCodeValid = true;
			})
			.catch(function (error) {
				console.log(error);
			});
		if (isCodeValid == false) {
			Alert.alert("Phone Verification failed", "Please check and try again", [
				{ text: "OK", style: "OK" },
			]);
		}
	};

	const sendVerification = async () => {
		var axios = require("axios");
		var data = JSON.stringify({
			phone: `1${input.phone}`,
			sender_name: "Mechanic Support",
			template: "Your activation code is {{code}}.",
		});

		var config = {
			method: "post",
			url: "https://api.dexatel.com/v1/verify/phone",
			headers: {
				token: "a7f963318147e003908047e6f1c0b2d3",
				"Content-Type": "application/json",
			},
			data: data,
		};

		await axios(config)
			.then(function (response) {
				console.log(JSON.stringify(response.data));
			})
			.catch(function (error) {
				console.log(error);
			});
		Alert.alert(
			"Thank you",
			"The verification code has been sent to your phone",
			[{ text: "OK", style: "OK" }]
		);
	};

	const handleSubmission = async () => {
		let validPassword = await passwordValidation();
		let validPhone = await phoneValidation();
		if (validPhone) await codeValidation();
		if (isCodeValid && validPassword && validPhone) {
			/*
			const { result } = await SMS.sendSMSAsync(
				input.phone,
				'My sample HelloWorld message'
			);*/

			console.log("here");

			makeRequest({
				variables: {
					email: input.email,
					phone: input.phone,
					password: input.password,
					vehicles: [],
				},
			}).then((result) => {
				if (result != undefined) {
					/*
					navigation.navigate("TaskList", {
						currentUser: {
							id: result.data.createCustomer.id,
						},
					});
					return;*/
					navigation.navigate("LogIn");
				}
			});
		}
	};

	const [status, onChangeStatus] = React.useState("false");
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
					style={commonStyles.inputBox}
					placeholder="username@email.address"
					placeholderTextColor={colors.gray4}
					autoCapitalize="none"
					onChangeText={(text) =>
						setInput((prevState) => ({ ...prevState, email: text.trim() }))
					}
				/>

				<Text style={[commonStyles.body, styles.label]}>Phone</Text>
				<TextInput
					style={commonStyles.inputBox}
					placeholder="123-456-7890"
					placeholderTextColor={colors.gray4}
					autoCapitalize="none"
					onChangeText={(text) =>
						setInput((prevState) => ({ ...prevState, phone: text.trim() }))
					}
				/>

				<Text style={[commonStyles.body, styles.label]}>Verification</Text>
				<View style={styles.codeContainer}>
					<TextInput
						style={[commonStyles.inputBox, styles.codeInput]}
						placeholder="Verification code"
						placeholderTextColor={colors.gray4}
						autoCapitalize="none"
						onChangeText={(text) =>
							setInput((prevState) => ({
								...prevState,
								verificationCodeInput: text.trim(),
							}))
						}
					/>
					<BtnSmall title="send code" onPress={sendVerification} />
				</View>

				<Text style={[commonStyles.body, styles.label]}>Password</Text>
				<TextInput
					secureTextEntry={true}
					style={commonStyles.inputBox}
					placeholder="8 digit numbers"
					placeholderTextColor={colors.gray4}
					autoCapitalize="none"
					onChangeText={(text) =>
						setInput((prevState) => ({
							...prevState,
							password: text.trim(),
						}))
					}
				/>

				<Text style={[commonStyles.body, styles.label]}>Confirm Password</Text>
				<TextInput
					secureTextEntry={true}
					style={commonStyles.inputBox}
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
			</View>

			<BtnLarge title="Sign Up" onPress={handleSubmission} />

			<TouchableOpacity
				style={[styles.row, styles.optionRow]}
				onPress={() => navigation.navigate("LogIn")}
			>
				<Text style={commonStyles.note}>Already have an account? </Text>
				<Text style={[commonStyles.note, { color: colors.primaryDark }]}>
					Log in
				</Text>
			</TouchableOpacity>
		</View>
	);
};
