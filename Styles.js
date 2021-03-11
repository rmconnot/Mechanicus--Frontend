
import { StyleSheet } from 'react-native';

////////////////////////////////// VehicleList ////////////////////////////////////////
export const VehicleListStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    headerSection: {
        flex:0.8
    },
    titleSection:{
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
});

////////////////////////////////// TaskDetail ////////////////////////////////////////
export const TaskDetailStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    headerSection: {
        flex:0.3
    },
    titleSection:{
        flex:0.3,
        justifyContent: 'center',
    },
    timeline: {
        flex:0.7,
        flexDirection: 'row',
    },
    timelineSection: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    timelineCircleIcon: {
        width: '65%'
    },
    timelineLineIcon: {
        width: 80,
        paddingTop: '25%'
    },
    listContainer:{
        flex:0.3
    },
    listTitle: {
        fontWeight: '800'
    },
    listItem:{
        flex:0.5,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'stretch',
        paddingRight: '30%'
    },
    listCardContainer: {
        flex: 0.6,
        paddingRight: '50%'
    },
    listCardContent: {
        flex: 0.6,
        flexDirection:'row'
    },
    listText: {
        flex: 0.5,
    },
    listImage: {
        flex: 0.5,
        width: 100, 
        height: 100
    },

});
