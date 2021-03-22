
import { StyleSheet } from 'react-native';

////////////////////////////////// VehicleList ////////////////////////////////////////
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    main: {
        paddingHorizontal: 8,
    },
    headerSection: {
        flex:0.8
    },
    titleSection:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
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

////////////////////////////////// TaskList //////////////////////////////////////////
export const TaskListStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: '10%',
        justifyContent: 'flex-start',
    },
    headerSection: {
        flex:0.6
    },
    headerBtn:{
        flex:0.6,
        flexDirection: 'row',
        
        
    },
    taskContainer: {
        flex:1,
        paddingBottom: '20%'
        
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
        flex: 0.6
    },
    listImage: {
        flex: 0.5
    }
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
        flexDirection:'row'
    },
    titleText: {
        flex:0.7,
        justifyContent: 'center',
    },
    titleBtn: {
        flex:0.3,
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
        paddingTop: '15%'
    },
    listContainer:{
        flex:0.3
    },
    listTitle: {
        fontWeight: '800'
    },
    listItem:{
        flex:0.15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'stretch',
        paddingRight: '30%'
    },
    listCardContainer: {
        flex: 0.6,
        paddingRight: '20%'
    },
    listCardContent: {
        flex: 1,
        
    },
    listText: {
        flex: 0.9,
        paddingLeft: '50%',
        paddingBottom:'90%'
        
        
    },
    listImage: {
        flex: 0.1,
        paddingRight: '30%',
    },

});
