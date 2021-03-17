import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	Touchable,
	TouchableOpacity,
	Alert,
	Image,
	Button,
	View,
} from "react-native";
import { Provider, createClient, useQuery, useMutation } from "urql";
// =====
// SCREENS-LOG IN, REGISTER
import LoginScreen from './js/screens/LoginScreen';
import RegisterScreen from './js/screens/RegisterScreen';
// SCREENS-TASK
import {TaskListScreen} from './TaskListScreen';
// SCREENS-VEHICLE
// import VehicleListScreen from './js/screens/VehicleListScreen';
import AddVehicleVINScreen from './js/screens/AddVehicleVINScreen';
import AddVehicleManualScreen from './js/screens/AddVehicleManualScreen';
import { VehicleListScreen } from './VehicleListScreen';
import { TaskDetailPastScreen } from './TaskDetailPastScreen';
import { TaskDetailPresentScreen } from './TaskDetailPresentScreen';
// SCREENS-PROFILE
import ProfileScreen from './js/screens/ProfileScreen';
// =====
// nav dependencies
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


// navigation
const Stack = createStackNavigator();

// connect to backend
const client = createClient({
	url: "https://mechanicus--backend.herokuapp.com/graphql",
});

const getData = `
query {
	messages {
		id
		content
	}
}
`;

const Input = () => {
	const updateMessage = `mutation ($input: String!) {
		post(
			content: $input
		) {
			id
			content
		}}`;
	const [input, setInput] = useState("");
	const [request, makeRequest] = useMutation(updateMessage);

	const handleSubmission = () => {
		makeRequest({ input }).then((result) => {
			if (result.error) {
				console.error("Oh no!", result.error);
			}
		});
	};

	return (
		<View style={styles.requestView}>
			<TextInput
				style={styles.inputBox}
				onChangeText={(text) => setInput(text)}
			></TextInput>
			<TouchableOpacity style={styles.button} onPress={handleSubmission}>
				<Text>Submit content</Text>
			</TouchableOpacity>
		</View>
	);
};

const Messages = () => {
	const [result, reexecuteQuery] = useQuery({
		query: getData,
	});

	const { data, fetching, error } = result;

	if (fetching) return <Text>Loading...</Text>;
	if (error) return <Text>Oh no... {error.message}</Text>;

	return (
		<FlatList
			data={data.messages}
			renderItem={({ item }) => (
				<Text key={String(item.id)}>{item.content}</Text>
			)}
			style={styles.list}
		/>
	);
};

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="TaskList">
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Register" component={RegisterScreen} />

				<Stack.Screen name="TaskList" component={TaskListScreen} />
				<Stack.Screen name="TaskDetailPast" component={TaskDetailPastScreen} />
				<Stack.Screen name="TaskDetailPresent" component={TaskDetailPresentScreen} />

				<Stack.Screen name="VehicleList" component={VehicleListScreen} />
				<Stack.Screen name="AddVehicleVIN" component={AddVehicleVINScreen} />
				<Stack.Screen name="AddVehicleManual" component={AddVehicleManualScreen} />

				<Stack.Screen name="Profile" component={ProfileScreen} />


			</Stack.Navigator>
		</NavigationContainer>

	);
}





