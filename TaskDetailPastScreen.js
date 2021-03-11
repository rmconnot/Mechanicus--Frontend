import React from 'react';
import { TextInput, Text, View, FlatList, TouchableOpacity, Alert, Image, Button } from 'react-native';
import { TaskDetailStyles } from './Styles';

export class TaskDetailPastScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentNoteList: {
                id:1,
				make:'Honda', 
				model:'CR-V', 
				year:"2019", 
				imageURL:'https://cka-dash.s3.amazonaws.com/131-1018-WTS230/mainimage.jpg',
                vin:'1234567890',
                scheduleDate: '3/3/2021 12:30pm',
                mechanician:'XXX XXX',
                phone: '123-456-7890',
                service: {
                    serviceOne: 'Vehicle inspection', 
                    serviceOnePrice: '$$$', 
                    serviceTwo: 'Oil Change', 
                    serviceTwoPrice: '$$$'}
			}
        }

    }



    render() {
        return (
            <View style={TaskDetailStyles.container}>
                <View style={TaskDetailStyles.headerSection}>
                    <View style={TaskDetailStyles.titleSection}>
                        <Text>{this.state.currentNoteList.make}, {this.state.currentNoteList.year}</Text>
                        <Text>{this.state.currentNoteList.vin}</Text>
                        <Text>{this.state.currentNoteList.scheduleDate}</Text>
                    </View>

                    <View style={TaskDetailStyles.timeline}>
                        <View style={TaskDetailStyles.timelineSection}>
                            <Image
                            style={TaskDetailStyles.timelineCircleIcon}
                            source={require('./images/circle-active.png')} />
                            <Text>confirm</Text>
                        </View>
                        
                        <Image
                            style={TaskDetailStyles.timelineLineIcon}
                            source={require('./images/line.png')} />
                        
                        <View style={TaskDetailStyles.timelineSection}>
                            <Image
                            style={TaskDetailStyles.timelineCircleIcon}
                            source={require('./images/circle.png')} />
                            <Text>repair</Text>
                        </View>
                        
                        <Image
                            style={TaskDetailStyles.timelineLineIcon}
                            source={require('./images/line.png')} />
                        
                        <View style={TaskDetailStyles.timelineSection}>
                            <Image
                            style={TaskDetailStyles.timelineCircleIcon}
                            source={require('./images/circle.png')} />
                            <Text>complete</Text>
                        </View>
                        
                    </View>

                </View>
                <View style={TaskDetailStyles.listContainer}>
                    <Text style={TaskDetailStyles.listTitle}>Mechanician</Text>
                    <View style={TaskDetailStyles.listItem}>
                        <Text>Name</Text>
                        <Text>{this.state.currentNoteList.mechanician}</Text>
                    </View>
                    <View style={TaskDetailStyles.listItem}>
                        <Text>Phone</Text>
                        <Text>            {this.state.currentNoteList.phone}</Text>
                    </View>

                </View>
                <View style={TaskDetailStyles.listCardContainer}>
                    <Text style={TaskDetailStyles.listTitle}>Vehicle</Text> 
                    <View style={TaskDetailStyles.listCardContent}> 
                        <View>
                            <Image
                            style={TaskDetailStyles.listImage}
                            source={{ uri: this.state.currentNoteList.imageURL }} />
                        </View>
                        <View style={TaskDetailStyles.listText}>
                            <Text>
                                 {this.state.currentNoteList.make}, {this.state.currentNoteList.year}
                            </Text>
                            <Text>
                                {this.state.currentNoteList.model}
                            </Text>
                        </View>              
                    </View>
                </View>

                <View style={TaskDetailStyles.listContainer}>
                    <Text style={TaskDetailStyles.listTitle}>Service</Text>
                    <View style={TaskDetailStyles.listItem}>
                        <Text>{this.state.currentNoteList.service.serviceOne}</Text>
                        <Text>     {this.state.currentNoteList.service.serviceOnePrice}</Text>
                    </View>
                    <View style={TaskDetailStyles.listItem}>
                        <Text>{this.state.currentNoteList.service.serviceTwo}</Text>
                        <Text>{this.state.currentNoteList.service.serviceTwoPrice}</Text>
                    </View>
                </View>

            </View>
        )
    }
}