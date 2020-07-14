import React, { Component } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import axios from 'axios';
//import { dbConnection } from '../../App';
import '../../config'

import { styles } from '../styles/styles.js'
import { TextInput } from 'react-native-gesture-handler';

export default class Create extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            address: '',
            email: '',
            age: '',

            //validation
            nameError: '',
            addressError: '',
            emailError: '',
            ageError: ''
        }
    }

    validate = () => {
        let nameError = '';
        let addressError = '';
        let emailError = '';
        let ageError = '';

        if (this.state.name.length === 0) {
            nameError = "*Field is required..";
        } else if (this.state.name.length < 4) {
            nameError = "*Minimum of 4 characters required.";
        }

        if (this.state.address.length === 0) {
            addressError = "*Field is required..";
        }

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (this.state.email.length === 0) {
            emailError = "*Field is required..";
        }else if(reg.test(this.state.email) === false) {
                emailError = "Invalid Email";
        }

        if (this.state.age.length === 0) {
            ageError = "*Field is required..";
        } else if (this.state.age < 1) {
            ageError = "*Age cannot be lower than 0.";
        }

        if (nameError || addressError || emailError || ageError) {
            this.setState({ nameError, addressError, emailError, ageError });
            return false;
        }
        return true;
    }

    submit(){
        const isValid = this.validate();
        if (isValid) {
            axios.post(global.dbConnection + 'create', this.state)
                .then(response => {
                    this.setState({
                        isLoading: false,
                        dataSource: response.data
                    })
                })

            Alert.alert(
                "Success",
                "Profile successfully saved.",
                [
                { text: "OK", onPress: () => this.props.navigation.navigate("Read") } 
                ],
                { cancelable: false }
            );

            this.setState({
                name: '',
                address: '',
                email: '',
                age: '',

                //validation
                nameError: '',
                addressError: '',
                emailError: '',
                ageError: ''
            })
        }
    }

    render() {
        return (
            <View>

                <Text style={styles.header}> Create new Profile </Text>

                <Text style={styles.textLabel}>Name:</Text>
                <TextInput placeholder="Last Name, First Name MI"
                onChangeText={(text)=>{this.setState({name:text}) }}
                value={this.state.name}
                    style={styles.textInput}
                />
                <Text style={styles.error}>{this.state.nameError}</Text>

                <Text style={styles.textLabel}>Address:</Text>
                <TextInput
                    onChangeText={(text) => { this.setState({ address: text }) }}
                    value={this.state.address}
                    style={styles.textInput}
                />
                <Text style={styles.error}>{this.state.addressError}</Text>

                <Text style={styles.textLabel}>Email:</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => { this.setState({ email: text }) }}
                    value={this.state.email}
                />
                <Text style={styles.error}>{this.state.emailError}</Text>

                <Text style={styles.textLabel}>Age:</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => { this.setState({ age: text }) }}
                    value={this.state.age}
                    keyboardType='numeric'
                    maxLength={3}
                />
                <Text style={styles.error}>{this.state.ageError}</Text>
                <View style={styles.button}>
                <Button title="Save" onPress={() => { this.submit() }} />
                </View>
            </View>
        );
    }
}