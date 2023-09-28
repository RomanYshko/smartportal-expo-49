// Homescreen.js
import React from "react";
import { Button, View, Text } from "react-native";
import { GlobalStyle } from "../../assets/style/GlobalStyle";

export default function HomeScreen({ navigation }) {
  return (
    <View style={GlobalStyle.main}>
      <Text>Home Screen</Text>
      <Button
        title="Go to About"
        onPress={() => navigation.navigate("About")}
      />
    </View>
  );
}