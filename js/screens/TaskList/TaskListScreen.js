import React, { useState } from "react";
import { TextInput, Text, View, FlatList, TouchableOpacity, Alert, Image, Button, SafeAreaView} from 'react-native';
import BottomNav from '../../common/BottomNav';
import { TaskCard } from '../../common/Card';
import { useQuery } from "urql";
import { styles } from './Styles';

const quoteQuery = `query ($customerID: Int!) {
	quote (customerID: $customerID) {
        scheduleDate
        mechanician {
            firstName
            lastName
        }
        vehicle {
            year
            make
            model
            imgUrl
        }
        services {
            service {
                type
            }
        }
	}}`;

const sampleQuotes = [
	{
		scheduleDate: "03/04/2021",
		status: "confirm",
        services: [{
            price: 100,
            type: "Vehicle Inspection",
        },
    	{
            price: 110,
            type: "Oil change",
        }],
		mechanician: {
            firstName: 'Michael',
            lastName:'Williams',
            phone: "123-456-7890",
        },
		vehicle: {
            vin: "0987654321",
            vehicleType: "SUV",
            year: 2010,
            make: "Chevrolet",
            model: "Trailblazer",
            imgUrl:
                "https://www.gannett-cdn.com/presto/2020/07/10/PDTF/76f14475-53f5-4abe-ae0f-a4f4911c8be3-IMG_2481.JPG",
        },
	},

	{
		scheduleDate: "05/04/2021",
		status: "confirm",
        services: [{
            price: 100,
            type: "Vehicle Inspection",
        },
    	{
            price: 110,
              type: "Oil change",
        }],
		mechanicianID: {
            firstName: 'Bill',
            lastName:'Davis',
            phone: "123-456-7890",
        },
		vehicleID: {
            vin: "1122334455",
            vehicleType: "Truck",
            year: 2005,
            make: "Toyota",
            model: "Tundra",
            imgUrl:
                "https://www.toyota.com/imgix/responsive/images/mlp/colorizer/2021/tundra/8W2/1.png",
        }
	},
];

/* <TaskListScreen> */
export default function TaskListScreen({ navigation, route }) {
	// const { currentUser } = route.params;
	// console.log(currentUser);

	const [result, reexecuteQuery] = useQuery({
        query: quoteQuery,
        variables: {
            customerID: 1
        },
    });
    const { data, fetching, error } = result;

    if (fetching) return (<Text>Loading...</Text>);
    if (error) return (<Text>Oh no... {error.message}</Text>);

	const renderItemPast = ({item}) => {
		return (
			<TaskCard item={item} navigation={navigation} to="TaskDetailPast"/>
		);
	};
	const renderItemPresent = ({item}) => {
		return (
			<TaskCard item={item} navigation={navigation} to="TaskDetailPresent"/>
		);
	};

    // console.log(data.quote)

	return (
        <SafeAreaView style={styles.container}>
            <View style={styles.main }>
                <View style={styles.tabContainer}>
                    <Text style={styles.tab} >Tasks</Text>
                    <Text style={styles.tab} >Quotes</Text>
                </View>
                <Button
                    title={"Get a Quote"}
                    onPress={() => navigation.navigate("QuoteVehicle")}
                />
                <View>
                    <Text>Active tasks</Text>
                    <FlatList
                    data={data?data.quote:sampleQuotes}
                    renderItem={renderItemPresent}
                    />
                </View>
                <View>
                    <Text>Past tasks</Text>
                    <Text>March</Text>
                    <FlatList
                    data={data?data.quote:sampleQuotes}
                    renderItem={renderItemPast}
                    />
                </View>
            </View>
            <BottomNav navigation={ navigation }/>
        </SafeAreaView>
	);
}


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
