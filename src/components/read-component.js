import React, { Component } from 'react';
import { View, Text, Alert, ActivityIndicator, Button } from 'react-native';
import axios from 'axios';
import { dbConnection } from '../../App';

import { styles } from '../styles/styles.js'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'; 

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
                console.log(response.data);
                this.setState({
                    isLoading: false,
                    dataSource: response.data
                })
            })
    }

    _renderItem = ({item, index}) =>{
        return(
            <TouchableOpacity onPress={() => Alert.alert(item.name, "Address: " + item.address + "\n" + "Email: " + item.email + "\n" + "Age: " + item.age)}>
                <View style={styles.item}>
                    <Text>{item.name} <Button
                        onPress={() => this.props.navigation.navigate('EditRoute')}
                        title="Edit"
                        color="blue"
                    /></Text>
                    
                </View>
            </TouchableOpacity>
        )
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        let {dataSource, isLoading} = this.state
        if(isLoading){
            return(
                <View>
                    <ActivityIndicator size="large" animating />
                </View>
            )
        }else{
            return (

                <View>
                    <Text style={styles.header}> My Profile List </Text>
                    <FlatList
                        data={dataSource}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>

            );
        }
    }
}