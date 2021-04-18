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
import { colors, commonStyles } from "./Style";
import { Icon } from "./Svg";


export const BtnSmall = ({
    title = "button",
    onPress = ()=>{},
}) => {
    return (
        <TouchableOpacity
        style={ [ commonStyles.btn, commonStyles.btn_sm ] }
        onPress={onPress}
        >
            <Text style={[commonStyles.note, styles.capitalize]}>{title}</Text>
        </TouchableOpacity>
    );
};

export const BtnLarge = ({
    title = "button",
    onPress = ()=>{},
    sub = false, //deside the btn style, outlined or filled
    disabled = false,
}) => {
    let textColor = colors.text;
    let btnStyle = [commonStyles.btn, commonStyles.btn_lg];
    if(sub){ 
        textColor = colors.primaryDark;
        btnStyle.push(commonStyles.btn_sub);
    }
    if(disabled){
        textColor = colors.gray3;
        btnStyle.push(commonStyles.btn_disabled);
    }
    return (
        <TouchableOpacity
        style={ btnStyle }
        onPress={onPress}
        disabled={disabled}
        >
            <Text style={[commonStyles.body, styles.capitalize, {color:textColor}]}>{title}</Text>
        </TouchableOpacity>
    );
};

//btn that is large with round sides
export const BtnDisplay = ({
    title = "Get A Quote",
    icon = "add",
    onPress = ()=>{},
}) => {
    return (
        <TouchableOpacity
        style={[commonStyles.btn, commonStyles.btn_display, commonStyles.shadowDefault]}
        onPress={onPress}
        >
            <Text style={[commonStyles.body, styles.capitalize]}>{title}</Text>
            <Icon color={"white"} size={24} name={icon}/>
        </TouchableOpacity>
    );
    
};

export const BtnBare = ({
    title = "Edit",
    onPress = ()=>{},
}) => {
    return (
        <TouchableOpacity
        onPress={onPress}
        >
            <Text style={[commonStyles.body, styles.capitalize, {color: colors.primaryDark}]}>{title}</Text>
            
        </TouchableOpacity>
    );
    
};

const styles = StyleSheet.create({
    capitalize: {
        textTransform: 'capitalize',
    }
});