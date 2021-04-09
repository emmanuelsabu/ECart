import React, { useState } from 'react';
import {View,StyleSheet,Text, TouchableOpacity} from 'react-native';

let x;
function SizeCard({size,selectedSize,onPress}) {

if(selectedSize==size)
{
    x=true
}
else { x =false }
    
return (
<View style={styles.container}> 
<TouchableOpacity onPress= {()=>{onPress()}}>
<View style={{
    justifyContent:'center',
    alignItems:"center", 
    width:50,
    height:50,
    borderRadius:25,
    backgroundColor:x?'black':'white'}}>
        <Text style={{color:"tomato",fontSize:17,fontWeight:"700"}}>{size}</Text>
</View>
</TouchableOpacity>
</View>
 );
}

const styles = StyleSheet.create({
container:{
    justifyContent:'center',
    alignItems:"center",
    padding:2,
},
size:
{   
},
})

export default SizeCard;