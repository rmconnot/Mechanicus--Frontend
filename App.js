import React from "react";
import { Provider, createClient } from "urql";

// SCREENS-LOG IN, REGISTER
import LoginScreen from "./js/screens/Login/LoginScreen";
import { SignUpScreen } from "./js/screens/SignUp/SignUpScreen";
import RegisterScreen from "./js/screens/Register/RegisterScreen";

// SCREENS-GET A QUOTE
import QuoteVehicleScreen from "./js/screens/QuoteVehicle/QuoteVehicleScreen";
import QuoteServiceScreen from "./js/screens/QuoteService/QuoteServiceScreen";
import QuoteReviewScreen from "./js/screens/QuoteReview/QuoteReviewScreen";

// SCREENS-TASK
import { TaskListScreen } from "./js/screens/TaskList/TaskListScreen";
import { TaskDetailPastScreen } from "./js/screens/TaskDetailPast/TaskDetailPastScreen";
import { TaskDetailPresentScreen } from "./js/screens/TaskDetailPresent/TaskDetailPresentScreen";

import AddVehicleVINScreen from "./js/screens/AddVehicleVIN/AddVehicleVINScreen";
import AddVehicleManualScreen from "./js/screens/AddVehicleManual/AddVehicleManualScreen";
import { VehicleListScreen } from "./js/screens/VehicleList/VehicleListScreen";
import { ScheduleScreen } from "./js/screens/Schedule/ScheduleScreen";

// SCREENS-PROFILE
import ProfileScreen from "./js/screens/Profile/ProfileScreen";

// =====
// nav dependencies
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// navigation
const Stack = createStackNavigator();

// connect to backend
const client = createClient({
	url: "http://localhost:5000/graphql",
});

// const getData = `
// query {
// 	messages {
// 		id
// 		content
// 	}
// }
// `;

// const Input = () => {
// 	const updateMessage = `mutation ($input: String!) {
// 		post(
// 			content: $input
// 		) {
// 			id
// 			content
// 		}}`;
// 	const [input, setInput] = useState("");
// 	const [request, makeRequest] = useMutation(updateMessage);

// 	const handleSubmission = () => {
// 		makeRequest({ input }).then((result) => {
// 			if (result.error) {
// 				console.error("Oh no!", result.error);
// 			}
// 		});
// 	};

// 	return (
// 		<View style={styles.requestView}>
// 			<TextInput
// 				style={styles.inputBox}
// 				onChangeText={(text) => setInput(text)}
// 			></TextInput>
// 			<TouchableOpacity style={styles.button} onPress={handleSubmission}>
// 				<Text>Submit content</Text>
// 			</TouchableOpacity>
// 		</View>
// 	);
// };

// const Messages = () => {
// 	const [result, reexecuteQuery] = useQuery({
// 		query: getData,
// 	});

// 	const { data, fetching, error } = result;

// 	if (fetching) return <Text>Loading...</Text>;
// 	if (error) return <Text>Oh no... {error.message}</Text>;

// 	return (
// 		<FlatList
// 			data={data.messages}
// 			renderItem={({ item }) => (
// 				<Text key={String(item.id)}>{item.content}</Text>
// 			)}
// 			style={styles.list}
// 		/>
// 	);
// };

export default function App() {
	return (
		<Provider value={client}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="TaskList">
					<Stack.Screen name="LogIn" component={LoginScreen} />
					<Stack.Screen name="SignUp" component={SignUpScreen} />
					<Stack.Screen name="Register" component={RegisterScreen} />

					<Stack.Screen name="TaskList" component={TaskListScreen} />
					<Stack.Screen
						name="TaskDetailPast"
						component={TaskDetailPastScreen}
					/>
					<Stack.Screen
						name="TaskDetailPresent"
						component={TaskDetailPresentScreen}
					/>

					<Stack.Screen name="VehicleList" component={VehicleListScreen} />
					<Stack.Screen name="AddVehicleVIN" component={AddVehicleVINScreen} />
					<Stack.Screen
						name="AddVehicleManual"
						component={AddVehicleManualScreen}
					/>
					<Stack.Screen name="Schedule" component={ScheduleScreen} />

					<Stack.Screen name="Profile" component={ProfileScreen} />

					<Stack.Screen name="QuoteVehicle" component={QuoteVehicleScreen} />
					<Stack.Screen name="QuoteService" component={QuoteServiceScreen} />
					<Stack.Screen name="QuoteReview" component={QuoteReviewScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
