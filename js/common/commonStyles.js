import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
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
    sectionTitle:{
        backgroundColor:"#ccc",
        padding: 4,
        fontSize: 16
    },
    headerSeection: {
        flex:0.8
    },
    TitleSection:{
        flex:0.3,
        flexDirection: 'row',
        
        alignItems: 'center',
        justifyContent: 'center',
    },
    listContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch', // this turns out to be important!
        width: '100%',
    },
    listCardContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.8,
        flexDirection: 'row',
        paddingLeft:20
    },
    listText: {
        flex: 0.5
    },
    listImage: {
        flex: 0.5
    },
    listButtonsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.8,
        flexDirection: 'row',
    },
    TabsContainer: {
        flex:0.5,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft:30,
    },
    TabButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 28,
        height: 28,
    },
    cardShape:{
        elevation: 3,
        backgroundColor: "white",
        padding: 8,
        borderRadius: 2,
        margin: 6,
        marginHorizontal: 8,
    },
    
});