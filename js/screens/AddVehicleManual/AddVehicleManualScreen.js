import React from 'react';
import { TextInput, Text, View, FlatList, TouchableOpacity, Alert, Image, Button } from 'react-native';
import { CustomPicker } from '../../common/CustomPicker';
import BottomNav from '../../common/BottomNav';
import styles from './Styles';


export default class AddVehicleManualScreen extends React.Component {
    constructor(props) {
        super(props);
        // this.dataModel = getDataModel();
        this.state = {
        vin: "",
        type:"",
        year:"",
        maker: "",
        model: "",
        };
    }
    
    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        //setShow(Platform.OS === 'ios');
        this.setState({date: currentDate});
    }
    
    render(){
        return (
        <View style={styles.container}>
            <Text style={styles.logo}>Add Vehicle Maunally</Text>
            <View style={styles.inputView} >
            <TextInput  
                style={styles.inputText}
                placeholder="Enter VIN of your vehicle" 
                placeholderTextColor="#003f5c"
                onChangeText={text => this.setState({vin:text})}/>
            </View>
            <View style={styles.inputView} >
            <TextInput  
                style={styles.inputText}
                placeholder="Enter type of your vehicle" 
                placeholderTextColor="#003f5c"
                onChangeText={text => this.setState({type:text})}/>
            </View>
            <View style={styles.inputView} >
            <TextInput  
                style={styles.inputText}
                placeholder="Enter year of your vehicle" 
                placeholderTextColor="#003f5c"
                onChangeText={text => this.setState({year:text})}/>
            </View>
            <View style={styles.inputView} >
            <TextInput  
                style={styles.inputText}
                placeholder="Enter maker of your vehicle" 
                placeholderTextColor="#003f5c"
                onChangeText={text => this.setState({maker:text})}/>
            </View>
            <View style={styles.inputView} >
            <TextInput  
                style={styles.inputText}
                placeholder="Enter model of your vehicle" 
                placeholderTextColor="#003f5c"
                onChangeText={text => this.setState({model:text})}/>
            </View>
            <TouchableOpacity style={styles.registerBtn} onPress={() => Alert.alert('submit request & jump to the vehicle page'+this.state)}>
            <Text style={styles.registerText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => Alert.alert('jump to the quote page')}>
            <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
    
        </View>
        );
    }
}