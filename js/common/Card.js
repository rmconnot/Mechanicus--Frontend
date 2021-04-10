import React from 'react';
import { TextInput, Text, View, FlatList, TouchableOpacity, Alert, Image, Button, StyleSheet } from 'react-native';

export class VehicleCard extends React.Component {
    props: {
        item : Object,
    }

    static defaultProps = {
        item: {
            id:1,
            vin: '123456789012',
            make:'Honda', 
            model:'CR-V', 
            year:"2019", 
            imgUrl:'https://cka-dash.s3.amazonaws.com/131-1018-WTS230/mainimage.jpg'
        }
    }

    render(){
        const item = this.props.item;
        return (
            <View style={styles.row}> 
                <View style={[styles.col2, styles.imgContainer]}>
                    <Image
                    style={{width: "100%",height:100}}
                    source={{ uri: item.imgUrl }}
                    resizeMode="contain" />
                </View>
                <View style={styles.col2}>
                    <Text>{item.vin}</Text>
                    <Text>{item.make}, {item.year}</Text>
                    <Text>{item.model}</Text>
                </View>
            </View>
        );
    }
}

export class TaskCard extends React.Component {
    props={
        item: Object,
        navigation: Object,
        to: String,
    }

    static defaultProps = {
        item: {
            id:"1",
            make:'Honda', 
            model:'CR-V', 
            year:"2019", 
            imgUrl:'https://cka-dash.s3.amazonaws.com/131-1018-WTS230/mainimage.jpg'
        },
        to: "TaskDetailPast"
    }

    render(){
        const { item, to } = this.props;
        return (
            <TouchableOpacity 
            style={[styles.row, styles.cardShape]}
            onPress={ (e) => this.props.navigation.navigate(to)}
            > 
                <View style={styles.col2}>
                    <Image
                    style={{alignSelf: 'flex-start',}}
                    source={{ uri: item.imgUrl }} />
                </View>
                <View style={styles.col2}>
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
                
            </TouchableOpacity>
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
        marginVertical: 6,
        marginHorizontal: 8,
    },
    col2: {//half of the row
        flex: 0.5,
        paddingHorizontal: 4,
    },
    cardShape:{
        elevation: 3,
        backgroundColor: "white",
        padding: 8
    },
    imgContainer:{
        justifyContent:'center',
        alignItems: 'center',
    },
});