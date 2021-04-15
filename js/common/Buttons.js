import React from "react";
import {
	TextInput,
	Text,
	View,
	FlatList,
	TouchableOpacity,
	Alert,
	Image,
	Button,
	StyleSheet,
} from "react-native";
import { commonStyles } from "./Style";


export const BtnSmall = ({
    title = "button",
    onPress = ()=>{},
}) => {
    return (
        <TouchableOpacity
        style={commonStyles.btn_sm}
        onPress={onPress}
        >
            <Text style={[commonStyles.note, styles.capitalize]}>{title}</Text>
        </TouchableOpacity>
    );
};

export const BtnDisplay = ({
    title = "Get A Quote",
    iconSrc = require("../../assets/arrow_right_24px.png"),
    onPress = ()=>{},
}) => {
    return (
        <TouchableOpacity
        style={[commonStyles.btn_display, commonStyles.shadowDefault]}
        onPress={onPress}
        >
            <Text style={[commonStyles.body, styles.capitalize]}>{title}</Text>
            <Image source={ iconSrc }/>
        </TouchableOpacity>
    );
    
};

const styles = StyleSheet.create({
    capitalize: {
        textTransform: 'capitalize',
    }
});