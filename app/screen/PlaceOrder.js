import React from 'react';
import {View,StyleSheet, Text, TouchableWithoutFeedback, ScrollView, FlatList} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AddtoCartCard from '../component/AddtoCartCard';
import AddtoCartCardOrder from '../component/AddtoCartOrder';

function PlaceOrder(props) {
    let x;
    const address = useSelector(state=>(state.counter.address));
    const cartArray = useSelector(state=>(state.counter.cartArray))
    let sum=0;
    cartArray.map((item)=>sum+=item.TotalCost)

    if (address.length==0) 
    {
        x=false
    } else{
        x =true
    }  
return (
<View style={styles.container}> 
<View style={{backgroundColor:"white",width:"100%",padding:20}}>
{x&&<View>
<Text style={{fontSize:15,fontWeight:"900",marginVertical:1}}>{address[0].Fullname}</Text>
<Text style={{fontSize:15,fontWeight:"900",marginVertical:1}}>{address[0].Phonenumber}</Text>
<Text style={{fontSize:15,fontWeight:"900",marginVertical:1}}>{address[0].Housename}</Text>
<Text style={{fontSize:15,fontWeight:"900",marginVertical:1}}>{address[0].Roadname}</Text>
<Text style={{fontSize:15,fontWeight:"900",marginVertical:1}}>{address[0].Pincode}</Text>
<Text style={{fontSize:15,fontWeight:"900",marginVertical:1}}>{address[0].City}</Text>
<Text style={{fontSize:15,fontWeight:"900",marginVertical:1}}>{address[0].State}</Text>
    </View>}
    <TouchableWithoutFeedback onPress={()=>props.navigation.navigate("Add Address")}>
    <View style={{backgroundColor:"tomato",height:40,justifyContent:"center",alignItems:"center",marginVertical:5}}>
        <Text style={{color:"white",fontSize:16}}>Add/Update Address</Text>
    </View>
    </TouchableWithoutFeedback>
</View>
<View style={{position:"relative",height:"55%"}}>
<FlatList
    data={cartArray}
    keyExtractor={(item)=>item.CId.toString()}
    renderItem={({item})=>
        <AddtoCartCardOrder
            imageUri={item.imageUri}
            title={item.Item}
            size={item.Size}
            cost={item.Cost}
            totalCost={item.TotalCost}
            size={item.Size}
            defaultValue={item.Count.toString()}
        />}
 />
  </View>
  <View style={styles.totalCost}>
 <View style={styles.totalCostTextView}>
     <Text>Amount to be Payed:</Text>
     <Text style={{fontSize:25,color:"black"}}>{sum}</Text>
     </View>
     <View style={styles.placeOrder}>
         <TouchableWithoutFeedback onPress={()=>{props.navigation.navigate("Place Order")}}>
             <Text style={{fontSize:20,color:"white"}}>Place Order</Text>
         </TouchableWithoutFeedback>
     </View>
 </View>
</View>
 );
}

const styles = StyleSheet.create({
container:{
    flex:1
},
totalCost:
{
    width:"100%",
    position:"absolute",
    bottom:0,
    height:'10%',
    flexDirection:"row",
},
totalCostTextView:
{
    flex:1,
    padding:10,
    backgroundColor:"white",
    justifyContent:"center",
    
    
},
placeOrder:
{
    flex:1,
    height:"100%",
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"orange"

}
})

export default PlaceOrder;