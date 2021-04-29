import { StyleSheet } from "react-native";
import { colors } from "../../common/Style";

//////////////TaskDetailPresent////////////////////
export const styles = StyleSheet.create({
	section: {
		marginBottom: 24,
	},
	totalEntry: {
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		borderTopWidth: 1,
		borderTopColor: colors.gray5,
		paddingTop: 12,
	},
});
