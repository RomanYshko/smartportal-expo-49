import React, { Component, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

// Style
import { LogidinStyle } from '../../assets/style/LogidinStyle';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// Axios
import axios from 'axios';

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUserRole, setLogin, setPassword, setAttemptingLoginTrue, setAttemptingLoginFalse, setErrorLogidin } from '../../store/TestSlice';

// App config
import appConfig from '../../config/appConfig.json';
import GetStart from './GetStart';

function loginAttempt(dispatch, nav, login, password, attemptingLogin){

  // If there is another login attempt in progress - don't do anything
  if(attemptingLogin == true){
    console.log('block multi click');
    return null;
  }

  // Set 'login in progress' to true
  dispatch(setAttemptingLoginTrue());


  // Don't attempt login with empty credentials
  if(login == null || password == null || login.length == 0 || password.length == 0){
    dispatch(setAttemptingLoginFalse());
    return null;
  }
  
  // Ajax request & handle response
  const response = axios.post(appConfig.backendUrl + 'mobile/token/create', {
    email: login,
    password: password,
    device_name: login + '_device'
  }).then(response => {
    

    /* HANDLE SUCCESSFUL LOGIN */
    
    console.log('token',response.data.access_token);
    
    // user role
    const userRole = response.data.user_role;

    // Check response data if success
    // ...
    dispatch(setToken(response.data.access_token));
    dispatch(setUserRole(userRole));
    dispatch(setAttemptingLoginFalse());
    dispatch(setErrorLogidin());

    // !! UNCOMMENT
    // nav.navigate('ShiftControlScreen');
    if(userRole == 'security'){
      nav.navigate('SelectObject');
    }else{
      nav.navigate('TabNavigator');
    }
  })
    .catch(function (error){
      
      /* HANDLE ERROR */
      dispatch(setAttemptingLoginFalse());
      if(error.toJSON().message == "Network Error"){
        // No connection
        console.log('No connection');
      } else if(error.toJSON().status == 422){
        // Invalid credentials
        console.log('Invalid credentials');
      }
    });
}

export default function LoginScreen({ navigation }) {
 
  const login = useSelector((state) => state.test.value.login);
  const password = useSelector((state) => state.test.value.password);
  const attemptingLogin = useSelector((state) => state.test.value.attemptingLogin);
  const errorLogidin = useSelector((state) => state.test.value.errorLogidin)
  const dispatch = useDispatch();


  const goToGetStart = () => {
    navigation.navigate(GetStart);
  };

  // State variable to track password visibility
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={LogidinStyle.main}>
      <Image source={require('../../assets/images/LoginLogo.png')} style={LogidinStyle.imageStyle} />
      <Text style={LogidinStyle.welcomeText}>Welcome back</Text>
      <Text style={LogidinStyle.errorText}>{errorLogidin}</Text>
      
      <Text style={[LogidinStyle.label, LogidinStyle.labelEmail]}>E-mail</Text>
      <TextInput
        type="text"
        style={LogidinStyle.inputAuth}
        onChangeText={(text) => {
          dispatch(setLogin(text)); 
          dispatch(setErrorLogidin());
        }}
        value={login}
        placeholder="Enter your login"
      />
      <Text style={[LogidinStyle.label, LogidinStyle.labelPassword]}>Password</Text>
      <TextInput
        style={LogidinStyle.inputAuth}
        onChangeText={(text) => {
          dispatch(setPassword(text)); 
          dispatch(setErrorLogidin());
        }}
        value={password}
        secureTextEntry={!showPassword}
        placeholder="Enter your password"
      />
      <TouchableOpacity
        style={LogidinStyle.passwordToggle}
        onPress={() => setShowPassword(!showPassword)}
      >
      <MaterialCommunityIcons
        name={showPassword ? 'eye-off' : 'eye'}
        size={24}
        color="#aaa"
      />
      </TouchableOpacity>    
      <TouchableOpacity
        style={LogidinStyle.loginButtonContainer}
        onPress={() => loginAttempt(dispatch, navigation, login, password, attemptingLogin)}
      >
        <View style={LogidinStyle.loginButton}>
          <Text style={LogidinStyle.buttonText}>Login</Text>
        </View>
      </TouchableOpacity>
      <Text style={LogidinStyle.forgetPassword}>Forgot password?</Text>
      <Text style={LogidinStyle.textAlredyAccount}>Line with additional <Text onPress={goToGetStart} style={LogidinStyle.textLoginButton}>information</Text></Text>
    </View>
  );
}