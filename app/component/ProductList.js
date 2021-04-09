import React, { useEffect, useState } from 'react';
import {View,StyleSheet, Image, Text, TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import {MaterialCommunityIcons} from "@expo/vector-icons";

function ProductList({imageUrl,Item,Cost,Category,onPress,wishlistState,setWishlist}) 
{ 
    const[toggle,setToggle] = useState(wishlistState);
    
    const handleToogle =()=> { setToggle(!toggle) };
  
return (
<View style={styles.container}> 
<View style={{position:"absolute",right:10,top:10}}>
    <TouchableWithoutFeedback onPress={()=>{
        handleToogle();
        setWishlist();
        }} >
            <View>
            <MaterialCommunityIcons name="heart" size={30} style={{color: toggle? 'red': 'black' }}  />
            </View>
    </TouchableWithoutFeedback>
</View>
<TouchableOpacity onPress={onPress}>
<View style={styles.product}>
    <Image style={styles.image} source={{uri:imageUrl}}/>
    <Text style={styles.title}>{Item}</Text>
    <Text style={styles.price}>Rs.{Cost}</Text>
    <Text style={styles.category}>{Category}</Text>
</View>
</TouchableOpacity>
</View>
 );
}

const styles = StyleSheet.create({
container:{
    flex:1,
    padding:20,
    margin:5,
    flexDirection:"row",
    backgroundColor:"white"
},
product:
{ 
      flex:1,
               
},
image:
{
    width:100,
    height:100,
    resizeMode:"contain",
    alignSelf:"baseline"
},
title:
{
fontSize:18,
fontWeight:"bold"
},
price:
{
fontSize:15,
fontWeight:"bold"
},
category:
{
fontSize:13,
fontWeight:"300"
}
})

export default ProductList;