import React, { Component, useEffect } from 'react';
import {
    View,
    Image,
    Text,
    Dimensions,
    Modal,
    StyleSheet,
    TouchableHighlight,
    BackHandler,
    Linking,
    TouchableOpacity
} from 'react-native';

import { format } from "date-fns";
import { fontRegular, fontBold, fontItalic, apiKey } from '../app.json';

import Like from './Icons/Like';

import Unsplash, { toJson } from 'unsplash-js/native';


export default class Card extends Component {
    constructor(props) {
        super(props);
        console.log("nav");
        console.log(props)
        this.state = { content: props.content, viewUser: false, viewImage: false, userImages: [] }
        this.hideUser = this.hideUser.bind(this)
    }
    hideUser() {
        this.setState({ viewUser: false })
    }
    render() {
        var ratio = Dimensions.get('window').width / this.state.content.width
        var height = this.state.content.height * ratio
        return (
            <View style={[styles.card]}>
                <View style={styles.flexRow}>
                    <TouchableHighlight underlayColor="transparent" onPress={() => {this.props.nav.navigate('UserProfile',{user:this.state.content.user})}}>
                        <View style={[styles.flexRow, { justifyContent: 'flex-start' }]}>
                            <Image style={{ width: 32, height: 32, borderRadius: 32, margin: 10 }} source={{ uri: this.state.content.user.profile_image.medium }} />
                            <Text style={[styles.text,{maxWidth:'70%',flexWrap:'wrap'}]}>{this.state.content.user.name}</Text>
                        </View>

                    </TouchableHighlight>
                    <Text style={styles.text}>{format(new Date(this.state.content.created_at), "MMMM dd, yyyy")}</Text>
                </View>
                <TouchableHighlight underlayColor="transparent" onLongPress={() => { this.props.onLongPress }}>
                    <Image style={{ width: "100%", height: height }} source={{ uri: this.state.content.urls.regular }} />
                </TouchableHighlight>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 5 }}>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 1, paddingHorizontal: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Like />
                            <Text style={[styles.text]}>{this.state.content.likes + " Likes"}</Text>
                        </View>
                        <TouchableOpacity onPress={() => { Linking.openURL(this.state.content.links.download) }}>
                            <Text style={[styles.download]}>Download</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </View>
        );
    }

}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 0,
        borderColor: "#66666633",
        borderBottomColor:'transparent',
        padding: 6,
        borderWidth: 1,
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
        fontFamily: fontBold,
        overflow: 'hidden'
    },
    download: {
        color: "#5599ee",
        margin: 5,
        paddingVertical: 3,
        paddingHorizontal:12,
        borderRadius: 20,
        fontSize: 15,
        backgroundColor: '#5599ee55',
        fontFamily: fontBold,
        overflow: 'hidden'
    },
    profileItems: {
        flexDirection: 'column',
        justifyContent: 'center',
        width: 100,
        alignItems: 'center',
        padding: 5
    }

});

