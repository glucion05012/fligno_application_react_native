import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { styles } from '../styles/styles.js'

export default class API extends Component {
    render() {
        return (
            <View style={styles.center}>
                <Text style={styles.title}>This is API page!</Text>
            </View>
        );
    }
}