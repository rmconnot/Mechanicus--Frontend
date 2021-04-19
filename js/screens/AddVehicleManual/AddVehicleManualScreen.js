import React, { useState }  from 'react';
import { TextInput, Text, View, FlatList, TouchableOpacity, Alert, Image, Button } from 'react-native';
import { gql, useMutation } from "@apollo/client";
import { colors, commonStyles } from "../../common/Style";
import { BtnLarge } from "../../common/Buttons";
import styles from './Styles';


const VEHICLE_MUTATION = gql`
	mutation($customerID: Int!, $vin: String!, $type: String!, $year: Int!, $make: String!, $model: String!) {
		createVehicle(customerID: $customerID, vin: $vin, vehicleType: $type, year: $year, make: $make, model: $model) {
			id
		}
	}
`;

export const AddVehicleManualScreen = ({ navigation, route }) => {
    const [input, setInput] = useState({
        customerID: route.params.id,
        vin: "",
        type:"",
        year:0,
        make: "",
        model: "",
        // imgUrl: "",
	});

    const [makeRequest, { data }, error] = useMutation(VEHICLE_MUTATION, {
		onError: (error) => {
            console.error(`Error! ${error}`);
            Alert.alert("Error","VIN already in use", [
                { text: "OK", style: "OK" },
            ]);
        }
	});

    
	const addVehicle = async () => {
        makeRequest({
            variables: {
                customerID: input.customerID,
                vin: input.vin,
                type: input.type,
                year: input.year,
                make: input.make,
                model: input.model,
                // imgUrl: input.imgUrl
            },
        }).then((result) => {
            if (result != undefined){
                console.log(result);
                navigation.goBack();
                return;
            }
        })
	};
    
    return (
        <View style={commonStyles.pageContainer}>
            <View style={styles.content}>
                <Text style={styles.label} >VIN</Text>
                <TextInput  
                    style={commonStyles.inputBox}
                    placeholder="Enter vehicle VIN" 
                    placeholderTextColor={colors.gray4}
                    onChangeText={(text) =>
                        setInput((prevState) => ({ ...prevState, vin: text.trim() }))
                    }
                />
                <Text style={styles.label} >Type</Text>

                <TextInput  
                    style={commonStyles.inputBox}
                    placeholder="Enter vehicle type" 
                    placeholderTextColor={colors.gray4}
                    onChangeText={(text) =>
                        setInput((prevState) => ({ ...prevState, type: text.trim() }))
                    }                
                />
                <Text style={styles.label} >Year</Text>

                <TextInput  
                    style={commonStyles.inputBox}
                    placeholder="Enter vehicle year" 
                    placeholderTextColor={colors.gray4}
                    onChangeText={(text) =>
                        setInput((prevState) => ({ ...prevState, year: parseInt(text.trim(),10) }))
                    }
                />
                <Text style={styles.label} >Make</Text>

                <TextInput  
                    style={commonStyles.inputBox}
                    placeholder="Enter vehicle make" 
                    placeholderTextColor={colors.gray4}
                    onChangeText={(text) =>
                        setInput((prevState) => ({ ...prevState, make: text.trim() }))
                    }
                />
                <Text style={styles.label} >Model</Text>
            
                <TextInput  
                    style={commonStyles.inputBox}
                    placeholder="Enter vehicle model" 
                    placeholderTextColor={colors.gray4}
                    onChangeText={(text) =>
                        setInput((prevState) => ({ ...prevState, model: text.trim() }))
                    }
                />     
            </View>

            <BtnLarge title="confirm" onPress={addVehicle}/>
            <BtnLarge title="cancel" onPress={() => navigation.goBack()} cancel={true}/>
        </View>
        );
}