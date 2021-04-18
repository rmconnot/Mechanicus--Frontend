import { StyleSheet, Dimensions } from 'react-native';
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
    color: colors.text,
    fontSize: fonts.note,
    textAlign:'center'
  },

  signUpBtn:{
    flexDirection:'row',
    justifyContent:'center',
    paddingTop:13
  },
  notificationText:{
    color:colors.text,
    fontSize:fonts.note
  },
  signUpText:{
    color:colors.primaryDark,
    fontSize:fonts.note
  },
});

export default styles;