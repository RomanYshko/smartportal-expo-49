import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import GetStart from '../login/GetStart';
import LoginScreen from '../login/LoginScreenClass';
import SelectObject from '../security/screen/SelectObjectClass';
import ControlAwake from '../security/screen/ControlAwakeClass';
import ControlRout from '../security/screen/ControlRoutClass'

import LocationControlScreen from '../security/LocationControlScreen';

export default function StackNavigator()
{
    return (
        <Stack.Navigator>
          <Stack.Screen
            name="GetStart"
            component={GetStart}
            options={{
              headerShown: false
            }}
          /> 
          <Stack.Screen 
            name="LoginScreen" 
            component={LoginScreen} 
            options={{
            headerShown: false, 
          }}
        />
        <Stack.Screen 
          name="SelectObject"
          component={SelectObject}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="ControlAwake"
          component={ControlAwake}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="ControlRout"
          component={ControlRout}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
}