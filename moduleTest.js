import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	Button,
	StyleSheet,
	Alert,
	BackHandler,
} from "react-native";
import { QuoteCard, TaskCard, VehicleInfoCard, MechanicInfoCard, ServiceInfoCard } from "./js/common/Card";
import BottomNav, { NavGroup } from "./js/common/BottomNav";
import { BtnLarge, BtnDisplay } from "./js/common/Buttons";
import { QuoteProgress, TaskProgress } from "./js/common/Progress";
import { commonStyles } from './js/common/Style';

export const TEST = ({
    navigation,
    route
}) => {
    return (
        <View style={commonStyles.container}>
            <View>
                <Text>this is a test component</Text>
                <QuoteProgress />
                <TaskProgress />
                <BtnLarge />
            </View>
            <BottomNav navigation={navigation} activated="My Vehicles" />
        </View>
    );
};