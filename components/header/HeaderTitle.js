import React from "react";
import { View, Text } from "react-native";
import { HeaderStyle } from "../../assets/style/HeaderStyle";


export default function HeaderTitle(props){
    return (
        <View>
            <Text style={HeaderStyle.headerTitle}>{props.children}</Text> 
        </View>
    );
}