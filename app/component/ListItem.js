import React from 'react';
import {View,StyleSheet, Text, Image} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import Constants from 'expo-constants';


function ListItem({imageUri,name,email}) {
return (
<View style={styles.container}> 
<Image style={styles.profilePic} source={{uri:imageUri}}/>
<View style={styles.profileDetail}>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.email}>{email}</Text>
</View>
</View>
 );
}

const styles = StyleSheet.create({
container:{
    alignItems:"center",
    flexDirection:"row",
    paddingTop:50,
    paddingLeft:10,
      
},
profilePic:
{
    borderRadius:37.5,
    width:75,
    height:75,
},
profileDetail:
{
    justifyContent:"center",
    flexDirection:"column",
    paddingLeft:20,
    flexShrink:1
},
name:
{
    fontSize:16,
    fontWeight:"700",
    paddingBottom:10
},
email:
{
    fontSize:17,
    fontWeight:"300",
}
})

export default ListItem;