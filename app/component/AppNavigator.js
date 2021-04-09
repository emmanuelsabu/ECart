import React from 'react';
import {MaterialCommunityIcons} from "@expo/vector-icons";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/HomeScreen';
import ProfileScreen from '../screen/ProfileScreen';

const Tab = createBottomTabNavigator();

const AppNavigator =()=>
{
    return(
        <Tab.Navigator initialRouteName="Home" >
        <Tab.Screen   name="Home" component={HomeScreen} options={{ 
            tabBarIcon:({color,size}) => <MaterialCommunityIcons name="home" size={size} color={color} />
        }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{
            tabBarIcon:({color,size})=><MaterialCommunityIcons name="account" size={size} color={color}/>
        }} />
        
    </Tab.Navigator>
    )
    
}

export default AppNavigator;    