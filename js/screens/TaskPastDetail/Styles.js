import { StyleSheet } from 'react-native';

//////////////TaskDetail////////////////////
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
    },
    row:{
        flexDirection: "row",
        marginVertical: 8,
        marginHorizontal: 8,
    },
    spaceBetween: {
        justifyContent:"space-between",
    },
    col2: {//half of the row
        flex: 0.5,
        paddingHorizontal: 4,
    },
    title:{
        backgroundColor:"#ccc",
        padding: 4,
        fontSize: 16
    }
});