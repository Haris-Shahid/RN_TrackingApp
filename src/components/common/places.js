import React, {Component} from 'react';
import { View ,Text, TouchableHighlight, StyleSheet } from 'react-native';

export default List = ({name , seedetails= f => f }) => (
    <TouchableHighlight onPress={()=> seedetails(name)}  style={styles.btn} underlayColor='orange' >
                        <Text style= {styles.text} >{name.name}</Text>
    </TouchableHighlight>
)

const styles = StyleSheet.create({
    btn: {
        alignItems:'center' ,
        alignSelf: 'stretch' ,
        marginTop: 10,
        padding: 10 ,
        borderRadius: 20 ,
        backgroundColor: 'rgba(255,255,255,.8)' ,
    },
    text: {
        color: 'red' ,
        fontSize: 15 ,
        fontWeight: 'bold'
    }
})
