import { StyleSheet, Dimensions } from 'react-native';
import {fonts, colors, commonStyles} from "../../common/Style"

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  optionRow: {
    paddingTop: 12,
    marginTop: 4,
  },
  title:{
    marginTop: 80,
    marginBottom: 24,
  },
  content: {
    marginBottom: 48,
  },
  pswContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 4,
    backgroundColor: "white",
  },
  pswInput: {
    flex: 1,
    marginBottom: 0,
  },
  pswBtn: {
    padding: 12,
    marginHorizontal: 8,
  },
	label: {
		marginBottom: 4,
	},
  signUpText:{
    color:colors.primaryDark,
  },
});

export default styles;