import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';

import firebase from 'firebase'
import { firebaseConfig } from './app/component/FirebaseConfig';
import LoginScreen from './app/screen/LoginScreen';
import AuthNavigator from './app/component/AuthNavigator';
import ListItem from './app/component/ListItem';
import HomeScreen from './app/screen/HomeScreen';
import ProductList from './app/component/ProductList';
import FirebaseDBandStoragehandler from './app/component/FirebaseDBandStorageHandler';
import ProfileScreen from './app/screen/ProfileScreen';

import store from './app/redux/store';
import { Provider } from 'react-redux';
import AddtoCartCard from './app/component/AddtoCartCard';

if(firebase.apps.length===0)
{
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <AuthNavigator/>
      </NavigationContainer>
    </Provider>
  );
}
 
   
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
