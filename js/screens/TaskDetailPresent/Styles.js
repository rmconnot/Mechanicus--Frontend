import { StyleSheet } from 'react-native';

//////////////TaskDetailPresent////////////////////
export const styles = StyleSheet.create({
    section: {
        marginBottom: 24,
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center"
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        justifyContent: "space-around",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalTitle: {
        color: "#333333",
        fontSize: 20,
        fontWeight: "600",
        margin: 10,
    },
    sectionTitle: {
        color: "#828282",
        fontSize: 17,
        margin: 10,
    },
    yesButton: {
        borderRadius: 10,
        padding: 10,
        margin: 10,
        elevation: 2,
        width: "80%",
        backgroundColor: "red",
        textAlign: "center"
    },
    noButton: {
        borderRadius: 10,
        padding: 10,
        margin: 10,
        elevation: 2,
        width: "80%",
        backgroundColor: "#DEF7F9",
        textAlign: "center"
    }
});