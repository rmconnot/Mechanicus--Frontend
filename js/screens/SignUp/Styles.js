import { StyleSheet } from 'react-native';
import {fonts, colors, commonStyles} from "../../common/Style"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7ad7f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    fontSize: fonts.h1,
    color: colors.text,
    marginTop: 80,
    marginBottom: 20,
    textAlign: 'center'
  },

  inputBox: {
		borderStyle: "solid",
		backgroundColor: 'white',
		paddingVertical: 12,
		marginHorizontal: 60,
		marginBottom: 40,
		borderRadius: 4,
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
	inputText: {
		paddingLeft: 60,
		fontSize: fonts.body,
		color: colors.text
	},
  forgot:{
    color:"white",
    fontSize:12
  },
  registerBtn:{
    width:"80%",
    backgroundColor: "#fff",
    borderRadius:25,
    borderWidth: 2.5,
    borderColor: "#fff",
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  registerText:{
    color:"#7ad7f0",
    fontSize:16
  },
  codeBtn:{
    width:"35%",
    borderRadius:25,
    backgroundColor:"#6787e7",
    height:50,
    alignItems:"center",
    justifyContent:"center",
  },
  codeBtnText:{
    color:"#fff",
    fontSize:14
  },
  cancelBtn:{
    width:"80%",
    backgroundColor:"#7ad7f0",
    borderRadius:25,
    borderWidth: 2.5,
    borderColor: "#fff",
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
    marginBottom:10
  },
  cancelText:{
    color:"#fff",
    fontSize:16
  }
});

export default styles;