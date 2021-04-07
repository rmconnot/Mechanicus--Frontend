import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { State } from "react-native-gesture-handler";
import styles from "./Styles";
import { gql, useLazyQuery } from "@apollo/client";

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

	if (!error && data != undefined) {
		console.log("data: ", data);
		// navigation.navigate("TaskList", {
		// 	currentUser: {
		// 		id: data.customer.id,
		// 	},
		// });
		navigation.reset({
			index: 0,
			routes: [
				{ name: "TaskList", params: { currentUser: { id: data.customer.id } } },
			],
		});
	}

	const handleLogin = async () => {
		getCustomer({
			variables: { email: input.email, password: input.password },
		});
	};

	return (
		<View style={styles.container}>
			<Text style={styles.logo}>Mechanicus</Text>
			<View style={styles.inputView}>
				<TextInput
					style={styles.inputText}
					placeholder="Email..."
					placeholderTextColor="#003f5c"
					autoCapitalize="none"
					onChangeText={(text) =>
						setInput((prevState) => ({ ...prevState, email: text.trim() }))
					}
				/>
			</View>
			<View style={styles.inputView}>
				<TextInput
					// secureTextEntry
					style={styles.inputText}
					placeholder="Password..."
					placeholderTextColor="#003f5c"
					autoCapitalize="none"
					onChangeText={(text) =>
						setInput((prevState) => ({ ...prevState, password: text.trim() }))
					}
				/>
			</View>
			<TouchableOpacity>
				<Text style={styles.forgot}>Forgot Password?</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
				<Text style={styles.loginText}>LOGIN</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.signUpBtn}
				onPress={() => navigation.navigate("SignUp")}
			>
				<Text style={styles.signUpText}>Signup</Text>
			</TouchableOpacity>
		</View>
	);
}
