import React, { Component } from 'react';
import { CountUp } from 'use-count-up'
import {
    View,
    Image,
    Text,
    Dimensions,
    FlatList,
    Modal,
    StyleSheet,
    TouchableHighlight,
    BackHandler,
    Button
} from 'react-native';

import { fontRegular, fontBold, fontItalic, apiKey } from '../app.json';
import Location from './Location';
import Back from './Back';
import Unsplash, { toJson } from 'unsplash-js/native';
import Grid from './Grid';
import Card from './Card';

const unsplash = new Unsplash({
    accessKey: apiKey
});
export default class PopUpCard extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: true, image: props.image, hide: props.hideFunc }
    }
    componentDidMount() {

    }
    render() {
        console.log("image object")
        console.log(this.state.image)
        return (

            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.visible}
            >
                <View style={{ padding: 20, backgroundColor: "#33333366",flex:1}}>
                    <View style={{ backgroundColor: "#fff", flexDirection: "column" }}>
                        <Button
                            onPress={() => this.setState({ visible: !this.state.visible })}
                            title={"exit"}
                        >
                        </Button>
                        <Card
                            content={this.state.image}
                        />
                    </View >
                </View>


            </Modal>


        );
    }
}

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