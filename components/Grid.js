import React, { useState } from 'react';
import {
    View,
    Image,
    StyleSheet,
} from 'react-native';
import { fontRegular, apiKey, fontBold } from '../app.json';

import Carousel from 'react-native-snap-carousel';
import { TouchableHighlight } from 'react-native-gesture-handler';
function GridImage(props) {
    const [size, setSize] = useState(300);
    return (
        <TouchableHighlight underlayColor="transparent" key={props.item.id} onLongPress={() => { props.onLongPress }} >
            <View style={{width: size,height:size*2}}>
                <Image style={{ width: size, height: size , margin: 2, borderRadius: 5 }} source={{ uri: props.item.urls.regular }} />
            </View>

        </TouchableHighlight>

    );
}
function Grid(props) {
    return (
        <View style={styles.grid}>
            {/* <ScrollView>
              {
                    (props.dataSource) ?
                        props.dataSource.map((item) => {
                            return (
                                <GridImage
                                    item = {item}
                                />
                            );
                        }
                        )
                        : <Text style={[styles.text, { justifyContent: 'center', margin: '35%' }]}>{"No images"}</Text>
                } 
              </ScrollView> */}

            {/* <FlatList
                data={props.dataSource}
                renderItem={({ item, index, separators }) => (

                    <GridImage
                        item={item}
                    />

                )}
                keyExtractor={item => item.id}
            /> */}
            <Carousel
                data={props.dataSource}
                renderItem={({ item, index, separators }) => (

                    <GridImage
                        item={item}
                    />

                )}
                sliderWidth={400}
                itemWidth={300}
                keyExtractor={item => item.id}
                layout={'default'} layoutCardOffset={`18`}
            />

        </View>
    )
}
const styles = StyleSheet.create({
    text: {
        color: "#888",
        margin: 10,
        fontSize: 16,
        fontFamily: fontBold
    },
    grid: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: 404,
        flexDirection: 'row',
        overflow: 'scroll',
        flexWrap: 'wrap',
        elevation: 10
    }
});
export default Grid;