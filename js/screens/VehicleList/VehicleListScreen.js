import React from 'react';
import { TextInput, Text, View, FlatList, TouchableOpacity, Alert, Image, Button } from 'react-native';
import { commonStyles } from '../../common/commonStyles';
import BottomNav from '../../common/BottomNav';
import { VehicleCard } from '../../common/Card';
import { styles } from './Styles';


export class VehicleListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentNoteList: [{
                id:"1",
				make:'Honda', 
				model:'CR-V', 
				year:"2019", 
				imageURL:'https://cka-dash.s3.amazonaws.com/131-1018-WTS230/mainimage.jpg'
			}, 
			{
                id:"2",
				make:'Toyota', 
				model:'Highlander', 
				year:"2021", 
				imageURL: 'https://www.motortrend.com/uploads/sites/5/2020/11/2021-Toyota-Highlander-XSE-30.jpg'
			}],
        }

    }

    render() {
        const renderItem = ({item}) => {
            return (
                <View style={commonStyles.cardShape}>
                    <VehicleCard item={item} />
                    <View style={styles.listButtonsContainer}>
                        <Button
                            title="Get a quote"
                            onPress={() => this.props.navigation.navigate("QuoteVehicle") }
                        />
                    </View>
                </View>
            );
        };
        return (
            <View style={styles.container}>
                <View style={styles.main}>
                    <View style={styles.headerSeection}>
                        <View style={styles.titleSection}>
                            <Text>Garage</Text>
                            <Button
                                title="Edit"
                                onPress={() => Alert.alert('jump to the edit page')}
                            />
                        </View>

                        <Button
                            title="Add a new vehicle"
                            onPress={() => Alert.alert('jump to the add page')}
                        />
                    </View>
                    <FlatList
                        data={this.state.currentNoteList}
                        renderItem={renderItem}
                    />
                </View>
                <BottomNav navigation={ this.props.navigation }/>
            </View>
        )
    }
}