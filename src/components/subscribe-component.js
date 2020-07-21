import React, { Component } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import axios from 'axios';
import '../../config'

import { styles } from '../styles/styles.js'
import { TextInput } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

export default class subscription extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idGet: props.route.params.idGet,
            id: '',
            isConfirmed: '',

        }
    }

    componentDidMount() {
        axios.get(global.dbConnection + "edit/" + this.state.idGet)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    isConfirmed: response.data.isConfirmed,
                })
            })
            .catch((err) => {
                console.log(err);
            })


    }


    render() {
        return(
            <View>
                <Text style={styles.header}> Subscription </Text>

            </View>
        )        
    }
}