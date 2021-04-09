import React from 'react';
import { useEffect } from 'react';
import {View,StyleSheet, FlatList, TouchableWithoutFeedback, Text} from 'react-native';

import firebase from 'firebase';

import ListItem from '../component/ListItem';
import Card from '../component/Card';
import ListItemSeperator from '../component/ListItemSeperator';

const menuCategory= [{
    title:"Wishlist",
    icon:{
        name:"heart",
    },
    targetScreen:"Wishlist"
},
{
    title:"Orders",
    icon:{
        name:"cart",
    },
    targetScreen:"AddtoCart"
},
{
    title:"Notifications",
    icon:{
        name:"bell",
    }
}]

function ProfileScreen(props) {
    useEffect(()=>
    {
        checkIfLoggedIn()
    },[]);

    const checkIfLoggedIn=()=>
    {
        firebase.auth().onAuthStateChanged((user)=>
        {
            if(user!=null)
            {
                // console.log(user);
            }
            else
            {
                props.navigation.navigate("Login")
            }
        })
    }

    const LogOut=()=>
    {
        console.log("LogOut")
        firebase.auth().signOut();
        props.navigation.navigate("E CART")
    }
return (
<View style={styles.container}> 
<ListItem 
    imageUri={firebase.auth().currentUser.photoURL}
    name={firebase.auth().currentUser.displayName}
    email={firebase.auth().currentUser.email} />
<View style={styles.flatlist}>
    <FlatList 
    data={menuCategory}
    keyExtractor={(menuCategoryItem)=>menuCategoryItem.title}
    renderItem={({item})=>
        <Card 
        name={item.icon.name}
        category={item.title}
        onPress={()=>{props.navigation.navigate(item.targetScreen)}}
        />
    }
    ItemSeparatorComponent={ListItemSeperator}
     />
</View>

<View style={styles.logOut}>
    <TouchableWithoutFeedback onPress={()=>{LogOut()}}>
    <Text style={styles.logOutText}>LogOut</Text>
    </TouchableWithoutFeedback>
</View>
    
</View>
 );
}

const styles = StyleSheet.create({
container:
{
    flex:1
},
flatlist:
{
    paddingTop:50
},
logOut:
{
    height:40,
    width:"75%",
    position:"absolute",
    bottom:20,
    backgroundColor:"tomato",
    alignSelf:"center",
    borderRadius:25,
    justifyContent:"center",
    alignItems:"center"
},
logOutText:
{
    color:"white",
    fontSize:17,
    fontWeight:"600"
}
})

export default ProfileScreen;