import React, { Component } from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import appConfig from '../../../config/appConfig.json';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import axios from 'axios';
import { connect } from 'react-redux';
import { ControlRoutStyle } from '../../../assets/style/ControlRoutStyle';

class ControlRoutClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isTracking: false };
  }

  componentDidMount() {
    // ** Request permissions
    Location.requestForegroundPermissionsAsync();
    Location.requestBackgroundPermissionsAsync();

    // *** Register task
    const LOCATION_TRACKING = 'location-tracking';
    TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
      if (error) {
        console.log('LOCATION_TRACKING task ERROR:', error);
        return;
      }
      if (data) {
        this.setState({ isTracking: true });
        const { locations } = data;
        let lat = locations[0].coords.latitude;
        let long = locations[0].coords.longitude;
        let selectedObjectId = this.props.selectedObjectId;

        l1 = lat;
        l2 = long;

        console.log(`${new Date(Date.now()).toLocaleString()}: ${lat},${long}`);

        // Create axios instance
        const axiosInstance = axios.create({
          baseURL: appConfig.backendUrl,
          headers: { Authorization: 'Bearer ' + this.props.authToken },
        });

        // Make call to open (create) shift
        axiosInstance.post('/mobile/guard/open_shift_route', null, {
          params: {
            type: 'background',
            lat: lat,
            lon: long,
            guard_object_id: selectedObjectId,
          },
        });
      }
    });
  }

  // FOREGROUND location tracking
  startLocationTracking() {
    console.log('start tracking function called');

    // ** Start tracking
    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 2500,
        distanceInterval: 0,
      },
      (location) => {
        console.log(
          'update location!',
          location.coords.latitude,
          location.coords.longitude
        );

        // Create axios instance
        const axiosInstance = axios.create({
          baseURL: 'http://sp.p-yakymenko.com',
          headers: { Authorization: 'Bearer ' + this.props.authToken },
        });

        // Make call to open (create) shift
        axiosInstance.post('/mobile/guard/test_log_position', null, {
          params: {
            type: 'foreground',
            lat: location.coords.latitude,
            lon: location.coords.longitude,
          },
        });
      }
    ); // end callback for watchPositionAsync
  }

  /**
   * BACKGROUND start location tracking
   */
  startLocationBackgroundTracking() {
    // Start background tracking
    const LOCATION_TRACKING = 'location-tracking';
    Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
      accuracy: Location.Accuracy.High,
      timeInterval: 2500,
      distanceInterval: 0,
      showsBackgroundLocationIndicator: true,
      foregroundService: {
        notificationTitle: 'App is running',
        notificationBody: 'Location tracking',
      },
    });
  }

  /**
   * Stop location tracking (background)
   */
  stopLocationBackgroundTracking(selectedObjectId) {
    // Create axios instance
    const axiosInstance = axios.create({
      baseURL: appConfig.backendUrl,
      headers: { Authorization: 'Bearer ' + this.props.authToken },
    });

    // Make call to open (create) shift
    axiosInstance.post('/mobile/guard/close_shift_route', null, {
      params: {
        type: 'background',
        guard_object_id: selectedObjectId,
      },
    });

    const LOCATION_TRACKING = 'location-tracking';
    Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
    this.setState({ isTracking: false });
  }

  /**
   * Start/stop background tracking button
   */
  uiStartStopTrackingButton() {
    if (this.state.isTracking == true) {
      return (
        <Button
          title="Stop background tracking"
          color="red"
          onPress={() => {
            this.stopLocationBackgroundTracking(this.props.selectedObjectId);
          }}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}></Button>
      );
    } else {
      return (
        <Button
          title="Start background tracking"
          color="green"
          onPress={() => {
            this.startLocationBackgroundTracking();
          }}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}></Button>
      );
    }
  }

  checkBackgroundStatus() {
    const LOCATION_TRACKING = 'location-tracking';
    TaskManager.isTaskRegisteredAsync(LOCATION_TRACKING).then((status) => {
      this.setState({ isTracking: status });
    });
  }

  checkStatusLabel() {
    if (this.state.isTracking == true) {
      return <Text>True</Text>;
    } else {
      return <Text>False</Text>;
    }
  }

  render() {
    return (
      <View style={ControlRoutStyle.main}>{this.uiStartStopTrackingButton()}</View>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    authToken: state.test.value.testKey,
    selectedObjectId: state.shift.value.selectedObjectId,
  };
};


export default connect(mapStateToProps)(ControlRoutClass);
