import React from "react";
import { View, TouchableOpacity } from "react-native";
import { HeaderStyle } from "../../assets/style/HeaderStyle";
import { HeaderLeftIcons } from "../navigator/TabIcons";

export default function HeaderLeft({ navigation }){
    const goBack = () => {
        navigation.goBack();
      };
    return (
        <TouchableOpacity onPress={goBack}> 
            <View style={HeaderStyle.headerLeftIcon}>
                <HeaderLeftIcons style={HeaderStyle.userIcon} size={30} color="black" />
            </View>
        </TouchableOpacity>
    );
}