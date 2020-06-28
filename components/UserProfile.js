import React, { Component } from 'react';
import { CountUp } from 'use-count-up'
import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableHighlight,

} from 'react-native';

import { fontRegular, fontBold, fontItalic, apiKey } from '../app.json';
import Location from './Icons/Location';

import Unsplash, { toJson } from 'unsplash-js/native';
import Grid from './Grid';

const unsplash = new Unsplash({
    accessKey: apiKey
});
export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { user:props.route.params.user, visible: false, thumps: [], hide: props.hideFunc }
    }
    componentDidMount() {
        unsplash.users.photos(this.state.user.username, 1, 12, "latest", false)
            .then(toJson)
            .then(json => {
                this.setState({ thumps: json, visible: true });
            });
    }
    render() {

        return (
                <View style={{ padding: 20, margin: 0, backgroundColor: '#fff', borderRadius: 10, width: '100%' ,height:'100%'}}>
                    <View style={{ margin: 'auto', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ width: 90, height: 90, borderRadius: 45 }} source={{ uri: this.state.user.profile_image.large }} />

                        <View style={{ margin: 20, padding: 10, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'flex-start' }}>
                            <Text style={[styles.text, { fontSize: 18 }]}>{this.state.user.name}</Text>
                            <Text style={styles.username}>{"@" + this.state.user.username}</Text>
                        </View>

                    </View>


                    {
                        this.state.user.location ?
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Location />
                                <Text style={styles.text}>{this.state.user.location}</Text>
                            </View>
                            : <></>
                    }
                    {
                        this.state.user.bio ?
                            <Text style={styles.text, { fontFamily: fontItalic, color: '#888' }}>{this.state.user.bio}</Text>
                            : <></>
                    }
                    <View style={[{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: '#eee', marginHorizontal: 'auto', marginVertical: 20, borderRadius: 20 }, styles.shadowed]}>
                        {
                            this.state.user.total_likes ?
                                <View style={styles.profileItems}>
                                    <Text style={styles.text}>Likes</Text>
                                    <Text style={[styles.text, { color: '#000', fontSize: 22 }]}>
                                        <CountUp isCounting end={this.state.user.total_likes} duration={1} />
                                    </Text>
                                </View>
                                : <></>
                        }
                        {
                            this.state.user.total_photos ?
                                <View style={[styles.profileItems]}>
                                    <Text style={styles.text}>Photos</Text>
                                    <Text style={[styles.text, { color: '#000', fontSize: 22 }]}>
                                        <CountUp isCounting end={this.state.user.total_photos} duration={1} />
                                    </Text>
                                </View>
                                : <></>
                        }
                        {
                            this.state.user.total_collections ?
                                <View style={styles.profileItems}>
                                    <Text style={styles.text}>Collections</Text>
                                    <Text style={[styles.text, { color: '#000', fontSize: 22 }]}>
                                        <CountUp isCounting end={this.state.user.total_collections} duration={1} />
                                    </Text>
                                </View>
                                : <></>
                        }
                    </View>
                    <Text style={[styles.text, { color: '#000', fontSize: 25, margin: 10 }]}>Latest Posts</Text>
                    <Grid
                        dataSource={this.state.thumps}
                    />

                </View>

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