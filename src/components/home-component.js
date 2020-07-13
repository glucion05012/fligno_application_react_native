import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

import { styles } from '../styles/styles.js'

export default class Home extends Component {
    render() {
        return (
            <View style={styles.center}>
                <Text style={styles.title}>This is HOME page!</Text>
            </View>
        );
    }
}