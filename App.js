import React from "react";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	split,
	HttpLink,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

// SCREENS-LOG IN, Sign up
import LoginScreen from "./js/screens/Login/LoginScreen";
import { SignUpScreen } from "./js/screens/SignUp/SignUpScreen";

// SCREENS-GET A QUOTE
import QuoteVehicleScreen from "./js/screens/QuoteVehicle/QuoteVehicleScreen";
import QuoteServiceScreen from "./js/screens/QuoteService/QuoteServiceScreen";
import QuoteReviewScreen from "./js/screens/QuoteReview/QuoteReviewScreen";
import QuoteCompleteScreen from "./js/screens/QuoteComplete/QuoteCompleteScreen";

// SCREENS-TASK

import { TaskListScreen } from "./js/screens/TaskList/TaskListScreen";
import { TaskDetailPastScreen }from "./js/screens/TaskDetailPast/TaskDetailPastScreen";
import TaskDetailPresentScreen from "./js/screens/TaskDetailPresent/TaskDetailPresentScreen";

import AddVehicleVINScreen from "./js/screens/AddVehicleVIN/AddVehicleVINScreen";
import AddVehicleManualScreen from "./js/screens/AddVehicleManual/AddVehicleManualScreen";
// import { VehicleListScreen } from "./js/screens/VehicleList/VehicleListScreen";
import { ScheduleScreen } from "./js/screens/Schedule/ScheduleScreen";

// SCREENS-PROFILE
import { ProfileScreen } from "./js/screens/Profile/ProfileScreen";
import { test1Screen } from "./test1Screen";
import { test2Screen } from "./test2Screen";


// =====
// nav dependencies
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";



// navigation
const Stack = createStackNavigator();

// connect to backend


const IP = "192.168.0.106";
// You will need to replace '192.168.1.126' with your IP address
const httpLink = new HttpLink({

	uri: `http://${IP}:4000/graphql`,
});

const wsLink = new WebSocketLink({
	uri: `ws://${IP}:4000/subscriptions`,
	options: {
		reconnect: true,
	},
});

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === "OperationDefinition" &&
			definition.operation === "subscription"
		);
	},
	wsLink,
	httpLink
);

const client = new ApolloClient({
	link: splitLink,
	cache: new InMemoryCache(),
});



export default function App() {
	return (
		<ApolloProvider client={client}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="LogIn">
					<Stack.Screen name="test1" component={test1Screen} 						options={{
							headerShown: false
					  }}/>
					<Stack.Screen name="test2" component={test2Screen} 						options={{
							headerShown: false
					  }}/>
					<Stack.Screen 
						name="LogIn" 
						component={LoginScreen} 
						options={{
							headerShown: false
					  }}/>
					<Stack.Screen 
						name="SignUp" 
						component={SignUpScreen} 
					  	options={{
							headerShown: false
					  }}/>
					{/* <Stack.Screen name="Register" component={RegisterScreen} /> */}

					<Stack.Screen name="TaskList" component={TaskListScreen} />
					<Stack.Screen
						name="TaskDetailPast"
						component={TaskDetailPastScreen}
					/>
					<Stack.Screen
						name="TaskDetailPresent"
						component={TaskDetailPresentScreen}
					/>

					{/* <Stack.Screen name="VehicleList" component={VehicleListScreen} /> */}
					<Stack.Screen name="AddVehicleVIN" component={AddVehicleVINScreen} />
					<Stack.Screen
						name="AddVehicleManual"
						component={AddVehicleManualScreen}
					/>
					<Stack.Screen name="Schedule" component={ScheduleScreen} />

					<Stack.Screen name="Profile" component={ProfileScreen} options={{
							headerShown: false
					  }}/>

					<Stack.Screen name="QuoteVehicle" component={ QuoteVehicleScreen } />
					<Stack.Screen name="QuoteService" component={QuoteServiceScreen} />
					<Stack.Screen name="QuoteReview" component={QuoteReviewScreen} />
					<Stack.Screen name="QuoteComplete" component={QuoteCompleteScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</ApolloProvider>
	);
}
