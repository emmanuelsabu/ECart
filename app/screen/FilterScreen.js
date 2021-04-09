import React from 'react';
import {View,StyleSheet, FlatList} from 'react-native';

function FilterScreen(props) {
return (
<View style={styles.container}> 
<FlatList></FlatList>
</View>
 );
}

const styles = StyleSheet.create({
container:{}
})

export default FilterScreen;