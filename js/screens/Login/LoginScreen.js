import React, { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { State } from "react-native-gesture-handler";
import styles from "./Styles";
import { gql, useLazyQuery } from "@apollo/client";
import {colors, fonts, commonStyles} from '../../common/Style';
import {BtnLarge} from '../../common/Buttons'

/* <LoginScreen> */

const CUSTOMER_QUERY = gql`
	query($email: String!, $password: String!) {
		customer(email: $email, password: $password) {
			id
		}
	}
`;

export default function Login({ navigation }) {
	const [input, setInput] = useState({
		email: "",
		password: "",
	});

	const [getCustomer, { data, error, loading }] = useLazyQuery(CUSTOMER_QUERY, {
		onError: (error) => console.log(JSON.stringify(error, null, 2)),
	});

	if (loading) console.log("Loading...");
	if (error) console.error(`Error! ${error.message}`);

	useEffect(() => {
		if (!error && data != undefined) {
			// console.log("data: ", data);
			// navigation.navigate("TaskList", {
			// 	currentUser: {
			// 		id: data.customer.id,
			// 	},
			// });
			navigation.reset({
				index: 0,
				routes: [
					{
						name: "TaskList",
						params: { currentUser: { id: data.customer.id } },
					},
				],
			});
		}
	});

	const handleLogin = async () => {
		getCustomer({
			variables: { email: input.email, password: input.password },
		});
	};

	return (
		<View>
			<Text style={styles.title}>Log In</Text>
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
				<Text style={styles.inputText}>Password</Text>
				<TextInput
					// secureTextEntry
					style={styles.inputBox}
					placeholder="    8 digit numbers numbers"
					placeholderTextColor={colors.gray4}
					autoCapitalize="none"
					onChangeText={(text) =>
						setInput((prevState) => ({ ...prevState, password: text.trim() }))
					}
				/>
			</View>
			<BtnLarge   title = "Log In" onPress={handleLogin}/>
			<TouchableOpacity 
				style={styles.signUpBtn}
				onPress={() => navigation.navigate("SignUp")}>
				<Text style={styles.notificationText}>Does not have an account?</Text>
				<Text style={styles.signUpText}>Sign up</Text>
			</TouchableOpacity>
			<TouchableOpacity>
				<Text style={styles.forgot}>Forgot Password?</Text>
			</TouchableOpacity>
		</View>
	);
}
