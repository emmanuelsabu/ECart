import React from 'react';
import {View,StyleSheet, Text} from 'react-native';

import firebase from 'firebase';
import { useEffect } from 'react';
import { ActivityIndicator} from 'react-native'


function LoadingScreen(props) {
    useEffect(()=>
    {
        setTimeout(() => 
        {
            checkIfLoggedIn();
        }, 5000);
        

    },[]);


    const checkIfLoggedIn=()=>
    {
        firebase.auth().onAuthStateChanged((user)=>
        {
            if(user)
            {
                props.navigation.navigate('Home')
            }
            else {
                props.navigation.navigate('Login')
            }
        })
    }
return (
<View style={styles.container}> 
<Text style={styles.text}>E Cart</Text>
<ActivityIndicator visible={true} size={'large'}  color="black"/>
</View>
 );
}

const styles = StyleSheet.create({
container:{
    flex:1,
    justifyContent:"center",
    alignItems:'center'
},
text:
{
    fontSize:20,
    color:"tomato",
    fontStyle:"italic",
    fontWeight:"bold",
    marginBottom:20
}
})

export default LoadingScreen;