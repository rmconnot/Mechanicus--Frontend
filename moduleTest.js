import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	Button,
	StyleSheet,
	Alert,
	BackHandler,
    SafeAreaView,
} from "react-native";
import { QuoteCard, TaskCard, VehicleInfoCard, MechanicInfoCard, ServiceInfoCard } from "./js/common/Card";
import BottomNav, { NavGroup } from "./js/common/BottomNav";
import { TaskTop, TopNavBar } from "./js/common/TopNav";
import { BtnLarge, BtnDisplay } from "./js/common/Buttons";
import { QuoteProgress, TaskProgress } from "./js/common/Progress";
import { commonStyles } from './js/common/Style';
import { SubOptions } from './js/common/Form';

export const TEST = ({
    navigation,
    route
}) => {
    const [status, setStatus] = useState("appointments");
    return (
        <SafeAreaView style={commonStyles.container}>
            <TopNavBar title="test" cancel="true"/>
            <View>
                <SubOptions/>
            </View>
            <BottomNav navigation={navigation} activated="My Vehicles" />
        </SafeAreaView>
    );
};