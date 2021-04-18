import React, { useState }  from 'react';
import { TextInput, Text, View, FlatList, TouchableOpacity, Alert, Image, Button } from 'react-native';
import { gql, useMutation } from "@apollo/client";
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
        customerID: route.params.currentUser.id,
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
                navigation.navigate("VehicleList", {
                    currentUser: {
                        id: input.customerID,
                    },
                });
                return;
            }
        })
	};
    
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Add Vehicle Maunally</Text>
            <View>
                <Text style={styles.inputText} >VIN</Text>
                <TextInput  
                    style={styles.inputBox}
                    placeholder="Enter VIN of your vehicle" 
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) =>
                        setInput((prevState) => ({ ...prevState, vin: text.trim() }))
                    }
                />
                <Text style={styles.inputText} >Type</Text>

                <TextInput  
                    style={styles.inputBox}
                    placeholder="Enter type of your vehicle" 
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) =>
                        setInput((prevState) => ({ ...prevState, type: text.trim() }))
                    }                
                />
                <Text style={styles.inputText} >Year</Text>

                <TextInput  
                    style={styles.inputBox}
                    placeholder="Enter year of your vehicle" 
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) =>
                        setInput((prevState) => ({ ...prevState, year: parseInt(text.trim(),10) }))
                    }
                />
                <Text style={styles.inputText} >Maker</Text>

                <TextInput  
                    style={styles.inputBox}
                    placeholder="Enter maker of your vehicle" 
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) =>
                        setInput((prevState) => ({ ...prevState, make: text.trim() }))
                    }
                />
                <Text style={styles.inputText} >Model</Text>
            
                <TextInput  
                    style={styles.inputBox}
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