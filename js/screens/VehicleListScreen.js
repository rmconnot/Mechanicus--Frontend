import React from 'react';
import { TextInput, Text, View, FlatList, TouchableOpacity, Alert, Image, Button, StyleSheet } from 'react-native';
import BottomNav from '../common/BottomNav';

class VehicleCard extends React.Component {
    props: {
        item : Object,
    }

    static defaultProps = {
        item: {
            id:1,
            make:'Honda', 
            model:'CR-V', 
            year:"2019", 
            imageURL:'https://cka-dash.s3.amazonaws.com/131-1018-WTS230/mainimage.jpg'
        }
    }

    render(){
        const item = this.props.item;
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
    }
}

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
        const renderItem = ({item}) => {
            return (
                <VehicleCard item={item} />
            );
        };
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
                    renderItem={renderItem}
                />
                <View>
                    <BottomNav navigation={ this.props.navigation }/>
                </View>

            </View>
        )
    }
}

const VehicleListStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    headerSeection: {
        flex:0.8
    },
    TitleSection:{
        flex:0.3,
        flexDirection: 'row',
        
        alignItems: 'center',
        justifyContent: 'center',
    },
    listContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch', // this turns out to be important!
        width: '100%',
    },
    listCardContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.8,
        flexDirection: 'row',
        paddingLeft:20
    },
    listText: {
        flex: 0.5
    },
    listImage: {
        flex: 0.5
    },
    listButtonsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.8,
        flexDirection: 'row',
    },
    TabsContainer: {
        flex:0.5,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft:30,
    },
    TabButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 28,
        height: 28,
    },
});