/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import Card from './components/Card'

import { image } from './pic.json'

import { fontRegular, apiKey, fontBold,backgroundColor } from './app.json';

import Unsplash, { toJson } from 'unsplash-js/native';

const unsplash = new Unsplash({
  accessKey: apiKey
});

function Header(props) {
  return (<View style={{ padding: 10, paddingBottom: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
    <View>
      <TouchableHighlight underlayColor="#eeeeee55" onPress={props.expand} >
        <Text style={[styles.text, { fontSize: 30, padding: 20 }]}>{"Unsplashed"}</Text>
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

export default class Home extends Component {


  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      searchResults: false,
      dataSource: [],
      expandSearch: false,
      keyword: "today",
      loadingMessage: "Loading...",
      page: 1
    };
    this.loadMore = this.loadMore.bind(this)
    this.loadBack = this.loadBack.bind(this)
    // this.addMore = this.addMore.bind(this)
  }
  componentDidMount() {
    unsplash.photos.listPhotos(this.state.page, 15, "latest")
      .then(toJson)
      .then(json => {
        this.setState({ loading: false, dataSource: json })
      }).catch(err => {
        this.setState({ loadingMessage: "Loading Failed!" })
      })

  }
  loadMore() {
    {
      console.log("loading more")
      unsplash.photos.listPhotos(this.state.page + 1, 15, "latest")
        .then(toJson)
        .then(json => {
          this.refs._scrollView.scrollTo({x:0,y:0,animated:true});
          this.setState({ loading: false, dataSource: [...json], page: this.state.page + 1 })
        }).catch(err => {
          console.log("error")
        })

    }
  }

  loadBack() {
    {
      unsplash.photos.listPhotos(this.state.page - 1, 15, "latest")
        .then(toJson)
        .then(json => {
          this.refs._scrollView.scrollTo({x:0,y:0,animated:true});
          this.setState({ loading: false, dataSource: [...json], page: this.state.page - 1 })
        }).catch(err => {
          console.log("error")
        })

    }
  }
  render() {
    let theme = this.context;
    return (
      <View style={{ backgroundColor:backgroundColor }}>
        <SafeAreaView styles={[styles.container]}>
          <Header page={this.state.page} loadMore={this.loadMore} loadBack={this.loadBack} expand={() => { this.setState({ expandSearch: !this.state.expandSearch }) }} expandState={this.state.expandSearch} />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            onScroll={this.handleScroll}
            ref='_scrollView'
          >
            {
              !this.state.loading ?
                this.state.dataSource.map((item) => {
                  return <Card content={item} key={item.id} nav={this.props.navigation} />
                }
                )
              : <Text style={[styles.text,{justifyContent:'center',margin:'35%'}]}>{this.state.loadingMessage}</Text>
            }
          
            <Text style={[styles.text, { fontSize: 50, margin: 100, color : '#ccc' }]}>.</Text>
          </ScrollView> 
        </SafeAreaView>
      </View>
    );
  }

};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    backgroundColor: "#000",
    alignContent: 'space-between'
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  username: {
    color: "#3ca6da",
    fontSize: 20,
    fontFamily: fontRegular
  },
  text: {
    color: "#888",
    margin: 10,
    fontSize: 16,
    fontFamily: fontBold
  },
  activeText: {
    color: "#44aaff",
    margin: 10,
    fontSize: 16,
    fontFamily: fontBold,
    backgroundColor: '#44aaff77',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20
  },
  search: {
    padding: 5,
    borderRadius: 40,
    paddingHorizontal: 20,
    backgroundColor: '#ddd',
    color: "#888",
    margin: 10,
    marginHorizontal: 20,
    fontSize: 16,
    fontFamily: fontBold
  },
  footer: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  }
});

