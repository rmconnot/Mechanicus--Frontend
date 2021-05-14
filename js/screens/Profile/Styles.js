import { StyleSheet, Dimensions } from "react-native";
import { fonts, colors, commonStyles } from "../../common/Style";

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	titleRow: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: 80,
		marginBottom: 24,
	},
	userName: {
		marginTop: 12,
	},
	profileIcon: {
		marginTop: 80,
		marginLeft: "43%",
	},
	label: {
		color: colors.gray2,
		marginBottom: 8,
	},
	group: {
		marginBottom: 32,
	},
	inputBox: {
		borderStyle: "solid",
		backgroundColor: "white",
		padding: 12,
		marginBottom: 12,
		borderRadius: 8,
		flexDirection: "row",
	},
	inputTextTitle: {
		fontSize: fonts.h3,
		color: colors.text,
		paddingLeft: 20,
	},
	inputTextContent: {
		paddingLeft: 20,
		paddingTop: 5,
		fontSize: fonts.note,
		color: colors.text,
	},
	bottom: {
		paddingTop: 110,
	},
	warningText: {
		color: "red",
	},
});

export default styles;
