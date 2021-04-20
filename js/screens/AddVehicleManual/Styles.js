import { StyleSheet, Dimensions } from 'react-native';
import {fonts, colors, commonStyles} from "../../common/Style"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7ad7f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: fonts.body,
    color: colors.text,
    marginBottom: 4,
  },
  title:{
    fontSize: fonts.h1,
    color: colors.text,
    marginTop: 80,
    marginBottom: 20,
    textAlign: 'center'
  },
  content: {
    marginBottom: 24,
  },
  inputBox: {
		borderStyle: "solid",
		backgroundColor: 'white',
		paddingVertical: 12,
		marginHorizontal: 60,
		marginBottom: 40,
		borderRadius: 4,
	},
	inputText: {
		paddingLeft: 60,
		fontSize: fonts.body,
		color: colors.text
	},

  inputView:{
    width:"80%",
    backgroundColor:"#fff",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },

  forgot:{
    color:"white",
    fontSize:12
  },
  loginBtn:{
    width:"80%",
    borderRadius:25,
    borderWidth: 2.5,
    borderColor: "#fff",
    backgroundColor: "#fff",
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  signUpBtn:{
    width:"80%",
    backgroundColor:"#7ad7f0",
    borderRadius:25,
    borderWidth: 2.5,
    borderColor: "#fff",
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"#7ad7f0",
    fontSize:16
  },
  signUpText:{
    color:"#fff",
    fontSize:16
  }
});

export default styles;