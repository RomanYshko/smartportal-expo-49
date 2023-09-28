import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert, 
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  setObjectId,
  setObjectName,
  setExpoPushToken,
} from '../../../store/ShiftSlice';
import appConfig from '../../../config/appConfig.json';

import { SelectObjectStyle } from '../../../assets/style/SelectObjectStyle';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const SelectObjectClass = (props) => {
  const [guardObjects, setGuardObjects] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    populateGuardObjects();
  }, []);

  const toggleButton = () => {
    setIsActive(!isActive);
  };

  const populateGuardObjects = () => {
    const axiosInstance = axios.create({
      baseURL: appConfig.backendUrl,
      headers: { Authorization: 'Bearer ' + props.authToken },
    });

    axiosInstance.get('/mobile/guard/object_list').then((response) => {
      setGuardObjects(response.data);
    });
  };

  /* List object */
  const UiObjectSelector = () => {
    return (
      <View style={SelectObjectStyle.classSelectObject}>
        <FlatList 
          data={guardObjects}
          keyExtractor={(item) => item.id.toString()} 
          renderItem={({ item }) => (
            <TouchableOpacity
              style={SelectObjectStyle.classSelectObjectbutton}
              onPress={() => {
                props.setObjectId(item.id);
                props.setObjectName(item.name);
              }}>
              <Text style={
                  props.selectedObjectId === item.id
                 ? SelectObjectStyle.classSelectObjectActive
                 : SelectObjectStyle.classSelectObjectText
                }>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  const objectNameLabel = () => {
    if (props.shiftOpened) {
      return <Text>{props.selectedObjectName}</Text>;
    }
  };

  /* Show alert if object empty*/
  const handleAlert = () => {
    Alert.alert('Empty object', 'Please select object!', [
      { text: 'OK', onPress: () => console.log('OK') },
    ]);
  };

  /* Check tab button if empty object*/
  const tabButton = () => {
    if(props.selectedObjectId){
      return (
        <TouchableOpacity
        style={
          isActive
            ? SelectObjectStyle.buttonNotActive
            : SelectObjectStyle.buttonActive
        }
        onPress={toggleButton}>
        <Text
          style={
            isActive
              ? SelectObjectStyle.buttonNotActiveText
              : SelectObjectStyle.buttonActiveTextRight
          }></Text>
      </TouchableOpacity>
      );
    }else{
      return (
        <TouchableOpacity
        style={
          isActive
            ? SelectObjectStyle.buttonNotActive
            : SelectObjectStyle.buttonActive
        }
        onPress={handleAlert}>
        <Text
          style={
            isActive
              ? SelectObjectStyle.buttonNotActiveText
              : SelectObjectStyle.buttonActiveTextRight
          }></Text>
      </TouchableOpacity>
      );
    }   
  }


  /* Check button select if empty object*/
  const selectButton = () => {
    if(props.selectedObjectId){   
      return (
          <TouchableOpacity style={SelectObjectStyle.buttonSelect} onPress={toggleButton}>
            <View style={SelectObjectStyle.buttonSelectView}>
              <Text style={SelectObjectStyle.buttonSelectText}>Select</Text>
            </View>
          </TouchableOpacity>
      );
    }else{
      return (
        <TouchableOpacity style={SelectObjectStyle.buttonSelect} onPress={handleAlert}>
            <View style={SelectObjectStyle.buttonSelectView}>
              <Text style={SelectObjectStyle.buttonSelectText}>Select</Text>
            </View>
          </TouchableOpacity>
      );
    }
  }


  /** open shift check control */
  const openShift = () => {
    const selectedObject = guardObjects.find(obj => obj.id === props.selectedObjectId);
    if(selectedObject.control === 'awake'){
      return (
        <TouchableOpacity style={SelectObjectStyle.buttonSelect} onPress={openShiftAwake}>
          <View style={SelectObjectStyle.buttonSelectView}>
            <Text style={SelectObjectStyle.buttonSelectText}>Open shift</Text>
          </View>
        </TouchableOpacity>
      );
    }else{
      return (
        <TouchableOpacity style={SelectObjectStyle.buttonSelect} onPress={openShiftRout}>
          <View style={SelectObjectStyle.buttonSelectView}>
            <Text style={SelectObjectStyle.buttonSelectText}>Open shift</Text>
          </View>
        </TouchableOpacity>
      );
    }
  }

  /** open class awake */
  const openShiftAwake = () => {
    navigation.navigate('ControlAwake');
  }

  /** open class rout */
  const openShiftRout = () => {
    navigation.navigate('ControlRout');
  }
  return (
    <View style={SelectObjectStyle.main}>
      <View style={
              isActive
              ? SelectObjectStyle.containerTabFirst
              : SelectObjectStyle.containerTabSecond
              }>
        <TouchableOpacity
          style={
            isActive
              ? SelectObjectStyle.buttonActive
              : SelectObjectStyle.buttonNotActive
          }
          onPress={toggleButton}>
          <Text
            style={
              isActive
                ? SelectObjectStyle.buttonActiveText
                : SelectObjectStyle.buttonNotActiveLeftText
            }></Text>
        </TouchableOpacity>
        {tabButton()}    
      </View>
      {isActive ? (
        <View style={SelectObjectStyle.conteiner}>
          <Text style={SelectObjectStyle.textButtonTab}>Step 1/2</Text>
          <Text style={SelectObjectStyle.textTitle}>Select an object</Text>
          <Image
            source={require('../../../assets/images/SelectObject1.png')}
            style={SelectObjectStyle.imageStyle}
          />
          {UiObjectSelector()}
          {objectNameLabel()}
          <View style={SelectObjectStyle.conteiner}>
            {selectButton()}
          </View>
        </View>
      ) : (
        <View style={SelectObjectStyle.conteiner}>
          <Ionicons style={SelectObjectStyle.backIcon} name="chevron-back" size={25} color="black" onPress={toggleButton} />
          <Text style={SelectObjectStyle.textButtonTabSecond}>Step 2/2</Text>
          <Text style={SelectObjectStyle.textTitle}>Memo to employee</Text>
          <Image
            source={require('../../../assets/images/SelectObject2.png')}
            style={SelectObjectStyle.imageStyle}
          />
          <View style={SelectObjectStyle.containerDot}>
            <View style={SelectObjectStyle.dot} />
            <Text style={SelectObjectStyle.textDot}>Respond to sleep monitoring messages</Text>
          </View>
          <View style={SelectObjectStyle.containerDot}>
            <View style={SelectObjectStyle.dot} />
            <Text style={SelectObjectStyle.textDot}>Always mark the beginning and end of the route when making rounds</Text>
          </View>
          <View style={SelectObjectStyle.containerDot}>
            <View style={SelectObjectStyle.dot} />
            <Text style={SelectObjectStyle.textDot}>At the end of the workday, close the shift in the app</Text>
          </View>
          <Text style={SelectObjectStyle.textGoodDay}>Have a good day at work !</Text>
          {openShift()}
        </View>
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    authToken: state.test.value.testKey,
    selectedObjectId: state.shift.value.selectedObjectId,
    selectedObjectName: state.shift.value.selectedObjectName,
    shiftOpened: state.shift.value.shiftOpened,
    expoPushToken: state.shift.value.expoPushToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setObjectId: (newId) => dispatch(setObjectId(newId)),
    setObjectName: (objectName) => dispatch(setObjectName(objectName)),
    setExpoPushToken: (newToken) => dispatch(setExpoPushToken(newToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectObjectClass);
