import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './Styles';
import { useQuery } from "urql";

const userQuery = `query ()

/* <LoginScreen> */
export default function Login({ navigation }) {
  //states
  const [email, setEmail] = useState(""),
        [password, setPassword] = useState("");
  //handle login
  const onLogIn = ()=>{};
  return (
      <View style={styles.container}>
      <Text style={styles.logo}>Mechanicus</Text>
      <View style={styles.inputView}>
        <TextInput  
          style={styles.inputText}
          placeholder="Email..." 
          placeholderTextColor="#003f5c"
          onChangeText={setEmail}/>
      </View>
      <View style={styles.inputView} >
        <TextInput  
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..." 
          placeholderTextColor="#003f5c"
          onChangeText={setPassword}/>
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={onLogIn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signUpBtn} onPress={() => {
        navigation.navigate('SignUp');
      }}>
        <Text style={styles.signUpText}>Signup</Text>
      </TouchableOpacity>

    </View>
  );
} 