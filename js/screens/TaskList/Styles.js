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
        fontWeight: '200',
        color: 'black',
        textAlign: "center"
    },
    tabActive:{
        fontSize: 18,
        fontWeight: '400',
        color: 'white',
        textAlign: "center"
    },
    switchBtn:{
        backgroundColor: 'white',
        width: 70,
        margin: 20,
        textAlign: "center"
    },
    switchBtnActive:{
        backgroundColor: 'blue',
        width: 70,
        margin: 20,
        textAlign: "center"
    }
});