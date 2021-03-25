import * as React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import BottomNav from "../../common/BottomNav";

/* <TaskListScreen> */
export default function TaskListScreen({ navigation, route }) {
	const { currentUser } = route.params;
	console.log(currentUser);
	return (
		<View style={styles.container}>
			<View>
				<Text>home page, task list</Text>
			</View>
			<BottomNav navigation={navigation} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-between",
	},
});

// *** NEED TO REFACTOR THIS TO A REACT FUNCTION COMPONENT ***

// import React from 'react';
// import { TextInput, Text, View, FlatList, TouchableOpacity, Alert, Image, Button, SafeAreaView} from 'react-native';
// import BottomNav from '../../common/BottomNav';
// import { TaskCard } from '../../common/Card';
// import { styles } from './Styles';

// const smapleTasksList = [{
//     id:'1',
//     make:'Honda',
//     model:'CR-V',
//     year:"2019",
//     scheduleDate: '3/3/2021 12:30pm',
//     mechanician:'XXX XXX',
//     phone: '123-456-7890',
//     service: {
//         serviceOne: 'vehicle inspection',
//         serviceOnePrice: '$$$',
//         serviceTwo: 'oil Change',
//         serviceTwoPrice: '$$$'
//     },
//     imageURL:'https://cka-dash.s3.amazonaws.com/131-1018-WTS230/mainimage.jpg'
// },
// {
//     id: '2',
//     make:'Toyota',
//     model:'Highlander',
//     year:"2021",
//     scheduleDate: '4/3/2021 13:20pm',
//     mechanician:'XXX XXX',
//     phone: '123-456-7890',
//     service: {
//         serviceOne: 'brake repaire',
//         serviceOnePrice: '$$$',
//         serviceTwo: 'oil Change',
//         serviceTwoPrice: '$$$'
//     },
//     imageURL: 'https://www.motortrend.com/uploads/sites/5/2020/11/2021-Toyota-Highlander-XSE-30.jpg'
// }];
// export class TaskListScreen extends React.Component {
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         const renderItemPast = ({item}) => {
//             return (
//                 <TaskCard item={item} navigation={this.props.navigation} to="TaskDetailPast"/>
//             );
//         };
//         const renderItemPresent = ({item}) => {
//             return (
//                 <TaskCard item={item} navigation={this.props.navigation} to="TaskDetailPresent"/>
//             );
//         };

//         return (
//         <SafeAreaView style={styles.container}>
//             <View style={styles.main }>
//                 <View style={styles.tabContainer}>
//                     <Text style={styles.tab} >Tasks</Text>
//                     <Text style={styles.tab} >Quotes</Text>
//                 </View>
//                 <Button
//                     title={"Get a Quote"}
//                     onPress={() => this.props.navigation.navigate("QuoteVehicle")}
//                 />
//                 <View>
//                     <Text>Active tasks</Text>
//                     <FlatList
//                     data={smapleTasksList}
//                     renderItem={renderItemPresent}
//                     />
//                 </View>
//                 <View>
//                     <Text>Past tasks</Text>
//                     <Text>March</Text>
//                     <FlatList
//                     data={smapleTasksList}
//                     renderItem={renderItemPast}
//                     />
//                 </View>
//             </View>
//             <BottomNav navigation={ this.props.navigation }/>
//         </SafeAreaView>
//         );
//     }
// }
