import React from 'react';
import { TextInput, Text, View, FlatList, TouchableOpacity, Alert, Image, Button, StyleSheet } from 'react-native';

export class VehicleCard extends React.Component {
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
            <View style={styles.row}> 
                <View style={styles.col2}>
                    <Image
                    style={{width: "100%", height: 100}}
                    source={{ uri: item.imageURL }} />
                </View>
                <View style={styles.col2}>
                    <Text>{item.make}, {item.year}</Text>
                    <Text>{item.model}</Text>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    row:{
        flexDirection: "row",
        marginVertical: 8,
        marginHorizontal: 8,
    },
    col2: {//half of the row
        flex: 0.5,
        paddingHorizontal: 4,
    }
});