import React from 'react';
import {View,StyleSheet, TouchableOpacity, Text, ActivityIndicator, Modal} from 'react-native';

import firebase from 'firebase'
import * as Google from 'expo-google-app-auth';
import { firebaseConfig } from '../component/FirebaseConfig';
import { useState } from 'react';

function LoginScreen(props) 
{
    const[loadingVisibility,setLoadngVisibility] = useState(false)
    const signInWithGoogle = async()=>
    {
        setLoadngVisibility(true);
        try {
            const result =await Google.logInAsync ({
                    androidClientId: firebaseConfig.androidClientId,
                    scopes:['profile','email']
                });

                if(result.type==="success")
                {
                    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
                    const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken,result.accessToken);
                    const googleProfileData = await firebase.auth().signInWithCredential(credential); 

                    props.navigation.navigate("Home")
                    setLoadngVisibility(false)
                }
        } catch (error) {
            console.log("Login Error:" +error)
        }
    }
return (
<>
<View style={styles.container}> 
    <View style={styles.googleSignIn}>
        <TouchableOpacity onPress={()=>signInWithGoogle()}>
            <Text style={styles.googleSignInText}>Sign in with Google</Text>
        </TouchableOpacity>
    </View>
</View>
<Modal visible={loadingVisibility} >
    <View style={{justifyContent:"center",alignContent:"center",flex:1}}>
    <ActivityIndicator style={{alignSelf:"center"}} animating={true} size="large" color="tomato"/>
    </View>
  </Modal>
  </>
 );
}

const styles = StyleSheet.create({
container:{
    flex:1,

},
googleSignIn:{
    width:"100%",
    height:50,
    borderRadius:20,
    backgroundColor:"tomato",
    position:"absolute",
    bottom:20,
    justifyContent:"center",
    alignItems:"center",
    },
googleSignInText:{
    fontSize:18,
    fontWeight:"600",
    color:"white",
}
})

export default LoginScreen;