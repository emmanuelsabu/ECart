import React from 'react';
import {View,StyleSheet, Text} from 'react-native';

import firebase  from 'firebase';
import { useState } from 'react';


function FirebaseDBandStoragehandler(props) {

    const[imageUri,setImageUri]=useState("");
    
    const imageUrifromStorage=()=>
    {
        firebase.storage().ref('/'+'OIP (1).jfif').getDownloadURL().then((url)=>console.log(url))
    }
    
    const call=()=>
    {
        firebase.database().ref('Products').on('value',data=>(console.log(data)))
    }
    
    // const insert=()=>
    // {
        firebase.storage().ref('/'+'Samsung.jpeg').getDownloadURL().then((url)=>setImageUri(url)).then(console.log(imageUri))
        firebase.database().ref('Products/10').set(
            {
                Item:"Samsung.jpeg",
                Category:"Mobile",
                Cost:16000, 
                imageUri:imageUri,
                Id:10,
                Wishlist:false
            }
        ).then(()=>
        {
            console.log("Inserted")
        }).catch((error)=>
        {
            console.log(error)
        })
    // }

    const update =()=>
    {
        firebase.database().ref('Products/002').update({Item:"Addidas Shoes"})
    }

    const deleteData =()=>
    {
        firebase.database().ref('Products/002').remove();
    }
   
return (
<View style={styles.container}> 
<Text>Hello World</Text>
</View>
 );
}

const styles = StyleSheet.create({
container:{}
})

export default FirebaseDBandStoragehandler;