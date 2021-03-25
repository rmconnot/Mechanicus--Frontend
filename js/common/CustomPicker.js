import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {Picker} from "react-native-picker"

//How to use?
//Pass options as 'items' & handler function as 'handler'
//e.g. <customPicker items = {xxxx} handler = {yyyy} selectedValue = {zzzz}>

export class customPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: this.props.selectedValue,
    }
    // this.dataModel = getDataModel();
}


  render(){
    return (
      <View style={styles.container}>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => this.setState({selectedValue:itemValue})}
        >
          {this.props.items.map(item => (
            <Picker.Item label={item} value={item} onClick = {this.props.handler}/>
        ))}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center"
  }
});
