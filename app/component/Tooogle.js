import React from 'react';
import { useState } from 'react';
import {View,StyleSheet, Button} from 'react-native';


function Tooogle(props) {
    const [tState,setTState]=useState(false);
     const toggleButton=()=>
     {
         setTState(!tState)
     }
return (
<View style={styles.container}> 
<Button title="Button" onPress={()=>{toggleButton(), console.log(tState)}}/>
</View>
 );
}

const styles = StyleSheet.create({
container:{
    marginTop:30,
    height:"100%",
    backgroundColor:"black",
    
    alignItems:"center"
}
})

export default Tooogle;