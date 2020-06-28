import React, { Component, useEffect } from 'react';
import {
    View,
    ScrollView
} from 'react-native';
import Card from './Card';
function Feed(props) {
    console.log(props)
    return(
        <View>
            <ScrollView>
                {
                    props.feeds.map((item)=>{
                        return (
                            <Card
                            content={item}
                            nav={props.nav}
                            >
                            </Card>
                        );
                    })
                }
            
            </ScrollView>
        </View>
    );
}

export default Feed;