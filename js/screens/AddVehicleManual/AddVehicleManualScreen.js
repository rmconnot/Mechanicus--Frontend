import React, { useState }  from 'react';
import { TextInput, Text, View, FlatList, TouchableOpacity, Alert, Image, Button } from 'react-native';
import { gql, useMutation } from "@apollo/client";
import styles from './Styles';


const VEHICLE_MUTATION = gql`
	mutation($customerID: Int!, $vin: String!, $type: String!, $year: Int!, $make: String!, $model: String!, $imgUrl: String!) {
		createVehicle(customerID: $customerID, vin: $vin, vehicleType: $type, year: $year, make: $make, model: $model, imgUrl: $imgUrl) {
			id
		}
	}
`;

export const AddVehicleManualScreen = ({ navigation }) => {
    const [input, setInput] = useState({
        customerID: 1,
        vin: "",
        type:"",
        year:0,
        make: "",
        model: "",
        imgUrl: "",
	});

    const [makeRequest, { data }, error] = useMutation(VEHICLE_MUTATION, {
		onError: (error) => console.error(`Error! ${error}`),
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
                imgUrl: input.imgUrl
            },
        }).then((result) => {
            if (result.error) {
                Alert.alert("VIN already in use", result.error.message, [
                    { text: "OK", style: "OK" },
                ]);
            } else {
                console.log(result);
                navigation.navigate("VehicleList", {
                    currentUser: {
                        id: input.customerID,
                    },
                });
                return;
            }
        });
	};
    
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Add Vehicle Maunally</Text>
            <View style={styles.inputView} >
            <TextInput  
                style={styles.inputText}
                placeholder="Enter VIN of your vehicle" 
                placeholderTextColor="#003f5c"
                onChangeText={(text) =>
                    setInput((prevState) => ({ ...prevState, vin: text.trim() }))
                }
            />
            </View>
            <View style={styles.inputView} >
            <TextInput  
                style={styles.inputText}
                placeholder="Enter type of your vehicle" 
                placeholderTextColor="#003f5c"
                onChangeText={(text) =>
                    setInput((prevState) => ({ ...prevState, type: text.trim() }))
                }                
            />
            </View>
            <View style={styles.inputView} >
            <TextInput  
                style={styles.inputText}
                placeholder="Enter year of your vehicle" 
                placeholderTextColor="#003f5c"
                onChangeText={(text) =>
                    setInput((prevState) => ({ ...prevState, year: parseInt(text.trim(),10) }))
                }
            />
            </View>
            <View style={styles.inputView} >
            <TextInput  
                style={styles.inputText}
                placeholder="Enter maker of your vehicle" 
                placeholderTextColor="#003f5c"
                onChangeText={(text) =>
                    setInput((prevState) => ({ ...prevState, make: text.trim() }))
                }
            />            
            </View>
            <View style={styles.inputView} >
            <TextInput  
                style={styles.inputText}
                placeholder="Enter model of your vehicle" 
                placeholderTextColor="#003f5c"
                onChangeText={(text) =>
                    setInput((prevState) => ({ ...prevState, model: text.trim() }))
                }
            />                
            </View>
            <TouchableOpacity style={styles.registerBtn} onPress={addVehicle}>
            <Text style={styles.registerText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => Alert.alert('jump to the quote page')}>
            <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
    
        </View>
        );
}