import React, { useState } from 'react';
import {View,StyleSheet,Text,TextInput,TouchableWithoutFeedback,Image} from 'react-native';
import {MaterialCommunityIcons} from "@expo/vector-icons";

function AddtoCartCardOrder({imageUri,title,cost,size,totalCost,updateCountValue,defaultValue,deleteItem}) {
const [val, setVal] = useState();
return (
<View style={styles.container}> 
<View style={styles.itemcontainer}>
    <Image style={styles.image} source={{uri:imageUri}} />
    <View style={styles.textContainer}>
    <Text style={styles.title}>{title}</Text>
    <View style={{flexDirection:"row",marginBottom:10}}>
    {size&&<Text>Size:</Text>}
    {size&&<Text style={styles.size}>{size}</Text>}
    </View>
    <Text style={styles.cost}>{cost}</Text>
    <View style={{flexDirection:"row",alignItems:"center",marginTop:5}}>
        <Text style={{marginRight:10}}>Count:</Text>
        <Text>{defaultValue}</Text>
    </View>
    </View>
        <Text style={styles.totalCost}>{totalCost}</Text>   
</View>
</View>
 );
}

const styles = StyleSheet.create({
container:{ backgroundColor:"white",marginVertical:5},
itemcontainer:
{
    marginTop:30,
    flexDirection:"row",
    alignItems:"center"
},
image:
{
    width:100,
    height:100,
    resizeMode:"contain"
},
textContainer:
{
    paddingLeft:20,
    justifyContent:"center",

},
title:
{
    fontSize:18,
    fontWeight:"500",
    marginBottom:10
},
totalCost:
{
    fontSize:20,
    fontWeight:"bold",
    position:"absolute",
    right:20
},
size:
{
    marginLeft:5
}
})

export default AddtoCartCardOrder;