import React from 'react';
import {View,StyleSheet, FlatList} from 'react-native';
import firebase from 'firebase';
import { useEffect } from 'react';
import ProductList from '../component/ProductList';
import { useState } from 'react/cjs/react.development';
import WishlistCard from '../component/WishlistCard';
import { setWishlist, updateWishlist, updateWishlistArray } from '../redux/reducer';
import { useDispatch, useSelector } from 'react-redux';

function WishlistScreen(props) {
    let wishlist=[];
    const dispatch = useDispatch();
    const wishlistUpdated = useSelector(state=>(state.counter.wishlistArray))

    const [wishlistArray,setWishlistArray]=useState([]);



return (
<View style={styles.container}>
    <FlatList 
        data={wishlistUpdated}
        keyExtractor={item=>item.Id.toString()}
        renderItem={({item})=>
        <WishlistCard
            imageUrl={item.imageUri}
            Item={item.Item}
            Cost={item.Cost}
            Category={item.Category}
            setWishlist={()=>
            {
                dispatch(setWishlist({item,wishlistUpdated}));
            }}
            onPress={()=>props.navigation.navigate('Display',item)}
             />
        } /> 
</View>
 );
}

const styles = StyleSheet.create({
container:
{
    paddingTop:25,
    padding:10,
}
})

export default WishlistScreen;