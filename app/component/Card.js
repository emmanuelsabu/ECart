import React from 'react';
import {View,StyleSheet, Text, TouchableOp, TouchableOpacity} from 'react-native';
import {MaterialCommunityIcons} from "@expo/vector-icons";


function Card({name,category,onPress}) {
return (
<TouchableOpacity onPress={onPress}>
<View style={styles.container}> 
<MaterialCommunityIcons name={name} color="black" size={30}/>
<Text style={styles.text}>{category}</Text>
</View>
</TouchableOpacity>
 );
}

const styles = StyleSheet.create({
container:{
    padding:20,
    width:"100%",
    flexDirection:"row",
    alignItems:"center"
},
text:
{
    marginLeft:10,
    fontSize:18,
    fontWeight:"600"
}
})

export default Card;