import React, { Component } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';



// Axios
import axios from 'axios';

//React navigation
import { useNavigation } from '@react-navigation/native';

// Redux
// import { useDispatch, useSelector } from "react-redux";
import { connect } from 'react-redux';

import { setObjectId, setObjectName, setShiftOpened, setShiftClosed, openShift, closeShift, setReportButtonActive, setReportButtonInactive, setReportNotificationShown, setReportNotificationNotShown, setExpoPushToken } from '../../store/ShiftSlice';
import { logoutReducer } from '../../store/TestSlice';

import LocationControlScreen from './LocationControlScreen';

import appConfig from '../../config/appConfig.json';
import { GlobalStyle } from '../../assets/style/GlobalStyle';

// Test notification
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from 'expo-background-fetch';
import Constants from "expo-constants";
// /test notification


class ShiftControlScreen extends React.Component{

    constructor(props) {
        super(props);
    
        this.state = { guardObjects: [], reportButtonChecker: null };
    
         // установления значения для скрытия select
        this.locationShiftOpened = () => {
            this.props.setShiftOpened(!this.props.shiftOpened);
        };

        this.locationShiftClosed = () => {
            this.props.setShiftClosed(this.props.shiftOpened);
        };
      }

    /**
     * Populate list of guard objects
     */
    populateGuardObjects(){

        // console.log('populate guard objects');
        
        const axiosInstance = axios.create({
            baseURL: appConfig.backendUrl,
            // timeout: 1000,
            headers: {'Authorization': 'Bearer '+ this.props.authToken}
        });
          
        axiosInstance.get('/mobile/guard/object_list').then(response => {
            // console.log(response.data);
            this.setState({ 
                guardObjects: response.data,
                reportButtonChecker: null
            }, () => { 
                console.log(this.state);
            });
            
        });
    }


    /**
     * On component mount
     */ 
    componentDidMount(){
        console.log('mounted');
        
        let token;
        this.registerForPushNotificationsAsync().then(token => this.props.setExpoPushToken(token));
        console.log('token test 2', this.props.expoPushToken);
        
        Notifications.requestPermissionsAsync();
        
        
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
              shouldShowAlert: true,
              shouldPlaySound: false,
              shouldSetBadge: false,
            }),
          });

          Notifications.addNotificationReceivedListener(notification => {
            console.log(notification);
          });
      
          Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
          });

        //   const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";

        //     TaskManager.defineTask(
        //     BACKGROUND_NOTIFICATION_TASK,
        //     ({ data, error, executionInfo }) => {
        //         if (error) {
        //         console.log("error occurred");
        //         }
        //         if (data) {
        //         console.log("data-----", data);
        //         }
        //     }
        //     );

        //     Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

          
          // Second, call the method
          
        //  Notifications.presentNotificationAsync({
        //     title: 'Expo notification',
        //     body: 'presentNotificationAsync'
        //   })


        //   Notifications.scheduleNotificationAsync({
        //     content: {
        //       title: 'Test',
        //       body: "Initial test",
        //     },
        //     trigger: { seconds: 2 },
        //   });

        //   this.schedulePushNotification();

        // *** BACKGROUND FETCH TASK


        // *** /background fetch task



        // this.sendPushNotification();

        
        this.populateGuardObjects();
        this.checkForActiveShift();
    }

    async schedulePushNotification() {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Report Required",
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
        //   const { status: existingStatus } = await Notifications.getPermissionsAsync();
        //   let finalStatus = existingStatus;
        //   if (existingStatus !== 'granted') {
        //     const { status } = await Notifications.requestPermissionsAsync();
        //     finalStatus = status;
        //   }
        //   if (finalStatus !== 'granted') {
        //     alert('Failed to get push token for push notification!');
        //     return;
        //   }

          token = (await Notifications.getExpoPushTokenAsync({ projectId: Constants.expoConfig.extra.eas.projectId }));
        //   console.log(token);
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        console.log('token: ', token.data);
        return token.data;
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
    checkForActiveShift(){

        const axiosInstance = axios.create({
            baseURL: appConfig.backendUrl,
            headers: {'Authorization': 'Bearer '+ this.props.authToken}
        });
          
        axiosInstance.get('/mobile/guard/get_active_shift').then(response => {
            if(response.data.status == 'active_shift_found'){
                this.props.setObjectId(response.data.object_id) ;
                this.props.setObjectName(response.data.object_name);
                this.props.setShiftOpened();
                this.startRepotButtonPoll();
            }
        });
    }

    /**
     * Component unmount - clear interval
     */
    componentWillUnmount(){
        // ...
    }


    /**
     * Object selector
     */
    UiObjectSelector(){
        const guardObjects = this.state.guardObjects;
        console.log('guard objects', guardObjects);

        if(this.props.shiftOpened == false){
            return (
                <View>
                    
                    {/* <SelectDropdown
                            data={guardObjects}
                            defaultButtonText="Select object"
                            onSelect={(selectedItem, index) => {
                                 
                                
                                // console.log(selectedItem.id);

                                this.props.setObjectId(selectedItem.id);
                                this.props.setObjectName(selectedItem.name);
                                
                                const axiosInstance = axios.create({
                                    baseURL: appConfig.backendUrl,
                                    headers: {'Authorization': 'Bearer ' + this.props.authToken}
                                });
                                  
                                axiosInstance.get('/mobile/guard/object_shift_status/1').then(response => {
                                    // add 401 processing
                                    // console.log(response.data);
                                    if(response.data.status == 'shift_active'){
                                        
                                        // Set status to shift opened
                                        this.props.setShiftOpened();

                                        // Start report button poll
                                        this.startRepotButtonPoll();

                                        

                                    } else if (response.data.status == 'shift_inactive'){
                                        this.props.setShiftClosed();
                                    }
                                });

                                this.setState({
                                    guardObjects: this.state.guardObjects,
                                    reportButtonChecker: null
                                });
                                
                                //console.log(selectedItem, index);
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem.name
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item.name
                            }}
                        /> */}
                    
                </View>
            );
        
        }
        
    }

    closeShiftUi(){
        // Make axios call
        const axiosInstance = axios.create({
            baseURL: appConfig.backendUrl,
            headers: {'Authorization': 'Bearer '+ this.props.authToken}
        });
          
        axiosInstance.post('/mobile/guard/object_shifts/close_shift', null, { params: {objectId: this.props.selectedObjectId} }).then(response => {
            if(response.data.status == 'shift_closed'){
                this.props.setShiftClosed();
                this.props.setReportButtonInactive();

                clearInterval(this.state.reportButtonChecker);

                this.setState({
                    guardObjects: this.state.guardObjects,
                    reportButtonChecker: null
                });
            }
        });
    }



    openShiftUi(){
        

        // Create axios instance
        const axiosInstance = axios.create({
            baseURL: appConfig.backendUrl,
            headers: { 'Authorization': 'Bearer ' + this.props.authToken }
        });

        // Make call to open (create) shift
        axiosInstance.post('/mobile/guard/object_shifts/open_shift', null, {params: {objectId: this.props.selectedObjectId, pushToken: this.props.expoPushToken} } ).then(response => {
            // Successful response
            if(response.data.status == 'shift_opened'){
                this.props.setShiftOpened();

                this.startRepotButtonPoll();

            }
        });


    }

    openCloseShiftButton(){
        if(this.props.selectedObjectId != null && this.props.selectedObjectId > 0 && this.props.reportButtonActive == false){
           
            // Получите id из props
            const selectedId = this.props.selectedObjectId;

            // id в массиве guardObjects
            const selectedObject = this.state.guardObjects.find(obj => obj.id === selectedId);
            if (selectedObject) {
                if (selectedObject.control === 'awake') {
                  if (this.props.shiftOpened === true) {
                    return (
                      <View>
                        <Button title="close shift" color="red" onPress={() => this.closeShiftUi()}></Button>
                      </View>
                    );
                  } else {
                    return (
                      <View>
                        <Button title="open shift" color="green" onPress={() => this.openShiftUi()}></Button>
                      </View>
                    );
                  }
                } else if (selectedObject.control === 'rout') {
                    return (
                        <LocationControlScreen 
                            selectedObjectId={selectedId}
                            locationShiftOpened={this.locationShiftOpened}
                            locationShiftClosed={this.locationShiftClosed}
                        />
                    );
                }
              } else {
                // Обработка случая, когда объект не найден
              }
        }
    }

    reportAwake(){
        const axiosInstance = axios.create({
            baseURL: appConfig.backendUrl,
            headers: {'Authorization': 'Bearer '+ this.props.authToken}
        });
          
        axiosInstance.post('/mobile/guard/object_shifts/report_not_sleeping', null, { params: {object_id: this.props.selectedObjectId} })
            .then(response => {
            if(response.data.status == 'report_success'){
                this.props.setReportButtonInactive()
            }
        })
            .catch(error => {
                console.log(error.toJson());
            });

    }

    reportButton() {
        if(this.props.reportButtonActive == true){
            return (<View>
                <Button title="Report" color="green" onPress={() => this.reportAwake() }></Button>
            </View>);
        }
    }

    startRepotButtonPoll(){
        
        this.setState((state, props) => {
            return { 
                guardObjects: this.state.guardObjects,
                reportButtonChecker: setInterval(function(){
                    
                    const axiosInstance = axios.create({
                        baseURL: appConfig.backendUrl,
                        headers: {'Authorization': 'Bearer '+ props.authToken}
                    });

                    // console.log(state);
                      
                    axiosInstance.get('/mobile/guard/object_shifts/' + props.selectedObjectId + '/is_report_button_active').then( (response) => {
                        console.log(response.data.status);
                        
                        if(response.data.status == 'button_active'){
                            
                            // console.log('notification check', props.reportNotificationShown);
                            // Trigger notification
                            if(state.notificationShown == false){

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

                }, 1000)
            }
        });
    
    }

    // logoutButton(){
    //     const logoutStyles = StyleSheet.create({
    //         logoutButton: {
    //             marginTop: '20px'
    //         }
    //     });

    //     if(this.props.shiftOpened == false){
    //         return (
    //             <View>
    //                 <Text>{"\n"}{"\n"}</Text>
    //                 <Button title="Logout" color="red" style={logoutStyles.logoutButton} onPress={() => this.logoutAction() }></Button>
    
    //             </View>
    //         );

    //     }
        

    // }

    // logoutAction(){
    //     console.log('logout action');
    //     this.props.logoutReducer();

    //     // !!! clear timer
    //     // ...

    //     // Send API request to delete key
    //     // ...
    //     const { navigation } = this.props;
    //     navigation.navigate('LoginScreen');
    // }

    objectNameLabel(){
        if(this.props.shiftOpened == true){
            return (
                <Text>
                    { this.props.selectedObjectName }
                </Text>
            );

        }
        
    }


    testTriggerNotification(){
        console.log('test trigger notification');
        
    }   
    
    tokenCheck(){
        return (
            <Text>
                Token: { this.props.expoPushToken }
            </Text>
        );
    }

    /**
     * Render
     */
    render(){
        // <Text>Token: { this.props.authToken }</Text>
        // <Text>{ this.props.selectedObjectId }</Text>
        return (
            <View style={GlobalStyle.main}>
              { this.UiObjectSelector() }
              { this.objectNameLabel() }
              { this.openCloseShiftButton() }
              { this.reportButton() }
              {/* { this.logoutButton() } */}
              {/* { this.tokenCheck() } */}
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
      expoPushToken: state.shift.value.expoPushToken
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
        setReportNotificationNotShown: () => dispatch(setReportNotificationNotShown()),
        logoutReducer: () => dispatch(logoutReducer()),
        
    };
};
    
export default connect(mapStateToProps, mapDispatchToProps)(ShiftControlScreen);