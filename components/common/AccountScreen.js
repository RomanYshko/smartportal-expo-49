import React from "react";
import { View } from "react-native";
import LogoutButton from "../navigator/LogoutButton";
import { GlobalStyle } from "../../assets/style/GlobalStyle";

export default function AccountScreen({ navigation }){
    return (
        <View style={GlobalStyle.main}>
            <LogoutButton navigation={navigation} />
        </View>
    );
}