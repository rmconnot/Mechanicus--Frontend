import React from 'react';
import { TextInput, Text, View, FlatList, TouchableOpacity, Alert, Image, Button } from 'react-native';
import { VehicleListStyles } from './Styles';

export class VehicleListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentNoteList: [{
                id:1,
				make:'Honda', 
				model:'CR-V', 
				year:"2019", 
				imageURL:'https://cka-dash.s3.amazonaws.com/131-1018-WTS230/mainimage.jpg'
			}, 
			{
                id:2,
				make:'Toyota', 
				model:'Highlander', 
				year:"2021", 
				imageURL: 'https://www.motortrend.com/uploads/sites/5/2020/11/2021-Toyota-Highlander-XSE-30.jpg'
			}],
        }

    }



    render() {
        return (
            <View style={VehicleListStyles.container}>
                <View style={VehicleListStyles.headerSeection}>
                    <View style={VehicleListStyles.TitleSection}>
                        <Text>Garage</Text>
                        <Button
                            title="Edit"
                            onPress={() => Alert.alert('jump to the edit page')}
                        />
                    </View>

                    <View>
                        <Button
                            title="Add a new vehicle"
                            onPress={() => Alert.alert('jump to the add page')}
                        />
                    </View>
                </View>
                <FlatList
                    data={this.state.currentNoteList}
                    renderItem={({ item }) => {
                        return (
                            <View style={VehicleListStyles.listContainer}>
                                <View style={VehicleListStyles.listCardContainer}> 
                                    <View style={VehicleListStyles.listImage}>
                                        <Image
                                        style={{width: 100, height: 100}}
                                        source={{ uri: item.imageURL }} />
                                    </View>
                                    <View style={VehicleListStyles.listText}>
                                        <Text>
                                        {item.make}, {item.year}
                                        </Text>
                                        <Text>
                                            {item.model}
                                         </Text>
                                    </View>
                                    
                                </View>
                                    <View style={VehicleListStyles.listButtonsContainer}>
                                        <Button
                                            title="Service history"
                                            onPress={() => Alert.alert('jump to the history page')}
                                        />
                                         <Button
                                            title="Get a quote"
                                            onPress={() => Alert.alert('jump to the quote page')}
                                        />
                                    </View>
                            </View>
                                    
                        ); 
                        
                    }}
                />
                <View>
                    <Button
                        title="Home"
                        onPress={() => Alert.alert('jump to the home page')}
                    />
                    <Button
                        title="Garage"
                        onPress={() => Alert.alert('refresh the garage page')}
                    />
                    <Button
                        title="Account"
                        onPress={() => Alert.alert('jump to the account page')}
                    />
                </View>

            </View>
        )
    }
}