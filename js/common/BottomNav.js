import * as React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

class TabNav extends React.Component {
    props: {
        to: string,
        title: String,
        navigate: () => mixed,
        active: string,//check if tab is activated
    };

    render(){
        let to = this.props.to;
        return (
            <View style={styles.bottomNav}>
                <Button 
                    style={styles.navBtn}
                    title={this.props.title}
                    onPress={() => this.props.navigate( to )}
                />
            </View>
        );
    }
}

/* <BottomNav> */
export default function BottomNav({ navigation }) {
    let navigate = navigation.navigate;
    return (
        <View style={styles.container}> 
            <TabNav title="Task" to="TaskList" navigate={navigate} />
            <TabNav title="Garage" to="VehicleList" navigate={navigate} />
            <TabNav title="Profile" to="Profile" navigate={navigate} />
        </View>
    );
} 


const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "row",
        elevation: 2,
	},
	bottomNav: {
        flex: 1/3
    },
    navBtn: {
        alignSelf: "stretch",
        backgroundColor: "#E0E0E0"
    }
});
