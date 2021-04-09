import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screen/HomeScreen';
import LoadingScreen from '../screen/LoadingScreen';
import LoginScreen from '../screen/LoginScreen';
import AppNavigator from './AppNavigator';
import DisplayScreen from '../screen/DisplayScreen';
import CategoryScreen from '../screen/CategoryScreen';
import AddtoCart from '../screen/AddtoCart';
import WishlistScreen from '../screen/WishlistScreen';
import FilterScreen from '../screen/FilterScreen';
import AddAddress from '../screen/AddAddress';
import PlaceOrder from '../screen/PlaceOrder';

const Stack = createStackNavigator();

const AuthNavigator =()=>
(
    <Stack.Navigator screenOptions={{headerShown:true}} initialRouteName="Loading">
        <Stack.Screen name="E CART" component={LoadingScreen} />
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Home" component={AppNavigator} options={{headerShown:false}} />
        <Stack.Screen name="Display" component={DisplayScreen}/>
        <Stack.Screen name="Category" component={CategoryScreen}/>
        <Stack.Screen name="AddtoCart" component={AddtoCart}/>
        <Stack.Screen name="Wishlist" component={WishlistScreen}/>
        <Stack.Screen name="Filter" component={FilterScreen}/>
        <Stack.Screen name="Place Order" component={PlaceOrder}/>
        <Stack.Screen name="Add Address" component={AddAddress}/>
    </Stack.Navigator>
)

export default AuthNavigator;