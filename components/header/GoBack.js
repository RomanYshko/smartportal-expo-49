import React from "react";
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { ControlAwakeStyle } from "../../assets/style/ControlAwakeStyle";

const GoBack = () => {
  const navigation = useNavigation();

  const back = () => {
    navigation.navigate('SelectObject'); 
  };

  return (
    <Ionicons style={ControlAwakeStyle.backIcon} name="chevron-back" size={25} color="black" onPress={back} />
  );
};

export default GoBack;