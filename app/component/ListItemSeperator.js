import React from 'react';
import {View,StyleSheet} from 'react-native';

function ListItemSeperator(props) {
return (
<View style={styles.container}/> 
 );
}

const styles = StyleSheet.create({
container:
{
    height:1,
    width:"100%",
    backgroundColor:"black"
}
})

export default ListItemSeperator;