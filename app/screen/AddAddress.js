import React from 'react';
import { useState } from 'react';
import {View,StyleSheet, TextInput, Button,TouchableOpacity, Text, Alert, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import firebase  from 'firebase';
import { addAddress, updateAddress } from '../redux/reducer';
import { add } from 'react-native-reanimated';


function AddAddress(props) {
    const dispatch = useDispatch();
    const address = useSelector(state=>(state.counter.address));
    let fullname,phonenumber,pincode,state,city,housename,roadname;

    if(address.length==0) {
        fullname="";
        phonenumber="";
        pincode="";
        state="";
        city="";
        housename="";
        roadname="";
    }
    else {
        fullname=address[0].Fullname;
        phonenumber=address[0].Phonenumber;
        pincode=address[0].Pincode;
        state=address[0].State;
        city=address[0].City;
        housename=address[0].Housename;
        roadname=address[0].Roadname;
    }

    const[Fullname,setFullname]=useState(fullname);
    const[Phonenumber,setPhonenumber]=useState(phonenumber);
    const[Pincode,setPincode]=useState(pincode);
    const[State,setState]=useState(state);
    const[City,setCity]=useState(city);
    const[Housename,setHousename]=useState(housename);
    const[Roadname,setRoadname]=useState(roadname);

    
    const update=()=>
    {
        
       if (Fullname==""||Phonenumber==""||Pincode==""||State==""||City==""||Housename==""||Roadname=="") 
        {
           alert("Enter all the Details")
        }        
        else
        {
            if(Phonenumber.length==10)
            {
                if (Pincode.length==6) 
                {
                    let Email= firebase.auth().currentUser.email
                    const details=[{Fullname,Phonenumber,Pincode,State,City,Housename,Roadname,Email}];
                    console.log(details);
                    dispatch(addAddress(details))  
                }
                else{
                    alert("Enter Valid PinCode")
                }  
            }
            else{
                alert("Enter Valid Number")
            }
            
        }

    }

return (
<View style={styles.container}> 
<TextInput style={{width:"100%",padding:10,margin:10,borderWidth:1,borderColor:"black"}} placeholder="Full Name" value={Fullname} onChangeText={(val)=>{setFullname(val)}}/>
<TextInput style={{width:"100%",padding:10,margin:10,borderWidth:1,borderColor:"black"}} placeholder="Phone Number" keyboardType="numeric" value={Phonenumber} onChangeText={(val)=>{setPhonenumber(val)}}/>
<TextInput style={{width:"100%",padding:10,margin:10,borderWidth:1,borderColor:"black"}} placeholder="Pincode" keyboardType="number-pad" value={Pincode} onChangeText={(val)=>{setPincode(val)}}/>
<TextInput style={{width:"100%",padding:10,margin:10,borderWidth:1,borderColor:"black"}} placeholder="State" value={State} onChangeText={(val)=>{setState(val)}}/>
<TextInput style={{width:"100%",padding:10,margin:10,borderWidth:1,borderColor:"black"}} placeholder="City" value={City} onChangeText={(val)=>{setCity(val)}}/>
<TextInput style={{width:"100%",padding:10,margin:10,borderWidth:1,borderColor:"black"}} placeholder="House No,House Name" value={Housename} onChangeText={(val)=>{setHousename(val)}}/>
<TextInput style={{width:"100%",padding:10,margin:10,borderWidth:1,borderColor:"black"}} placeholder="Road Name,Area" value={Roadname} onChangeText={(val)=>{setRoadname(val)}}/>

<View style={{position:"relative",top:100,width:"100%",backgroundColor:"tomato",alignItems:"center",justifyContent:"center",height:40,borderRadius:20}}>
<TouchableOpacity  onPress={()=>{update(),props.navigation.navigate("Place Order")}}>
    <Text style={{color:"white",fontSize:18,fontWeight:"700"}}>Add/Update</Text>
</TouchableOpacity>
</View>

</View>
 );
}

const styles = StyleSheet.create({
container:
{
    flex:1,
    margin:20,
}
})

export default AddAddress;