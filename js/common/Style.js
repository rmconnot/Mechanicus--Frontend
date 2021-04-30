import { StyleSheet } from 'react-native';

export const fonts = {
    h1: 28,
    h2: 22,
    h3: 20,
    body: 17,
    note: 13,
    caption2: 11,
};

export const colors = {
    primary: "#81DEE4",
    primaryDark: "#1AA5AE",
    primaryLight: "#DEF7F9",
    secondary: "#EE7451",
    secondaryDark: "#BD421F",
    secondaryLight: "#F8DFD8",
    text: "#333333",
    gray2: "#4F4F4F",
    gray3: "#828282",
    gray4: "#BDBDBD",
    gray5: "#E0E0E0",
    gray6: "#F5F5F5",
}

export const spacings = {
    XS: 4,
    S: 12,
    M: 24,
    L: 48,
};


export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    row: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center",
    },
    rowSpread: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
    },
    rowLeft: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: "center",
    },
    header: {
		borderBottomLeftRadius: 24,
		borderBottomRightRadius: 24,
    },
    pageContainer: {
        width: "100%",
        paddingHorizontal: 16,
        marginTop: 8,
    },
    card: {
        padding: 16,
        backgroundColor: "white",
        borderRadius: 8,
        // marginHorizontal: 24,
        marginBottom: 12,
    },
    cardHeader: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: colors.gray6,
        paddingBottom: 12,
        marginBottom: 12,
    },
    cardBody: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    blankFooter: {
        height: 5*fonts.body,
    },
    tag: {
        backgroundColor: colors.gray5,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 2,
        fontSize: fonts.note,
        marginRight: 8,
    },
    btn: {
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
    },
    btn_sub: {
        borderWidth: 1,
        borderColor: colors.primaryDark,
        backgroundColor: "transparent",
    },
    btn_disabled: {
        opacity: 0.5,
    },
    btn_cancel: {
        borderWidth: 1,
        borderColor: colors.gray4,
        backgroundColor: "transparent",
    },
    btn_sm: {
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    btn_lg: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        marginVertical: 8,
    },
    btn_display: {
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 100,
        flexDirection: "row",
        width: "50%",
        marginHorizontal: "25%",
        marginVertical: 24,
    },
    // shadows
    shadowDefault: {
        shadowColor: "black",
        shadowOpacity: 0.09,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 8,
    },
    shadowUp: {
        shadowColor: "black",
        shadowOpacity: 0.09,
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowRadius: 8,
    },
    shadowThemeFloat: {
        shadowColor: colors.primary,
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 12,
    },
    // font
    h1: {
        color: colors.text,
        fontSize: fonts.h1,
        fontWeight: "400",
    },
    h2: {
        color: colors.text,
        fontSize: fonts.h2,
        fontWeight: "600",
    },
    h3: {
        color: colors.text,
        fontSize: fonts.h3,
        fontWeight: "600",
    },
    h4: {
        color: colors.text,
        fontSize: fonts.body,
        fontWeight: "700",
        textTransform: "uppercase",
    },
    body: {
        color: colors.text,
        fontSize: fonts.body,
        fontWeight: "400",
    },
    note: {
        color: colors.text,
        fontSize: fonts.note,
        fontWeight: "400",
    },
    cap2: {
        color: colors.text,
        fontSize: fonts.caption2,
        fontWeight: "300",
    },
    sectionTitle: {
        color: colors.gray3,
        fontSize: fonts.body,
        marginBottom: 2,
    },
    // spacing
    m_b_s: {
        marginBottom: spacings.S,
    },
    //form
    //filled gray box
    inputBox: {
        color: colors.text,
		backgroundColor: 'white',
		padding: 12,
		borderRadius: 4,
        fontSize: fonts.body,
        marginBottom: 24,
	},
    //outlined white box
    inputBox2: {
        color: colors.text,
        borderWidth: 1,
        borderColor: colors.gray4,
		backgroundColor: 'white',
		padding: 12,
		borderRadius: 4,
        fontSize: fonts.body,
    },
    //deco
    dividingLine: {
		borderTopWidth: 1,
		borderTopColor: colors.gray5,
		height: 16,
	},
});