import React from 'react';
import {Text, View, TextInput, TouchableOpacity, Button, Platform, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './Styles';

export class ScheduleScreen extends React.Component {
  constructor(props) {
    super(props);
    // this.dataModel = getDataModel();
    this.state = {
      date: new Date(1598051730000),
      address:"",
      phone: ""
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
        <Text style={styles.logo}>Schedule</Text>
        <View style={styles.inputView} >
          <DateTimePicker
            value={this.state.date}
            mode='date'
            is24Hour={true}
            display="default"
            onChange={this.onChange}
          />
        </View>
        <View style={styles.inputView} >
          <DateTimePicker
            value={this.state.date}
            mode='time'
            is24Hour={true}
            display="default"
            onChange={this.onChange}
          />
        </View>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Enter your Address" 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({address:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Enter your phone number" 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({phone:text})}/>
        </View>
        <TouchableOpacity style={styles.registerBtn} onPress={() => Alert.alert('jump to the payment page'+this.state.date)}>
          <Text style={styles.registerText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelBtn} onPress={() => Alert.alert('jump to the quote page')}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

      </View>
    );
  }
}
