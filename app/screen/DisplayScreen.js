import React, { useState } from 'react';
import {View,StyleSheet, Text, Image, FlatList, ToastAndroid, TouchableOpacity, Pressable, Button} from 'react-native';
import { useDispatch } from 'react-redux';
import Card from '../component/Card';
import SizeCard from '../component/SizeCard';
import { addToCart, addWishlist } from '../redux/reducer';

// import {Picker} from '@react-native-picker/picker';
import firebase from 'firebase';

const footwearSizeArray =[6,7,8,9,10,11];
const mobileSizeArray=["4/32GB","6/64GB","8/128GB"]
let sizeArray=[];
let saCaption=""


function DisplayScreen(props) {

    const [selectedLanguage, setSelectedLanguage] = useState();
    const [selectedSize, setselectedSize] = useState(null);

    const value= props.route.params;
    const[size,setSize]=useState();
    const [modal,setModal]=useState(false);
    const [buttonText,setButtonText]=useState("Add to Cart")
    // console.log(value);
    
    const dispatch = useDispatch();

    const updateWishlist=()=>
    {
        let itemAdd={Category:value.Category,Cost:value.Cost,Id:value.Id,Item:value.Item,imageUri:value.imageUri,Email:firebase.auth().currentUser.email};
            
                // console.log(itemAdd)
                dispatch(addWishlist(itemAdd));
                ToastAndroid.showWithGravityAndOffset("Added to Wishlist",ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,10,10)
            
    }
    const updateAddToCart=()=>
    {
        let itemAdd=[{id:0,Category:value.Category,Cost:value.Cost,Id:value.Id,Item:value.Item,imageUri:value.imageUri,Size:selectedSize,Count:1,TotalCost:value.Cost,Email:firebase.auth().currentUser.email,CId:firebase.auth().currentUser.uid+value.Id+size}];
            
            if(itemAdd[0].Size==null && itemAdd[0].Category!="Mobile")
            { 
                 alert("Enter the Size")
            }
            else
            {
                // console.log(itemAdd)
                dispatch(addToCart(itemAdd));
                ToastAndroid.showWithGravityAndOffset("Added to Cart",ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,10,10)
                props.navigation.navigate("AddtoCart")
            }
    }
    if (value.Category=="Footwear") 
    {
        sizeArray=footwearSizeArray;
        saCaption="Enter the Size"
    }
    else
    {
        sizeArray=[];
        saCaption=""
    }
return (
<>
<View style={styles.container}> 
<Image style={styles.image} source={{uri:value.imageUri}}/>
<Text style={styles.item}>{value.Item}</Text>
<Text style={styles.cost}>{value.Cost}</Text>

<View style={styles.itemSize} >
<Text style={{padding:10}}>{saCaption}</Text>

<FlatList 
        horizontal={true}
        data={sizeArray}
        keyExtractor={(item)=>item.toString()}
        renderItem={({item})=>
    <SizeCard size={item} selectedSize={selectedSize}  onPress={()=>{
        setselectedSize(item);
        setSize(item)
        }}  />} /> 
</View>
<View style={{position:'absolute', height:100, width:'100%', bottom:0,padding:10, flexDirection:'row', alignItems:'center'}}>

    <View style={styles.wishlist}>
        <Card name="purse" category=" Wishlist" onPress={()=>{updateWishlist()}} ></Card>
    </View>

    <View style={styles.addtoCart}> 
    <Card name="cart" category="Add to Cart" onPress={()=>{updateAddToCart()}}></Card>
    </View>

</View>
</View>
</> );
}

const styles = StyleSheet.create({
container:
{
    padding:20,
    flex:1,
    alignItems:"center"
},
image:
{
    width:"100%",
    height:"50%",
    resizeMode:"contain"
},
item:
{
    fontSize:20,
    fontWeight:"500",
    
},
cost:
{
    fontSize:13,
    fontWeight:"bold"
},
wishlist:
{
    width:"40%",
    height:"100%",
backgroundColor:"tomato",
justifyContent:"center",
alignItems:"center",
},

addtoCart:
{
    height:"100%",
backgroundColor:"tomato",
justifyContent:"center",
alignItems:"center",
position:"absolute",
right:0
},
purchaseView:
{
    width:"100%",
    flexDirection:"row",
    position:"relative",
    bottom:10,
    
},
itemSize:
{
    width:"100%",
    justifyContent:'center',
    alignItems:"center",
    // height:100,
    position:"relative",
    marginTop:100
    // bottom:80,
    // marginBottom:20,

},
// Pickerstyle:{  
//     height: 150,  
//     width: "80%",  
//     color: '#344953',  
//     justifyContent: 'center',  
// }  
})

export default DisplayScreen;