import React, { Component } from 'react';
import { View, Text, Linking } from 'react-native';

import { styles } from '../styles/styles.js'
import { FlatList } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';

const list = [
    {
        name: 'YouTube Search API',
        url: 'http://giddel-lucion-portfolio.herokuapp.com/projects/api',
        subtitle: 'YouTube video search API connection sample using PHP'
    },
    {
        name: 'Face Recognition Library',
        url: 'https://face-recognition-js.herokuapp.com/',
        subtitle: 'a JavaScript library to open camera of device to capture face expression.'
    },
    {
        name: 'Facebook Messenger API',
        url: 'http://giddel-lucion-portfolio.herokuapp.com/projects/facebook-messenger-api',
        subtitle: 'Facebook messenger API to let you send a private message to a facebook page.'
    },
];

export default class API extends Component {

    renderRow({ item }) {
        return (
            <ListItem
                title={item.name}
                subtitle={item.subtitle}
                onPress={() => Linking.openURL(item.url)}
            />
        )
    }

    render() {

        return (
            <View>
                <Text style={styles.header}> My API List </Text>

                <FlatList
                    data={list}
                    renderItem={this.renderRow}
                    keyExtractor={item => item.name}
                />
            </View>
        );
    }
}