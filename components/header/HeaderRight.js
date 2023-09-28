import React from "react";
import { View, TouchableOpacity } from "react-native";
import { HeaderStyle } from "../../assets/style/HeaderStyle";
import { HeaderRightIcons } from "../navigator/TabIcons";

export default function HeaderRight({ navigation }){

    const goToAccountScreen = () => {
        navigation.navigate('Account'); 
    };

    return (
        <TouchableOpacity onPress={goToAccountScreen}> 
        <View style={HeaderStyle.headerRightIcon}>
            <HeaderRightIcons style={HeaderStyle.userIcon} size={30} color="black" />
        </View>
    </TouchableOpacity>
    );
}