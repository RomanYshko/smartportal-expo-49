import React from 'react';
import { View, ImageBackground, Image, Text, TouchableOpacity } from "react-native";
import { GetStartStyle } from '../../assets/style/GetStartStyle';



export default function GetStart({ navigation }){

    const goToLoginScreen = () => {
        navigation.navigate('LoginScreen'); 
    };
    
    return (
        <View style={GetStartStyle.main}>
            <ImageBackground source={require('../../assets/images/backgroundImageGetStart.png')}  style={GetStartStyle.imageBackground}>
                <View style={GetStartStyle.container}>
                    <Image source={require('../../assets/images/getStartLogo.png')} style={GetStartStyle.imageLogin} />
                    <Text style={GetStartStyle.textTitle}>The best app for monitoring the work of the security industry</Text>
                </View>
                <View style={GetStartStyle.container}>
                    <TouchableOpacity style={GetStartStyle.loginButtonContainer} onPress={goToLoginScreen}>
                        <View style={GetStartStyle.buttonGetStart}>
                        <Text style={GetStartStyle.buttonText}>Get Started</Text>
                    </View>
                    </TouchableOpacity> 
                    <Text style={GetStartStyle.textLogin}>Already have account? 
                        <Text onPress={goToLoginScreen} style={GetStartStyle.textLoginButton}>Log in</Text>
                    </Text> 
                </View>
            </ImageBackground>
        </View>
    );
}
