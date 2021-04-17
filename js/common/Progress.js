import * as React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { Icon } from './Svg';
import { commonStyles,colors } from './Style';


const ProgressDot = ({
    active = false,
    done = false,
    label = "step",
}) => {
    let textStyle = active? {color: colors.primaryDark} : {color: colors.gray3};
    let dotStyle = active? [styles.dot, styles.dotActive, commonStyles.shadowThemeFloat]:styles.dot;
    return (
        <View style={styles.dotContainer}>
            <View style={dotStyle}>
                <Icon name={label} color={ done? "white" : colors.gray4} />
            </View>
            <Text style={[commonStyles.note,textStyle]}>{label}</Text>
        </View>
    );
};

export const QuoteProgress = ({
    curStep = 1, //current activated step
    status = [true,false,false], //shows if each step is done
}) => {
    return (
    <View style={styles.progressContainer}>
        <ProgressDot label={"vehicle"} active={curStep==1?true:false} done={status[0]}/>
        <ProgressDot label={"service"} active={curStep==2?true:false} done={status[1]} />
        <ProgressDot label={"confirm"} active={curStep==3?true:false} done={status[2]} />
    </View>
    );
};

export const TaskProgress = ({
    curStep = 1, //current activated step
    status = [true,false,false], //shows if each step is done
}) => {
    return (
    <View style={styles.progressContainer}>
        <ProgressDot label={"confirm"} active={curStep==1?true:false} done={status[0]}/>
        <ProgressDot label={"repair"} active={curStep==2?true:false} done={status[1]} />
        <ProgressDot label={"complete"} active={curStep==3?true:false} done={status[2]} />
    </View>
    );
};

const styles = StyleSheet.create({
    progressContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 16,
        paddingHorizontal: 32,
    },
    dotContainer:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 12,
        marginVertical: 8,
    },
	dot:{
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "transparent",
        marginRight: 8,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.gray4,
    },
    dotActive: {
        backgroundColor: colors.primaryDark,
        borderWidth: 0,
    },
});