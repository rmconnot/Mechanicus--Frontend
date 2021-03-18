import * as React from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './Styles';


/* <LoginScreen> */
export default function Login({ navigation }) {
    return (
        <View style={styles.container}>
        <Text style={styles.logo}>Mechanicus</Text>
        <View style={styles.inputView}>
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({email:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({password:text})}/>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={this.onLogIn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpBtn} onPress={() => {
          this.props.navigation.navigate('SignUp');
        }}>
          <Text style={styles.signUpText}>Signup</Text>
        </TouchableOpacity>

      </View>
    );
} 