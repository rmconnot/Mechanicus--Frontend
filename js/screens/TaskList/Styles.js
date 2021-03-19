import { StyleSheet } from 'react-native';

//////////////TaskList////////////////////
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        
    },
    main: {
        flex: 1,
        paddingHorizontal: 8,
    },
    tabContainer: {
        flexDirection: "row",
    },
    tab:{
        fontSize: 18,
        marginRight: 24,
        marginBottom:16,
        borderBottomWidth: 2,
        borderBottomColor: "#ccc",
    },
});