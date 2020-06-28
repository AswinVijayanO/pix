import React, { useState, Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
    StatusBar,
    TextInput,
    TouchableHighlight,
} from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

import { fontRegular, apiKey, fontBold, backgroundColor, fontColor } from './app.json';

import Unsplash, { toJson } from 'unsplash-js/native';

const unsplash = new Unsplash({
    accessKey: apiKey
});
function Header(props) {
    return (<View style={{ padding: 10, paddingBottom: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View>
            <TouchableHighlight underlayColor="#eeeeee55" onPress={props.expand} >
                <Text style={[styles.text, { fontSize: 30, padding: 20 }]}>{"Collections"}</Text>
            </TouchableHighlight>
        </View>

        {
            props.page > 1 ?
                <TouchableHighlight underlayColor="#eeeeee55" onPress={props.loadBack} >
                    <Text style={[styles.text, { fontSize: 20, color: '#0066ffaa' }]}>{props.page - 1}</Text>
                </TouchableHighlight>
                :
                <></>
        }
        <Text style={[styles.text, { fontSize: 20, backgroundColor: '#dddddd55', borderRadius: 50, width: 40, textAlign: 'center', padding: 10 }]}>{props.page}</Text>
        <TouchableHighlight underlayColor="#eeeeee55" onPress={props.loadMore} >
            <Text style={[styles.text, { fontSize: 20, color: '#0066ffaa' }]}>{props.page + 1}</Text>
        </TouchableHighlight>
    </View>)
}
function CollectionCard(props) {
    return (

        <View style={{ margin: 5, padding: 10 }} >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                    <Text style={[styles.text, { fontFamily: fontRegular, fontSize: 20, marginBottom: 5 }]}>
                        {props.collection.title}
                    </Text>
                    <Text style={[styles.text, { fontSize: 15, marginTop: 2 }]}>
                        {props.collection.user.name}
                    </Text>
                </View>
                <TouchableHighlight   underlayColor="transparent" onPress={()=>{props.navigation.navigate('CollectionFeed',{collectionId:props.collection.id,title:props.collection.title})}}>
                    <Text style={[styles.text, { fontSize: 15, backgroundColor: '#0066ff22',color:'#0066ff77', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 }]}>
                        Explore...
                </Text>
                </TouchableHighlight>

            </View>


            <Carousel
                data={props.collection.preview_photos}
                renderItem={(item, index) => {
                    return (
                        <View>
                            <Image style={{ width: 280, height: 180, margin: 1, borderRadius: 10 }} source={{ uri: item.item.urls.regular }} />
                        </View>
                    );
                }}
                sliderWidth={400}
                itemWidth={280}
                keyExtractor={item => item.id}
                layout={'default'} layoutCardOffset={`1`}
                footerElement={() => {
                    return <Text>View rest</Text>
                }}
            />
            <View style={{ flexDirection: "row", maxWidth: "90%", flexWrap: "wrap", margin: 5 }}>
                {
                    props.collection.tags.map((item) => {
                        return (<Text style={[styles.text, { fontFamily: fontRegular, fontSize: 13, backgroundColor: "#eee", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, margin: 2 }]}>
                            {item.title}
                        </Text>);
                    })
                }
            </View>
        </View>

    );
}
export default class Collections extends Component {


    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            page: 1,
            dataSource: []
        };
        this.loadMore = this.loadMore.bind(this)
        this.loadBack = this.loadBack.bind(this)
        //this.loadMore = this.loadMore.bind(this)

    }

    componentDidMount() {

        unsplash.collections.listCollections(1, 10, "popular")
            .then(toJson)
            .then(json => {

                this.setState({ loading: false, dataSource: json })
            });
    }
    loadMore() {
        {

            unsplash.collections.listCollections(this.state.page + 1, 15, "latest")
                .then(toJson)
                .then(json => {

                    this.setState({ loading: false, dataSource: [...json], page: this.state.page + 1 })
                }).catch(err => {

                })

        }
    }

    loadBack() {
        {
            unsplash.collections.listCollections(this.state.page - 1, 15, "latest")
                .then(toJson)
                .then(json => {

                    this.setState({ loading: false, dataSource: [...json], page: this.state.page - 1 })
                }).catch(err => {
                    console.log("error")
                })

        }
    }
    _renderItem({ item, index }) {
        return <CollectionCard collection={item} />;
    }
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', height: '100%', backgroundColor: backgroundColor }}>
                <Header page={this.state.page} loadMore={this.loadMore} loadBack={this.loadBack} />

                <ScrollView>
                    {
                        this.state.dataSource.map((item) => {
                            return <CollectionCard collection={item} navigation={this.props.navigation} key={item.id}/>;
                        })
                    }
                </ScrollView>

                {/* 
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.dataSource}
                    renderItem={this._renderItem}
                    sliderWidth={500}
                    itemWidth={500}
                    layout={'stack'} layoutCardOffset={`18`}
                /> */}


            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: "column",
        width: "100%",
        backgroundColor: "#000",
        alignContent: 'space-between'
    },
    text: {
        color: "#888",
        margin: 10,
        fontSize: 16,
        fontFamily: fontBold
    },

});