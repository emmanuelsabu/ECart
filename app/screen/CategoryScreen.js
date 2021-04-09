import React from 'react';
import {View,StyleSheet, Text, FlatList, Button, TouchableWithoutFeedback} from 'react-native';

import ProductList from '../component/ProductList';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWishlist, sortProducts, updateWishlist, updateWishlistArray } from '../redux/reducer';
import Constants from 'expo-constants'
import { Picker } from '@react-native-picker/picker';
import Card from '../component/Card';


function CategoryScreen(props) {
   
const dispatch = useDispatch();
const wishlistArray = useSelector(state=>(state.counter.wishlistArray));
const prod = useSelector(state=>(state.counter.productArray))

const [selectedSort,setSelectedSort]=useState();
// const [wishlistArray,setWishlistArray]=useState([]);
   const Category = props.route.params.name; 

        const array = prod.filter((m)=>m.Category===Category);

return (
<View style={styles.container}>
    <View style={{width:"100%",height:"10%",flexDirection:"row",alignItems:"center",padding:3}}>
    <View style={{width:"35%",height:"100%",backgroundColor:"white",flexDirection:'row',alignItems:"center",padding:3,position:'absolute',left:10}}>
        <Text style={{fontSize:18,fontWeight:"600"}}>Sort:</Text>
        <Picker style={styles.pickerStyle} 
            selectedValue={selectedSort}
            onValueChange={(itemValue,itemPosition)=>
            {
                setSelectedSort(itemValue)
                dispatch(sortProducts(itemPosition))
            }}>  
                    <Picker.Item label="Popularity" value="POP" />  
                    <Picker.Item label="Price-Low to High" value="PLH" />  
                    <Picker.Item label="Price-High to Low" value="PHL" />  
        </Picker>
    </View>

    {/* <View style={{width:"35%",height:"100%", backgroundColor:"white",flexDirection:'row',alignItems:"center",padding:3,position:"absolute",right:10}}>
            <Card name="filter-outline" category="Filter" onPress={()=>props.navigation.navigate("Filter")} />      
    </View> */}
    </View>
   
  
<View style={styles.flatlist}>
<FlatList 
numColumns={2}
    data={array}
    keyExtractor={(productArrayItem)=>productArrayItem.Id.toString()}
    renderItem={({item})=>
    <ProductList 
        imageUrl={item.imageUri}
        Item={item.Item}
        Cost={item.Cost}
        Category={item.Category}
        onPress={()=>props.navigation.navigate('Display',item)}
        setWishlist={()=>
        {
            dispatch(setWishlist({item,wishlistArray}))
        }}
        wishlistState={()=>
        {
            let existingItem=wishlistArray.find(items=>items.Id==item.Id)
            if(existingItem) 
            {
                return true
            }
            else{
                return false;
            } 
        }}
        />
    } />
</View>
</View>
 );
}

const styles = StyleSheet.create({
container:
{
    paddingTop:Constants.statusBarHeight,
    justifyContent:"center",
    flex:1,
},
flatlist:
{
    flex:1,
    marginVertical:10
    
},
    pickerStyle:{  
        height: 50, 
        flex:1, 
        marginLeft:30,
        width:"10%",  
        color: '#344953',  
        justifyContent: 'center',  
    }  
})

export default CategoryScreen;