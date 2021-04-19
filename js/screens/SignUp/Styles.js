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
		justifyContent: "center",
	},
	forgot: {
		color: "white",
		fontSize: 12,
	},
	registerBtn: {
		width: "80%",
		backgroundColor: "#fff",
		borderRadius: 25,
		borderWidth: 2.5,
		borderColor: "#fff",
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 40,
		marginBottom: 10,
	},
	registerText: {
		color: "#7ad7f0",
		fontSize: 16,
	},
	codeBtn: {
		width: "35%",
		borderRadius: 25,
		backgroundColor: "#6787e7",
		height: 50,
		alignItems: "center",
		justifyContent: "center",
	},
	codeBtnText: {
		color: "#fff",
		fontSize: 14,
	},
	cancelBtn: {
		width: "80%",
		backgroundColor: "#7ad7f0",
		borderRadius: 25,
		borderWidth: 2.5,
		borderColor: "#fff",
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 20,
		marginBottom: 10,
	},
});

export default styles;
