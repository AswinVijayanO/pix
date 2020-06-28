import React from 'react';
import {StyleSheet} from 'react-native';
import {

    View,

    Text,

    TouchableHighlight,
} from 'react-native';
import { fontRegular, apiKey, fontBold,backgroundColor } from '../app.json';
function Header(props) {
    console.log("headerprops:"+JSON.stringify(props))
    return (<View style={{ padding: 10, paddingBottom: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
    <View>
      <TouchableHighlight underlayColor="#eeeeee55" onPress={props.expand} >
        <Text style={[styles.text, { fontSize: 30, padding: 20 }]}>{props.title}</Text>
      </TouchableHighlight>
    </View>
  </View>)
}
export default Header;
const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 0,
        borderColor: "#66666633",
        padding: 6,
        borderWidth: 1,
        borderTopColor: 'transparent',
        fontFamily: fontRegular
    },
    flexRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    username: {
        color: "#ccc",
        fontSize: 15,
        margin: 5,
        fontFamily: fontBold
    },
    text: {
        color: "#aaa",
        margin: 5,
        fontSize: 15,
        fontFamily: fontBold
    },
    profileItems: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginHorizontal: 10,
        alignItems: 'center',
        padding: 5
    },
    shadowed: {

    }
});