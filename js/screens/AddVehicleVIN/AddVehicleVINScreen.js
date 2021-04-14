import React from 'react';
import { TextInput, Text, View, FlatList, TouchableOpacity, Alert, Image, Button } from 'react-native';
import { commonStyles } from '../../common/commonStyles';
import styles from './Styles';

export default class AddVehicleVINScreen extends React.Component {
    constructor(props) {
        super(props);
        // this.dataModel = getDataModel();
        this.state = {
        vin: "",
        };
    }
    
    render(){
        return (
        <View style={styles.container}>
            <Text style={styles.logo}>Add Vehicle by VIN</Text>
            <View style={styles.inputView} >
            <TextInput  
                style={styles.inputText}
                placeholder="Enter VIN of your vehicle" 
                placeholderTextColor="#003f5c"
                onChangeText={text => this.setState({vin:text})}/>
            </View>
            <TouchableOpacity style={styles.registerBtn} onPress={() => Alert.alert('submit request & jump to the vehicle page '+this.state.vin)}>
            <Text style={styles.registerText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => Alert.alert('jump to the vehicle page')}>
            <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
    
        </View>
        );
    }
}