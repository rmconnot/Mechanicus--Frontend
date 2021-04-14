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
};

export const commonStyles = StyleSheet.create({
    card: {
        padding: 16,
        backgroundColor: "white",
        borderRadius: 8,
    },
    tag: {
        backgroundColor: colors.gray5,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 2,
        fontSize: fonts.note,
    },
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
    h3: {
        color: colors.text,
        fontSize: fonts.h3,
        fontWeight: "400",
    },
    body: {
        color: colors.text,
        fontSize: fonts.body,
        fontWeight: "300",
    },
});

