import React, {useState, Component } from 'react';
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
import Unsplash, { toJson } from 'unsplash-js/native';
import Feed from './Feed'
import { fontBold,apiKey,backgroundColor } from '../app.json';
const unsplash = new Unsplash({
    accessKey: apiKey
});

export default class Collection extends Component {
constructor(props) {
    super(props);
    this.state = {
        loading: true,
        page:1,
        collectionId:props.route.params.collectionId,
        dataSource: []
    };
    console.log("collection id from colletion class"+props.route.params.collectionId)
    this.loadMore = this.loadMore.bind(this)
    this.loadBack = this.loadBack.bind(this)
    //this.loadMore = this.loadMore.bind(this)

}

componentDidMount() {
    console.log("Mounting..."+this.state.collectionId)
    unsplash.collections.getCollectionPhotos(this.state.collectionId, 1, 15, "latest")
        .then(toJson)
        .then(json => {
            console.log("Mountied")
            this.setState({ loading: false, dataSource: json })
        });
}
loadMore() {
    {
      console.log("loading more")
      unsplash.collections.getCollectionPhotos(this.state.collectionId, 1, 15, "latest")
        .then(toJson)
        .then(json => {
        
          this.setState({ loading: false, dataSource: [...json], page: this.state.page + 1 })
        }).catch(err => {
          console.log("error")
        })

    }
  }

  loadBack() {
    {
        unsplash.collections.getCollectionPhotos(this.state.collectionId, 1, 15, "latest")
        .then(toJson)
        .then(json => {
        
          this.setState({ loading: false, dataSource: [...json], page: this.state.page - 1 })
        }).catch(err => {
          console.log("error")
        })

    }
  }

render() {
    return (
        <View style={{ flex: 1, flexDirection: 'column', height: '100%', backgroundColor: backgroundColor }}>
            <Feed feeds={this.state.dataSource} nav={this.props.navigation}/>
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