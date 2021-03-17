import React from 'react';
import { TextInput, Text, View, FlatList, TouchableOpacity, Alert, Image, Button} from 'react-native';
import BottomNav from './js/common/BottomNav';
import { TaskListStyles, VehicleListStyles } from './Styles';


export class TaskListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentNoteList: [{
                id:'1',
				make:'Honda', 
				model:'CR-V', 
				year:"2019", 
                scheduleDate: '3/3/2021 12:30pm',
                mechanician:'XXX XXX',
                phone: '123-456-7890',
                service: {
                    serviceOne: 'vehicle inspection', 
                    serviceOnePrice: '$$$', 
                    serviceTwo: 'oil Change', 
                    serviceTwoPrice: '$$$'
                },
				imageURL:'https://cka-dash.s3.amazonaws.com/131-1018-WTS230/mainimage.jpg'
			}, 
			{
                id: '2',
				make:'Toyota', 
				model:'Highlander', 
				year:"2021", 
                scheduleDate: '4/3/2021 13:20pm',
                mechanician:'XXX XXX',
                phone: '123-456-7890',
                service: {
                    serviceOne: 'brake repaire', 
                    serviceOnePrice: '$$$', 
                    serviceTwo: 'oil Change', 
                    serviceTwoPrice: '$$$'
                },
				imageURL: 'https://www.motortrend.com/uploads/sites/5/2020/11/2021-Toyota-Highlander-XSE-30.jpg'
			}],
        }

    }



    render() {
        return (
            <View style={TaskListStyles.container}>
                <View style={TaskListStyles.headerSection}>
                    <Text>Home</Text>
                    <View style={TaskListStyles.headerBtn}>
                        <Button
                                title="Tasks"
                                onPress={() => Alert.alert('jump to the tasks page')}
                        /> 
                        <Button
                                title="Quotes"
                                onPress={() => Alert.alert('jump to the quotes page')}
                        /> 
                    </View>
                    <Button
                                title="Get a quote"
                                onPress={() => Alert.alert('jump to getting quote page')}
                        /> 
                </View>

                <View style={TaskListStyles.taskContainer}>
                    <Text>Active tasks</Text>
                    <View>
                    <FlatList
                    data={this.state.currentNoteList}
                    renderItem={({ item }) => {
                        return (
                            <View style={TaskListStyles.listContainer}>
                                <View style={TaskListStyles.listCardContainer}> 
                                    <View style={TaskListStyles.listImage}>
                                        <Image
                                        style={{width: 100, height: 100}}
                                        source={{ uri: item.imageURL }} />
                                    </View>
                                    <View style={TaskListStyles.listText}>
                                        <Text>
                                        {item.make}, {item.year}
                                        </Text>
                                        <Text>
                                            {item.model}
                                         </Text>
                                         <Text>{item.scheduleDate}</Text>
                                         <Text>Service: {item.service.serviceOne}, {item.service.serviceTwo}</Text>
                                         <Text>Mechanician: {item.mechanician}</Text>
                                    </View>
                                    
                                </View>
                            </View>
                                    
                                ); 
                                
                            }}
                     />
                    </View>
                </View>

                <View style={TaskListStyles.taskContainer}>
                    <Text>Past tasks</Text>
                    <View>
                        <Text>March</Text>
                        <FlatList
                        data={this.state.currentNoteList}
                        renderItem={({ item }) => {
                            return (
                                <View style={TaskListStyles.listContainer}>
                                    <View style={TaskListStyles.listCardContainer}> 
                                        <View style={TaskListStyles.listImage}>
                                            <Image
                                            style={{width: 100, height: 100}}
                                            source={{ uri: item.imageURL }} />
                                        </View>
                                        <View style={TaskListStyles.listText}>
                                            <Text>
                                            {item.make}, {item.year}
                                            </Text>
                                            <Text>
                                                {item.model}
                                            </Text>
                                            <Text>{item.scheduleDate}</Text>
                                            <Text>Service: {item.service.serviceOne}, {item.service.serviceTwo}</Text>
                                            <Text>Mechanician: {item.mechanician}</Text>
                                        </View>
                                        
                                    </View>
                                </View>
                                        
                                    ); 
                                    
                                }}
                        />
                    </View>
                </View>

                <View>
                    <BottomNav navigation={ this.props.navigation }/>
                </View>

            </View>
        )
    }
}