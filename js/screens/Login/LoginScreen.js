import React, { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { State } from "react-native-gesture-handler";
import styles from "./Styles";
import { gql, useLazyQuery } from "@apollo/client";
import { colors, commonStyles } from "../../common/Style";
import { BtnLarge } from "../../common/Buttons";
import { Icon } from "../../common/Svg";

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
	const [pswVisibility, setPswVisibility] = useState(false);

	const [getCustomer, { data, error, loading }] = useLazyQuery(CUSTOMER_QUERY, {
		onError: (error) => {
			console.error(JSON.stringify(error, null, 2)),
				Alert.alert("Login error", "Invalid login credentials", [
					{ text: "OK", style: "OK" },
				]);
		},
	});

	if (loading) console.log("Loading...");
	if (error) if (data) console.log("data: ", data);

	useEffect(() => {
		if (!error && data != undefined) {
			// console.log("data: ", data);
			// navigation.navigate("TaskList", {
			// 	currentUser: {
			// 		id: data.customer.id,
			// 	},
			// });
			console.log("Using effect");
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
		<View style={commonStyles.pageContainer}>
			<View style={[styles.row, styles.title]}>
				<Text style={commonStyles.h1}>Log In</Text>
			</View>
			<View style={styles.content}>
				<Text style={[commonStyles.body, styles.label]}>Email</Text>
				<TextInput
					style={commonStyles.inputBox}
					placeholder="Enter your email address"
					placeholderTextColor={colors.gray4}
					autoCapitalize="none"
					onChangeText={(text) =>
						setInput((prevState) => ({ ...prevState, email: text.trim() }))
					}
				/>

				<Text style={[commonStyles.body, styles.label]}>Password</Text>

				<View style={styles.pswContainer}>
					<TextInput
						style={[commonStyles.inputBox, styles.pswInput]}
						secureTextEntry={!pswVisibility}
						placeholder="Enter your password"
						placeholderTextColor={colors.gray4}
						autoCapitalize="none"
						onChangeText={(text) =>
							setInput((prevState) => ({ ...prevState, password: text.trim() }))
						}
					/>
					<TouchableOpacity
						style={styles.pswBtn}
						onPress={() => setPswVisibility(!pswVisibility)}
					>
						<Icon size={24} name={pswVisibility ? "eye_open" : "eye_close"} />
					</TouchableOpacity>
				</View>
			</View>
			<BtnLarge title="Log In" onPress={handleLogin} />

			<TouchableOpacity
				style={[styles.row, styles.optionRow]}
				onPress={() => navigation.navigate("SignUp")}
			>
				<Text style={commonStyles.note}>Does not have an account? </Text>
				<Text style={[commonStyles.note, styles.signUpText]}>Sign up</Text>
			</TouchableOpacity>

			<TouchableOpacity style={[styles.row, styles.optionRow]}>
				<Text style={commonStyles.note}>Forgot Password?</Text>
			</TouchableOpacity>
		</View>
	);
}
