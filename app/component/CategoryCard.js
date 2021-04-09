import React from 'react';
import {View,StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import {MaterialCommunityIcons} from "@expo/vector-icons";


function CategoryCard({onPress,category}) {
return (
<View style={styles.container}>
<TouchableOpacity onPress={onPress}>
<View style={styles.materialCommunityIcons}>
{/* <MaterialCommunityIcons name="electric-switch" color="black" size={30}/> */}
<Text style={styles.text}>{category}</Text>
</View>
</TouchableOpacity>

</View>
 );
}

const styles = StyleSheet.create({
container:{
    width:"100%",
    height:100,
    marginBottom:20,
    justifyContent:"center",
    backgroundColor:"white"
},

text:
{
    marginLeft:10,
    fontSize:18,
    fontWeight:"600"
}
})

export default CategoryCard;