import React from 'react';
import {View,StyleSheet, FlatList,Text, TouchableWithoutFeedback, ScrollView} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AddtoCartCard from '../component/AddtoCartCard';
import { deleteFromCart, updateCount } from '../redux/reducer';

function AddtoCart(props) {
    const dispatch=useDispatch();
    const cartArray = useSelector(state=>(state.counter.cartArray))
    let sum=0;
    cartArray.map((item)=>sum+=item.TotalCost)
return (
<View style={styles.container}> 
<View style={{height:"85%"}}>
<ScrollView keyboardDismissMode="interactive">
<FlatList
    data={cartArray}
    keyExtractor={(item)=>item.CId.toString()}
    renderItem={({item})=>
        <AddtoCartCard
            imageUri={item.imageUri}
            title={item.Item}
            size={item.Size}
            cost={item.Cost}
            totalCost={item.TotalCost}
            size={item.Size}
            defaultValue={item.Count.toString()}
            updateCountValue={(value)=>dispatch(updateCount({item,value}))}
            deleteItem={()=>{dispatch(deleteFromCart(item))}}
            onPress={()=>props.navigation.navigate('Display',item)}
        />}
 />
 </ScrollView>
  </View>

 <View style={styles.totalCost}>
 <View style={styles.totalCostTextView}>
     <Text>Amount to be Payed:</Text>
     <Text style={{fontSize:25,color:"black"}}>{sum}</Text>
     </View>
     <View style={styles.placeOrder}>
         <TouchableWithoutFeedback onPress={()=>{props.navigation.navigate("Place Order")}}>
             <Text style={{fontSize:20,color:"white"}}>Purchase</Text>
         </TouchableWithoutFeedback>
     </View>
 </View>
</View>
 );
}

const styles = StyleSheet.create({
container:
{
    flex:1,
    paddingTop:10,
    backgroundColor:"white"
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

export default AddtoCart;