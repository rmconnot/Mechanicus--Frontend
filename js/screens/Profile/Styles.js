import { StyleSheet, Dimensions } from 'react-native';
import {fonts, colors, commonStyles} from "../../common/Style"

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  userName: {
    color:colors.text,
    fontSize: fonts.h2,
    textAlign:'center',
    marginVertical:20
  },
  profileIcon:{
    marginTop:80,
    marginLeft:"43%"
  },
  title:{
    fontSize: fonts.body,
    color: colors.gray3,
    marginHorizontal: 20,
    paddingTop: 30
  },

  inputBox: {
		borderStyle: "solid",
		backgroundColor: 'white',
		paddingVertical: 24,
		marginHorizontal: 20,
		marginBottom: 12,
		borderRadius: 8,
        flexDirection:'row'
	},
    inputTextTitle: {
		fontSize: fonts.h3,
		color: colors.text,
        paddingLeft: 20
	},
    inputTextContent: {
		paddingLeft: 20,
        paddingTop: 5,
		fontSize: fonts.note,
		color: colors.text
	},
});

export default styles;