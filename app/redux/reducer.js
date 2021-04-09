import { createSlice } from '@reduxjs/toolkit'
import firebase  from 'firebase';
import { firebaseConfig } from '../component/FirebaseConfig';

if(firebase.apps.length===0)
{
  firebase.initializeApp(firebaseConfig);
}

export const counterSlice =createSlice(
    {
        name : "update",
        initialState:{productArray:[],cartArray:[],wishlistArray:[],id:0,address:[]},
        reducers:
        {
            sortProducts:(state,action)=>
            {
                if(action.payload==1)
                {
                   state.productArray= state.productArray.sort((a,b)=>
                    {
                        return a.Cost-b.Cost
                    });
                }
                else if(action.payload==2)
                {
                    state.productArray= state.productArray.sort((a, b) =>
                    {
                        return b.Cost - a.Cost
                    });
                }

            },
            addToCart:(state,action)=>
            {
                let item=action.payload;
                let itemCId = item[0].CId;
                let existingItem = state.cartArray.find(item=>item.CId===itemCId);

                if(existingItem)
                {
                    const objIndex = state.cartArray.findIndex((obj => obj.CId == itemCId));
                    state.cartArray[objIndex].Count+=1;
                    state.cartArray[objIndex].TotalCost=state.cartArray[objIndex].Count*state.cartArray[objIndex].Cost
                    
                    firebase.database().ref('Cart/'+itemCId).update({Count:state.cartArray[objIndex].Count})
                    firebase.database().ref('Cart/'+itemCId).update({TotalCost:state.cartArray[objIndex].TotalCost})
                }
                else
                {
                    let itemCId = item[0].CId;
                    state.id=state.cartArray.length,
                    action.payload[0].id=state.id;
                    state.cartArray = state.cartArray.concat(action.payload);

                    firebase.database().ref('Cart/'+itemCId).set(action.payload[0])
                }  },

            updateCount:(state,action)=>
            {
                if(action.payload.value=="")
                {
                    const objIndex = state.cartArray.findIndex((obj => obj.CId == action.payload.item.CId));
                    state.cartArray[objIndex].TotalCost=0;
                    // state.cartArray[objIndex].TotalCost=state.cartArray[objIndex].Count*state.cartArray[objIndex].Cost
                    firebase.database().ref('Cart/'+action.payload.item.CId).update({Count:state.cartArray[objIndex].Count})
                    firebase.database().ref('Cart/'+action.payload.item.CId).update({TotalCost:state.cartArray[objIndex].TotalCost})
                }
                else
                {
                const value= parseInt( action.payload.value);
                const objIndex = state.cartArray.findIndex((obj => obj.CId == action.payload.item.CId));
                state.cartArray[objIndex].Count=value
                state.cartArray[objIndex].TotalCost=state.cartArray[objIndex].Count*state.cartArray[objIndex].Cost
                
                firebase.database().ref('Cart/'+action.payload.item.CId).update({Count:state.cartArray[objIndex].Count})
                firebase.database().ref('Cart/'+action.payload.item.CId).update({TotalCost:state.cartArray[objIndex].TotalCost})

                }
            },
            deleteFromCart:(state,action)=>
            {
                state.cartArray=state.cartArray.filter(data=>data.CId!=action.payload.CId)
                firebase.database().ref('Cart/'+action.payload.CId).remove();
            },
            updateProductList:(state,action)=>
            {
                state.productArray=action.payload;
            },
            updateAddToCart:(state,action)=>
            {
                state.cartArray=action.payload;
            },

            updateWishlistArray:(state,action)=>
            {
                state.wishlistArray=action.payload;
            },
            updateAddress:(state,action)=>
            {
                state.address=action.payload;
            },
            addWishlist:(state,action)=>
            {
                console.log(action.payload.Id);
                let existingItem=state.wishlistArray.find((item)=>item.Id==action.payload.Id && item.Email==firebase.auth().currentUser.email)
                if(!existingItem){
                    let array= [{
                        Item:action.payload.Item,
                        Category:action.payload.Category,
                        Cost:action.payload.Cost,
                        imageUri:action.payload.imageUri,
                        Id:action.payload.Id,
                        WId:action.payload.Id+firebase.auth().currentUser.uid,
                        Email:firebase.auth().currentUser.email
                    }];
                    firebase.database().ref('/Wishlist/'+action.payload.Id+firebase.auth().currentUser.uid).set({
                        Item:action.payload.Item,
                        Category:action.payload.Category,
                        Cost:action.payload.Cost,
                        imageUri:action.payload.imageUri,
                        Id:action.payload.Id,
                        WId:action.payload.Id+firebase.auth().currentUser.uid,
                        Email:firebase.auth().currentUser.email
                        });
                        state.wishlistArray=state.wishlistArray.concat(array);

                }
            },
            setWishlist:(state,action)=>
            { 
                let existingItem=state.wishlistArray.find((item)=>item.Id==action.payload.item.Id && item.Email==firebase.auth().currentUser.email)
                               
                if(!existingItem) {
                    let array= [{
                            Item:action.payload.item.Item,
                            Category:action.payload.item.Category,
                            Cost:action.payload.item.Cost,
                            imageUri:action.payload.item.imageUri,
                            Id:action.payload.item.Id,
                            WId:action.payload.item.Id+firebase.auth().currentUser.uid,
                            Email:firebase.auth().currentUser.email
                        }]
                    firebase.database().ref('/Wishlist/'+action.payload.item.Id+firebase.auth().currentUser.uid).set({
                    Item:action.payload.item.Item,
                    Category:action.payload.item.Category,
                    Cost:action.payload.item.Cost,
                    imageUri:action.payload.item.imageUri,
                    Id:action.payload.item.Id,
                    WId:action.payload.item.Id+firebase.auth().currentUser.uid,
                    Email:firebase.auth().currentUser.email
                    });

                    state.wishlistArray=state.wishlistArray.concat(array);

                }
                else {
                    firebase.database().ref('Wishlist/'+action.payload.item.Id+firebase.auth().currentUser.uid).remove();
                    let wid=action.payload.item.Id+firebase.auth().currentUser.uid;
                    state.wishlistArray=state.wishlistArray.filter(item=>item.WId!=wid);
                }
            },
            addAddress:(state,action)=>
            {
                state.address=action.payload;

                    firebase.database().ref('/Address/'+firebase.auth().currentUser.uid).set({
                        City:action.payload[0].City,
                        Email:action.payload[0].Email,
                        Fullname:action.payload[0].Fullname,
                        Housename:action.payload[0].Housename,
                        Phonenumber:action.payload[0].Phonenumber,
                        Pincode:action.payload[0].Pincode,
                        Roadname:action.payload[0].Roadname,
                        State:action.payload[0].State,
                    })      
            }

        }
    }
)

export const {updateProductList,addToCart,updateCount,deleteFromCart,updateAddToCart,addWishlist,setWishlist,updateWishlistArray,sortProducts,updateAddress,addAddress}=counterSlice.actions;
export default counterSlice.reducer;