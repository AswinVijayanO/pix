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
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import Card from './components/Card'

import { image } from './pic.json'

import { fontRegular, apiKey, fontBold,backgroundColor ,fontColor} from './app.json';

import Unsplash, { toJson } from 'unsplash-js/native';


const unsplash = new Unsplash({
  accessKey: apiKey
});

function Header(props) {
  return (<View style={{ padding: 10, paddingBottom: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
    <View>
      <TouchableHighlight underlayColor="#eeeeee55" onPress={props.expand} >
        <Text style={[styles.text, { fontSize: 30, padding: 20 }]}>{"Discover"}</Text>
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

export default class Discover extends Component {


  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      searchResults: false,
      dataSource: [],
      expandSearch: false,
      keyword: "",
      loadingMessage: "Search unsplash for images",
      page: 1
    };
    this.loadMore = this.loadMore.bind(this)
    this.loadBack = this.loadBack.bind(this)
    this.search = this.search.bind(this)

  }
  componentDidMount() {

  }
  loadMore() {
    if (this.state.keyword == "") {
      return
    }
    unsplash.search.photos(this.state.keyword, this.state.page + 1, 15)
      .then(toJson)
      .then(json => {
        this.refs._scrollView.scrollTo({ x: 0, y: 0, animated: true });
        this.setState({ loading: false, page: this.state.page + 1, searchResults: true, dataSource: json.results })
      }).catch(err => {
        console.log(err)
      })

  }
  loadBack() {
    if (this.state.keyword == "") {
      return
    }
    unsplash.search.photos(this.state.keyword, this.state.page - 1, 15)
      .then(toJson)
      .then(json => {
        this.refs._scrollView.scrollTo({ x: 0, y: 0, animated: true });
        this.setState({ loading: false, page: this.state.page - 1, searchResults: true, dataSource: json.results })
      }).catch(err => {
        console.log(err)
      })

  }
  search(text) {
    unsplash.search.photos(text, 1, 15)
      .then(toJson)
      .then(json => {
        this.refs._scrollView.scrollTo({ x: 0, y: 0, animated: true });
        this.setState({ loading: false, keyword: text, page: 1, searchResults: true, dataSource: json.results })
      }).catch(err => {
        console.log(err)
      })
  }

  render() {

    return (
      <View style={{ backgroundColor: backgroundColor,minHeight:1000 }}>
        <StatusBar barStyle="dark-content" backgroundColor={backgroundColor} />
        <SafeAreaView styles={[styles.container]}>
          <Header page={this.state.page} loadMore={this.loadMore} loadBack={this.loadBack} expand={() => { this.setState({ expandSearch: !this.state.expandSearch }) }} expandState={this.state.expandSearch} />
         
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            onScroll={this.handleScroll}
            ref='_scrollView'
          >
             <TextInput style={styles.search} onSubmitEditing={(text) => { this.setState({ loading: true }); this.search(text.nativeEvent.text) }} placeholder={"Search for images"} ></TextInput>
            {
              !this.state.loading ?
                this.state.dataSource.map((item) => {
                  return <Card content={item} key={item.id} />
                }
                )
                : <Text style={[styles.text, { justifyContent: 'center', margin: '15%' }]}>{this.state.loadingMessage}</Text>
            }
            <Text style={[styles.text, { fontSize: 50, margin: 100, color : 'transparent' }]}>.</Text>
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
    backgroundColor: '#dddddd33',
    color: fontColor,
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

