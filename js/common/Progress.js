import * as React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

class ProgressDot extends React.Component {
    props: {
        active: Boolean, //if the user is on this page
        done: Boolean, //if the step finished
        label: String, //step label
        num: Number, //number displayed in circle
        icon: String, //icon displayed in circle
    };

    static defaultProps = {
        done: false,
        active: false,
        num: "1",
        label: "step 1",
    };
    
    render() {
        let { done, active, num, label } = this.props;
        return (
            <View style={styles.dotContainer}>
                <View style={[styles.dot,active?styles.dotActive:null]}>
                    <Text style={styles.dotNum}>
                        { done?"✓":num }
                    </Text>
                </View>
                <Text style={styles.label}>{label}</Text>
            </View>
        );
    }
}

export class QuoteProgress extends React.Component {
    props: {
        curStep: Number,
        status: Array, //shows the if each step is done
    };

    static defaultProps = {
        curStep: 1,
        status: [true,false,false],
    };

    render(){
        let {curStep,status} = this.props;
        return (
            <View style={styles.center}>
                <View style={styles.container}>
                    <ProgressDot num={1} label={"vehicle"} active={curStep==1?true:false} done={status[0]}/>
                    <ProgressDot num={2} label={"service"} active={curStep==2?true:false} done={status[1]} />
                    <ProgressDot num={3} label={"confirm"} active={curStep==3?true:false} done={status[2]} />
                </View>
            </View>
        );
    }
}

export class TaskProgress extends React.Component {
    props: {
        curStep: Number,
        status: Array, //shows the if each step is done
    };

    static defaultProps = {
        curStep: 1,
        status: [true,false,false],
    };

    render(){
        let {curStep,status} = this.props;
        return (
            <View style={styles.center}>
                <View style={styles.container}>
                    <ProgressDot num={1} label={"confirm"} active={curStep==1?true:false} done={status[0]}/>
                    <ProgressDot num={2} label={"repair"} active={curStep==2?true:false} done={status[1]} />
                    <ProgressDot num={3} label={"complete"} active={curStep==3?true:false} done={status[2]} />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    center: {
        flexDirection: "row",
        justifyContent: "center",
    },
    container: {
        flexDirection: "row",
    },
    dotContainer:{
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 12,
        marginVertical: 8,
    },
	dot:{
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "#aaa",
        marginRight: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    dotNum:{
        color: "white",
    },
    dotActive: {
        backgroundColor: "blue",
        elevation: 8,
    },
    label: {
        fontSize: 12,
    }
});