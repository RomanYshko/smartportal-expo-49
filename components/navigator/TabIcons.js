import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
// start menu icons

export const HomeIcon = ({color, size }) => (
    <Ionicons name="ios-home" size={25} color={color} />
);

export const HomeIconOutline = ({ color, size}) => (
    <Ionicons name="ios-home-outline" size={25} color={color} />
);

export const ShiftIcon = ({ color, size }) => (
    <MaterialCommunityIcons name="police-badge" size={30} color={color}  />
);

export const ShiftIconOutline = ({ color, size}) => (
    <MaterialCommunityIcons name="police-badge-outline" size={30} color={color}  />
);

export const LocationIconOutline = ({color, size}) => (
    <Ionicons name="md-location-outline" size={30} color={color} />
);

export const LocationIcons = ({color, size}) => (
    <Ionicons name="md-location-sharp" size={30} color={color} />
);

// finish menu icons


// Other icons
export const HeaderRightIcons = ({color, size}) => (
    <FontAwesome name="user-circle-o" size={size} color={color} />
);

export const HeaderLeftIcons = ({color, size}) => (
    <Ionicons name="md-chevron-back-outline" size={size} color={color} />
);



