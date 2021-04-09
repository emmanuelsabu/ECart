import React from 'react';
import {View,StyleSheet, FlatList, Text,BackHandler, TouchableWithoutFeedback, Alert} from 'react-native';
import CategoryCard from '../component/CategoryCard';

import {MaterialCommunityIcons} from "@expo/vector-icons";

import firebase from 'firebase';
import { useDispatch } from 'react-redux';
import { updateAddress, updateAddToCart, updateProductList, updateWishlistArray } from '../redux/reducer';
import { useState } from 'react/cjs/react.development';
import { useEffect } from 'react';

import { useFocusEffect } from "@react-navigation/native";

// const dispatch=useDispatch();
const category = [
    {
        id:1,
        name:"Drees",
        icon:"dresser" },
    {
        id:2,
        name:"Electronics",
        icon:"computer"},
    {
        id:3,
        name:"Furniture",
        icon:"chair" },
    {
        id:4,
        name:"Footwear",
        icon:"shoe" },
    {
        id:5,
        name:"Toys",
        icon:"toy" },
    {
        id:6,
        name:"Sports",
        icon:"ball" },
    {
        id:7,
        name:"Mobile",
        icon:"mobile" } ];

function HomeScreen(props) {
    let wishlist=[];
    let addToCart=[];
    let productArray=[];
    let adres=[];
    

    const dispatch = useDispatch();

    const [products,setProducts]=useState([]);
    const [wishlistArray,setWishlistArray]=useState([]);
    const [addToCartArray,setAddtoCartArray]=useState([]);
    const [address,setAddress]=useState([]);

    useEffect(()=>
    {
        loadWishlist();
        loadAddToCart();
        loadProducts();
        loadAddress();
    },[]);

    
      useFocusEffect(
        React.useCallback(() => {
          BackHandler.addEventListener("hardwareBackPress", backAction);
    
          return () => {
            BackHandler.removeEventListener("hardwareBackPress", backAction);
          };
        }, [])
      );

    const backAction = () => {
        Alert.alert("Alert!", "Are you sure you want to Exit?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      };   

    const loadWishlist = async()=>
    {
        await firebase.database().ref('/Wishlist/').once('value').then(snapshot=>{
            snapshot.forEach(data=>
                {
                    if(data.val().Email==firebase.auth().currentUser.email)
                    {
                        wishlist.push(data.val())
                    }
                });
                setWishlistArray(wishlist)

        }) ;

    };

    const loadAddToCart = async()=>
    {
        await firebase.database().ref('/Cart/').once('value').then(snapshot=>{
            snapshot.forEach(data=>
                {
                    if(data.val().Email==firebase.auth().currentUser.email)
                    {
                        addToCart.push(data.val())
                    }
                });
                setAddtoCartArray(addToCart)

        }) ;

    };

    const loadProducts = async()=>
    {
       await firebase.database().ref('/Products/').once('value').then(snapshot=>{
              snapshot.forEach(data => {
                  productArray.push(data.val())
              });
              setProducts(productArray)
          })
    
    };
    const loadAddress=async()=>
    {
        await firebase.database().ref('/Address').once('value').then(snapshot=>
            {
                snapshot.forEach(data=>{
                        if(data.val().Email==firebase.auth().currentUser.email)
                        {
                            adres.push(data.val())
                        }
                    });
                    setAddress(adres)
            })
    }

        // API CALL for WishlistArray, AddtoCartArray
        dispatch(updateProductList(products))
        dispatch(updateWishlistArray(wishlistArray));
        dispatch(updateAddToCart(addToCartArray));
        dispatch(updateAddress(address));

return (
<View style={styles.container}> 
<View style={styles.header}>
    <Text style={{color:"white",fontWeight:"bold",fontStyle:"italic",fontSize:20,position:"absolute",left:20}}>E CART</Text>
    <View style={styles.iconContainer}>
    <TouchableWithoutFeedback onPress={()=>props.navigation.navigate("AddtoCart")}>
    <MaterialCommunityIcons name="cart" size={25} color="white" />
    </TouchableWithoutFeedback>
    </View>
    <View style={styles.wishlistContainer}>
    <TouchableWithoutFeedback onPress={()=>props.navigation.navigate("Wishlist")}>
    <MaterialCommunityIcons name="heart" size={25} color="white" />
    </TouchableWithoutFeedback>
    </View>
    <View style={styles.notificationContainer}>
    <TouchableWithoutFeedback onPress={()=>props.navigation.navigate("Notification")}>
    <MaterialCommunityIcons name="bell" size={25} color="white" />
    </TouchableWithoutFeedback>
    </View>
</View>
<FlatList 
    data={category}
    keyExtractor={item=>item.id.toString()}
    renderItem={({item})=>
    <CategoryCard   
            
            category={item.name}
            onPress={()=>props.navigation.navigate('Category',item)}
            /> 
            } />
</View>
 );
}

const styles = StyleSheet.create({
container:
{
    paddingTop:30,
    padding:10,
    flex:1,
    
},
header:
{
    width:"100%",
    height:50,
    width:"100%",
    backgroundColor:"tomato",
    justifyContent:"center",
    alignItems:"center"
},
iconContainer:
{
    position:"absolute",
    right:20,
},
wishlistContainer:
{
    position:"absolute",
    right:80
},
notificationContainer:
{
    position:"absolute",
    right:140
}
})

export default HomeScreen;