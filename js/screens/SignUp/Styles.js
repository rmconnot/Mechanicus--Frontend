import { StyleSheet } from "react-native";
import { fonts, colors, commonStyles } from "../../common/Style";

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	container: {
		flex: 1,
		backgroundColor: "#7ad7f0",
		alignItems: "center",
		justifyContent: "center",
	},
	codeContainer: {
		flexDirection: "row",
		marginBottom: 24,
		padding: 8,
		backgroundColor: "white",
		borderRadius: 4,
	},
	optionRow: {
		paddingTop: 12,
		marginTop: 4,
	},
	title: {
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
		backgroundColor: "white",
		padding: 12,
		marginBottom: 24,
		borderRadius: 4,
		fontSize: fonts.body,
	},
	codeInput: {
		flex: 1,
		marginBottom: 0,
	},
	checkboxMark: {
		width: 16,
		height: 16,
		borderColor: colors.primaryDark,
		borderWidth: 2,
		borderRadius: 2,
		justifyContent: "center",
	},
	codeBtn: {
		padding: 12,
		borderRadius: 4,
		backgroundColor: "#6787e7",
		height: 50,
		alignItems: "center",
		justifyContent: "center",
	},
	codeBtnText: {
		color: "#fff",
	},
});

export default styles;
