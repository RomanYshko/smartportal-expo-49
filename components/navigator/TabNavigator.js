import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import {
  HomeIcon,
  ShiftIcon,
  HomeIconOutline,
  ShiftIconOutline,
  LocationIcons,
  LocationIconOutline,
} from './TabIcons';


import HomeScreen from '../common/HomeScreen';
import ShiftControlScreen from '../screenSecurity/ShiftControlScreen';
import LocationControlScreen from '../screenSecurity/LocationControlScreen';
import NotificationScreen from '../screenSecurity/NotificationScreen';
import CompanyScreen from '../company/CompanyScreen';
import HeaderTitle from '../header/HeaderTitle';
import HeaderRight from '../header/HeaderRight';
import HeaderLeft from '../header/HeaderLeft';

const Tab = createBottomTabNavigator();
// Task manager
import * as TaskManager from 'expo-task-manager';
// /task manager

export default function TabNavigator() {
  // ** Define location tracking task
  TaskManager.defineTask('testTask', async ({ data, error }) => {
    if (error) {
      console.log('LOCATION_TRACKING task ERROR:', error);
      return;
    }
    if (data) {
      const { locations } = data;
      let lat = locations[0].coords.latitude;
      let long = locations[0].coords.longitude;

      console.log(
        'test_xtask_run',
        `${new Date(Date.now()).toLocaleString()}: ${lat},${long}`
      );
    }
  });
  // /define location tracking task

  // User role
  const userRole = useSelector((state) => state.test.value.userRole);
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#626ed4',
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: {
          fontSize: 10,
        },
        tabBarStyle: {
          display: 'flex',
          backgroundColor: 'white',
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
        tabBarIcon: ({ color, size, focused }) => {
          switch (route.name) {
            case 'ShiftControlScreen':
              return focused ? (
                <ShiftIcon color={color} size={size} />
              ) : (
                <ShiftIconOutline color={color} size={size} />
              );
            case 'HomeScreen':
              return focused ? (
                <HomeIcon color={color} size={size} />
              ) : (
                <HomeIconOutline color={color} size={size} />
              );
            case 'LocationControlScreen':
              return focused ? (
                <LocationIcons color={color} size={size} />
              ) : (
                <LocationIconOutline color={color} size={size} />
              );
            case 'NotificationScreen':
              return focused ? (
                <HomeIcon color={color} size={size} />
              ) : (
                <HomeIconOutline color={color} size={size} />
              );
              case 'CompanyScreen':
              return focused ? (
                <HomeIcon color={color} size={size} />
              ) : (
                <HomeIconOutline color={color} size={size} />
              );
            default:
              return null;
          }
        },
      })}>

      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({ navigation }) => ({
            tabBarLabel: 'Home',
            title: 'Home',
            headerTitle: (props) => <HeaderTitle {...props} />,
            headerRight: () => <HeaderRight navigation={navigation} />
          })}
      />
      {userRole === 'security' && (
        <Tab.Screen
        name="ShiftControlScreen"
        component={ShiftControlScreen}
        options={({ navigation }) => ({
          tabBarLabel: 'Shift',
          title: 'Shift',
          headerLeft: () => <HeaderLeft navigation={navigation} />, 
          headerTitle: (props) => <HeaderTitle {...props} />,
          headerRight: () => <HeaderRight navigation={navigation} />
        })}
      />
      )}
      {userRole === 'security' && (
        <Tab.Screen
          name="LocationControlScreen"
          component={LocationControlScreen}
          options={({ navigation }) => ({
            tabBarLabel: 'Location',
            title: 'Location',
            headerLeft: () => <HeaderLeft navigation={navigation} />, 
            headerTitle: (props) => <HeaderTitle {...props} />,
            headerRight: () => <HeaderRight navigation={navigation} />
          })}
        />
      )}
      {userRole === 'security' && (
        <Tab.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={({ navigation }) => ({
            tabBarLabel: 'Notification',
            title: 'Notification',
            headerLeft: () => <HeaderLeft navigation={navigation} />, 
            headerTitle: (props) => <HeaderTitle {...props} />,
            headerRight: () => <HeaderRight navigation={navigation} />
          })}
        />
      )}
      {userRole === 'company' && (
        <Tab.Screen
          name="CompanyScreen"
          component={CompanyScreen}
          options={{ tabBarLabel: ' ' }}
        />
      )}
    </Tab.Navigator>
  );
}
