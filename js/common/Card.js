import React from "react";
import {
	TextInput,
	Text,
	View,
	FlatList,
	TouchableOpacity,
	Alert,
	Image,
	Button,
	StyleSheet,
} from "react-native";

export class VehicleCard extends React.Component {
    constructor(props) {
        super(props)
    }

    props={
        item : Object,
    }

    static defaultProps = {
        item: {
            id:1,
            vin: '123456789012',
            make:'Honda', 
            model:'CR-V', 
            year:"2019", 
            imgUrl:'https://cka-dash.s3.amazonaws.com/131-1018-WTS230/mainimage.jpg'
        }
    }

    render(){
        const item = this.props.item;
        return (
            <View style={styles.row}> 
                <View style={[styles.col2, styles.imgContainer]}>
                    <Image
                    style={{width: "100%",height:100}}
                    source={{ uri: item.imgUrl }}
                    resizeMode="contain" />
                </View>
                <View style={styles.col2}>
                    <Text>{item.vin}</Text>
                    <Text>{item.make}, {item.year}</Text>
                    <Text>{item.model}</Text>
                </View>
            </View>
        );
    }
}

export class TaskCard extends React.Component {
    
    constructor(props) {
        super(props)
    }
    
    //to avoid warning
    props={
        item: Object,
        navigation: Object,
        to: String,
    }

    static defaultProps = {
        item: {
            id:1,
            make:'Honda', 
            model:'CR-V', 
            year:"2019", 
            imgUrl:'https://cka-dash.s3.amazonaws.com/131-1018-WTS230/mainimage.jpg'
        },
        to: "TaskDetailPast"
    }
    

    render(){
        const { item, to } = this.props;


        console.log(item);
        var serviceTypeList = [];
        var servicePriceList = [];
        var renderList = [];

        // extract service type and price from the object
        for(let i = 0;i < item.quote.services.length; i++) {
            serviceTypeList.push(item.quote.services[i].type);
            servicePriceList.push(item.quote.services[i].price); 
        }

        for(let i = 0;i < serviceTypeList.length; i++) {
            renderList.push(
                <Text key={i}>{serviceTypeList[i]}</Text>
            )
             
        }
        // console.log(serviceDicts);
        // console.log(serviceTypeList);
        return (
            <TouchableOpacity 
            style={[styles.row, styles.cardShape]}
            onPress={ (e) => this.props.navigation.navigate(to)}
            > 
                <View style={styles.col2}>
                    <Image
                    style={{width: "100%", height: 100}}
                    source={{ uri: item.quote.vehicle.imgUrl }} />
                </View>
                <View style={styles.col2}>
                    <Text>
                    {item.quote.vehicle.make}, {item.quote.vehicle.year}
                    </Text>
                    <Text>
                        {item.quote.vehicle.model}
                    </Text>
                    <Text>{item.scheduleDate}</Text>
                    <Text>Service: {renderList}</Text>
                    <Text>Mechanic:  Not Assigned</Text>
                </View>
                
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
	},
	row: {
		flexDirection: "row",
		marginVertical: 6,
		marginHorizontal: 8,
	},
	col2: {
		//half of the row
		flex: 0.5,
		paddingHorizontal: 4,
	},
	cardShape: {
		elevation: 3,
		backgroundColor: "white",
		padding: 8,
	},
});
