import * as React from "react"
import { Text, View} from 'react-native';
import {fontBold} from '../../app.json'
function ActiveBubble(props) {
    var style={}
    if(props.active) {
        style={
            padding:10,
            borderRadius:100,
            backgroundColor:props.color+"44",
            flexDirection:"row",
            alignItems:"center"
        }
    }
    console.log("bubbleprops");
    console.log(props)
  return (
    <View style={style}>
        {props.children}
    </View>
  );
}

export default ActiveBubble
