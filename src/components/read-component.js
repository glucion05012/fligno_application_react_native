import React, { Component } from 'react';
import { ListItem } from 'react-native-elements'
import { View, Text, Alert, ActivityIndicator, Button } from 'react-native';
import axios from 'axios';
import { dbConnection } from '../../App';

import { styles } from '../styles/styles.js'
import { FlatList, TouchableOpacity, TextInput } from 'react-native-gesture-handler'; 

export default class Read extends Component {
    _isMounted = false;
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            dataSource: []
        }
    }

    componentDidMount(){
        this._isMounted = true;
        axios.get(dbConnection + 'read')
            .then(response => {
                
                this.setState({
                    isLoading: false,
                    dataSource: response.data
                })
            })
    }

    componentDidUpdate() {
        this._isMounted = true;
        axios.get(dbConnection + 'read')
            .then(response => {
                
                this.setState({
                    isLoading: false,
                    dataSource: response.data
                })
            })
    }


    renderItem = ({ item }) => (
        <ListItem
            title={item.name}
            subtitle={item.email}
            bottomDivider
            chevron
            onPress={() => this.props.navigation.navigate("EditRoute", {
                idGet: item.id,
            })}
        />
    )


    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        let {dataSource, isLoading} = this.state
        if (dataSource.length === 0){
            return (
                <View style={styles.center}>
                    <Text style={styles.title}>No Record found</Text>
                </View>
            )
        }else{
            if (isLoading) {
                return (
                    <View>
                        <ActivityIndicator size="large" animating />
                    </View>
                )
            } else {
                return (

                    <View>
                        <Text style={styles.header}> My Profile List </Text>

                        <FlatList
                            data={dataSource}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>

                );
            }
        }
    }
}