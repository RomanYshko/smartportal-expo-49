import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    value: { 
        selectedObjectId: null,
        selectedObjectName: null,
        shiftOpened: false,
        reportButtonActive: false,
        reportNotificationShown: false,
        expoPushToken: null

    }
  };

export const ShiftSlice = createSlice({
    name: "ShiftSlice",
    initialState,
    reducers: {
        setObjectId: (state, testparam) => {
            console.log('set object id');
            state.value.selectedObjectId = testparam.payload;
            
        },
        setObjectName: (state, objectName) => {
            console.log('set name');
            state.value.selectedObjectName = objectName.payload;
        },
        setShiftOpened: (state) => {
            state.value.shiftOpened = true;
        },
        setShiftClosed: (state) => {
            state.value.shiftOpened = false;
        },
        openShift: (state) => {
            // Add axios call to backend to open shift
            // ...
            console.log('open shift');
            state.value.shiftOpened = true;
        },
        closeShift: (state) => {
            state.value.shiftOpened = false;
        },
        setTokenShift: (state, token) => {
            state.value.authToken = token.payload;

        },
        setReportButtonActive: (state) => {
            console.log('set report button active in reducer');
            state.value.reportButtonActive = true;
        },
        setReportButtonInactive: (state) => {
            console.log('set report button inactive in reducer');
            state.value.reportButtonActive = false;
        },
        setReportNotificationShown: (state) => {
            console.log('set report notification shown');
            state.value.reportNotificationShown = true;
        },
        setReportNotificationNotShown: (state) => {
            console.log('set report notification not shown');
            state.value.reportNotificationShown = false;
        },
        setExpoPushToken: (state, newToken) => {
            state.value.expoPushToken = newToken.payload;
        }
        
    }
});

export const { setObjectId, 
    setObjectName, setShiftOpened, setShiftClosed, openShift, closeShift, setReportButtonActive, setReportButtonInactive,
    setReportNotificationShown, setReportNotificationNotShown, sliceReportCheck, setExpoPushToken } = ShiftSlice.actions;

export default ShiftSlice.reducer;