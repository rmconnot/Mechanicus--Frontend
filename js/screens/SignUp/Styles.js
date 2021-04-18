import { StyleSheet } from 'react-native';
import {fonts, colors, commonStyles} from "../../common/Style"

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: '#7ad7f0',
    alignItems: 'center',
    justifyContent: 'center',
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
  label: {
    marginBottom: 4,
  },
  inputBox: {
		borderStyle: "solid",
		backgroundColor: 'white',
		padding: 12,
		marginBottom: 26,
		borderRadius: 4,
    fontSize: fonts.body,
	},
  checkboxMark: {
		width: 16,
		height: 16,
		borderColor: colors.primaryDark,
		borderWidth: 2,
		borderRadius: 2,
    justifyContent:'center'
	},
	checkboxMarkActive: {
		backgroundColor: colors.primaryDark,
    alignItems:'center'
	},
  policyContainer: {
    flexDirection:'row',
    alignContent:'center',
    justifyContent:'flex-start',
  },
});

export default styles;