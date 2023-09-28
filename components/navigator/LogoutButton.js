import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { logoutReducer } from '../../store/TestSlice';
import { GlobalStyle } from '../../assets/style/GlobalStyle';

const LogoutButton = ({ logoutReducer, navigation }) => { 
    return (

    <TouchableOpacity onPress={() => {
        logoutReducer();
        navigation.navigate('LoginScreen');
      }} 
      style={GlobalStyle.buttonLogut}>
         <View style={GlobalStyle.buttonLogut}>
            <Text style={GlobalStyle.textLogut}>Logout</Text>
         </View>
      </TouchableOpacity>
    );
};

const mapStateToProps = (state) => ({
  shiftOpened: state.shift.value.shiftOpened,
});

const mapDispatchToProps = {
  logoutReducer,
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
