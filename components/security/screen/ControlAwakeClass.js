import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Modal, Pressable, Image } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  setObjectId,
  setObjectName,
  setShiftOpened,
  setShiftClosed,
  openShift,
  closeShift,
  setReportButtonActive,
  setReportButtonInactive,
  setReportNotificationShown,
  setReportNotificationNotShown,
  setExpoPushToken,
} from '../../../store/ShiftSlice';
import appConfig from '../../../config/appConfig.json';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { ControlAwakeStyle } from '../../../assets/style/ControlAwakeStyle';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import GoBack from '../../header/GoBack';

class ControlAwakeClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { guardObjects: [], reportButtonChecker: null, modalVisible: true, };
  }

  /**
   * On component mount
   */
  componentDidMount() {
    let token;
    this.registerForPushNotificationsAsync().then((token) =>
      this.props.setExpoPushToken(token)
    );
    Notifications.requestPermissionsAsync();

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    Notifications.addNotificationReceivedListener((notification) => {
      console.log(notification);
    });

    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    this.checkForActiveShift();
  }

  async schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Report Required',
        body: "Please confirm you're awake",
        data: { data: 'goes here' },
      },
      trigger: { seconds: 1 },
    });
  }

  /**
   * Register for notification & return token
   */
  async registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      });
      // Проверяем, что токен не пустой или null
      if (token && token.data) {
        return token.data;
      } else {
        return null; 
      }
    } else {
      return null; 
    }
  }

  async sendPushNotification() {
    const message = {
      to: this.props.expoPushToken,
      sound: 'default',
      title: 'Report Request',
      body: "Please confirm you're awake",
      data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }

  /**
   * (API) check if shift is active
   */
  checkForActiveShift() {
    const axiosInstance = axios.create({
      baseURL: appConfig.backendUrl,
      headers: { Authorization: 'Bearer ' + this.props.authToken },
    });

    axiosInstance.get('/mobile/guard/get_active_shift').then((response) => {
      if (response.data.status == 'active_shift_found') {
        this.props.setObjectId(response.data.object_id);
        this.props.setObjectName(response.data.object_name);
        this.props.setShiftOpened();
        this.startRepotButtonPoll();
      }
    });
  }

  closeShiftUi() {
    // Make axios call
    const axiosInstance = axios.create({
      baseURL: appConfig.backendUrl,
      headers: { Authorization: 'Bearer ' + this.props.authToken },
    });

    axiosInstance
      .post('/mobile/guard/object_shifts/close_shift', null, {
        params: { objectId: this.props.selectedObjectId },
      })
      .then((response) => {
        if (response.data.status == 'shift_closed') {
          this.props.setShiftClosed();
          this.props.setReportButtonInactive();

          clearInterval(this.state.reportButtonChecker);

          this.setState({
            guardObjects: this.state.guardObjects,
            reportButtonChecker: null,
          });
        }
      });
  }

  openShiftUi() {
    // Create axios instance
    const axiosInstance = axios.create({
      baseURL: appConfig.backendUrl,
      headers: { Authorization: 'Bearer ' + this.props.authToken },
    });

    // Make call to open (create) shift
    axiosInstance
      .post('/mobile/guard/object_shifts/open_shift', null, {
        params: {
          objectId: this.props.selectedObjectId,
          pushToken: this.props.expoPushToken,
        },
      })
      .then((response) => {
        // Successful response
        if (response.data.status == 'shift_opened') {
          this.props.setShiftOpened();
          this.startRepotButtonPoll();
        }
      });
  }

  openCloseShiftButton() {
    if (
      this.props.selectedObjectId != null &&
      this.props.selectedObjectId > 0 &&
      this.props.reportButtonActive == false
    ) {
      if (this.props.shiftOpened === true) {
        return (
          <View style={ControlAwakeStyle.buttonStartStop}>
          <TouchableOpacity onPress={() => this.closeShiftUi()}>
            <View style={ControlAwakeStyle.buttonStop}>
              <Text style={ControlAwakeStyle.textStartStop}>STOP</Text>
            </View>
          </TouchableOpacity>
        </View>
        );
      } else {
        return (
          <View style={ControlAwakeStyle.buttonStartStop}>
            <TouchableOpacity onPress={() => this.openShiftUi()}>
              <View style={ControlAwakeStyle.buttonStart}>
                <Text style={ControlAwakeStyle.textStartStop}>START</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      }
    }
  }

  reportAwake() {
    const axiosInstance = axios.create({
      baseURL: appConfig.backendUrl,
      headers: { Authorization: 'Bearer ' + this.props.authToken },
    });

    axiosInstance
      .post('/mobile/guard/object_shifts/report_not_sleeping', null, {
        params: { object_id: this.props.selectedObjectId },
      })
      .then((response) => {
        if (response.data.status == 'report_success') {
          this.props.setReportButtonInactive();
        }
      })
      .catch((error) => {
        console.log(error.toJson());
      });
  }

  performActionAndCloseModal() {
    this.reportAwake(); 
    this.setState({ modalVisible: false }); 
  }


  /** show modal */
  reportButton() {
    if (this.props.reportButtonActive == true) {
      return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          this.setState({ modalVisible: !this.state.modalVisible }); 
        }}>
        <View style={ControlAwakeStyle.centeredView}>
          <View style={ControlAwakeStyle.modalView}>
            <Text style={ControlAwakeStyle.textHeaderModale}>Confirm that you're working</Text>
            <Image source={require('../../../assets/images/ControlAwakeModalClock.png')} style={ControlAwakeStyle.imageModal}/>
            <Pressable style={ControlAwakeStyle.buttonModal}
              onPress={() => this.performActionAndCloseModal()}>
              <Text style={ControlAwakeStyle.textStartStop}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      );
    }
  }

  startRepotButtonPoll() {
    this.setState((state, props) => {
      return {
        guardObjects: this.state.guardObjects,
        reportButtonChecker: setInterval(function () {
          const axiosInstance = axios.create({
            baseURL: appConfig.backendUrl,
            headers: { Authorization: 'Bearer ' + props.authToken },
          });
          axiosInstance
            .get(
              '/mobile/guard/object_shifts/' +
                props.selectedObjectId +
                '/is_report_button_active'
            )
            .then((response) => {
              console.log(response.data.status);

              if (response.data.status == 'button_active') {
                if (state.notificationShown == false) {
                  state.notificationShown = true;
                }

                // Activate button
                props.setReportButtonActive();
                // props.setReportNotificationShown();
              } else {
                props.setReportButtonInactive();
                state.notificationShown = false;
                // props.setReportNotificationNotShown();
              }
            });
        }, 1000),
      };
    });
  }

  /** show count dots */
  dots(){
    let dots = '';
    if (Platform.OS === 'ios') {
      dots = '......................................'; 
    } else if (Platform.OS === 'android') {
      dots = '...............................'; 
    }
    return dots;
  }

  buttonBack(){
    if(this.props.shiftOpened === false){
      return <GoBack />
    }else{
      return <Text style={ControlAwakeStyle.backIcon}></Text>
    }
  }
  
  render() {
    return (
      <View style={ControlAwakeStyle.main}>
        <ImageBackground source={require('../../../assets/images/ControlAwakeHeader.png')} style={ControlAwakeStyle.imageHeader} >
            <View style={ControlAwakeStyle.containerHeader}>
              <View style={ControlAwakeStyle.rowBlock}>
                {this.buttonBack()}
                <Text style={ControlAwakeStyle.textHeaderName}>Robert Smith,</Text>
              </View>
              <Text style={ControlAwakeStyle.textHeader}>Welcome Back!</Text>
            </View>
            <View style={ControlAwakeStyle.container}>
              <View style={ControlAwakeStyle.containerObject}>
                  <View style={ControlAwakeStyle.rowBlock}>
                      <Text style={ControlAwakeStyle.rowText}>About work</Text>
                      <TouchableOpacity style={ControlAwakeStyle.rowButton}>
                        <FontAwesome5 name="angle-right" size={24} color="white" />
                      </TouchableOpacity>
                  </View>
                  <Text style={ControlAwakeStyle.rowTextObject}>{this.props.selectedObjectName}</Text>
                  <View style={ControlAwakeStyle.rowBlock}>
                    <Text style={ControlAwakeStyle.rowTime}>18:00</Text>
                    <Text style={ControlAwakeStyle.rowTime}>-</Text>
                    <Text style={ControlAwakeStyle.rowTime}>07:30</Text>
                  </View>
              </View>
              <View style={ControlAwakeStyle.containerReport}>
                  <View style={ControlAwakeStyle.rowBlock}>
                      <Text style={ControlAwakeStyle.rowText}>Activity</Text>
                      <TouchableOpacity style={ControlAwakeStyle.rowButtonActive}>
                        <FontAwesome5 name="angle-right" size={24} color="white" />
                      </TouchableOpacity>
                  </View>
                  {/** get array api report shift */}
                  <View style={ControlAwakeStyle.rowBlock}>
                    <Text style={ControlAwakeStyle.rowTime}>21:52</Text>
                    <Text style={ControlAwakeStyle.rowTime}>{this.dots()}</Text>
                    <Text style={ControlAwakeStyle.rowTime}>
                      <Ionicons name="checkmark" size={24} color="black" />
                    </Text>
                  </View>
                  <View style={ControlAwakeStyle.rowBlock}>
                    <Text style={ControlAwakeStyle.rowTime}>22:52</Text>
                    <Text style={ControlAwakeStyle.rowTime}>{this.dots()}</Text>
                    <Text style={ControlAwakeStyle.rowTime}>
                      <Ionicons name="ios-close-outline" size={24} color="black" />
                    </Text>
                  </View>
              </View>
              {this.openCloseShiftButton()}
              {this.reportButton()}
            </View>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authToken: state.test.value.testKey,
    selectedObjectId: state.shift.value.selectedObjectId,
    selectedObjectName: state.shift.value.selectedObjectName,
    shiftOpened: state.shift.value.shiftOpened,
    reportButtonActive: state.shift.value.reportButtonActive,
    reportNotificationShown: state.shift.value.reportNotificationShown,
    expoPushToken: state.shift.value.expoPushToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setObjectId: (newId) => dispatch(setObjectId(newId)),
    setObjectName: (objectName) => dispatch(setObjectName(objectName)),
    setExpoPushToken: (newToken) => dispatch(setExpoPushToken(newToken)),
    openShift: () => dispatch(openShift()),
    closeShift: () => dispatch(closeShift()),
    setShiftOpened: () => dispatch(setShiftOpened()),
    setShiftClosed: () => dispatch(setShiftClosed()),
    setReportButtonActive: () => dispatch(setReportButtonActive()),
    setReportButtonInactive: () => dispatch(setReportButtonInactive()),
    setReportNotificationShown: () => dispatch(setReportNotificationShown()),
    setReportNotificationNotShown: () =>
    dispatch(setReportNotificationNotShown()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlAwakeClass);
