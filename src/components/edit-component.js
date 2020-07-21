import React, { Component } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import axios from 'axios';
//import { dbConnection } from '../../App';
import '../../config'

import { styles } from '../styles/styles.js'
import { TextInput } from 'react-native-gesture-handler';

export default class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idGet: props.route.params.idGet,
            name: '',
            address: '',
            age: '',
            contact: '',
            email: '',
            isConfirmed: '',

            //validation
            nameError: '',
            addressError: '',
            ageError: '',
            contactError: '',
            emailError: '',
        }
    }

    componentDidMount() {
        this._isMounted = true;
        axios.get(global.dbConnection + 'edit/' + this.state.idGet)
            .then(response => {
                this.setState({
                    isLoading: false,
                    name: response.data.name,
                    address: response.data.address,
                    age: response.data.age,
                    contact: response.data.contact,
                    email: response.data.email,
                    isConfirmed: response.data.isConfirmed,
                    
                })
            })
    }

    validate = () => {
        let nameError = '';
        let addressError = '';
        let ageError = '';
        let contactError = '';
        let emailError = '';

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
        } else if (reg.test(this.state.email) === false) {
            emailError = "Invalid Email";
        }

        if (this.state.age.length === 0) {
            ageError = "*Field is required..";
        } else if (this.state.age < 1) {
            ageError = "*Age cannot be lower than 0.";
        }

        if (this.state.contact.length === 0) {
            contactError = "*Field is required..";
        } else if (this.state.contact.length < 11) {
            contactError = "*Minimum of 11 digits.";
        }

        if (nameError || addressError || emailError || ageError) {
            this.setState({ nameError, addressError, emailError, ageError });
            return false;
        }
        return true;
    }

    submit() {
        const isValid = this.validate();
        if (isValid) {
            axios.put(global.dbConnection + 'update/' + this.state.idGet, this.state)
                .then(response => {
                    this.setState({
                        isLoading: false,
                        dataSource: response.data
                    })
                }).catch((err) => {
                    console.log(err);
                })

            Alert.alert(
                "Success",
                "Profile successfully updated.",
                [
                    { text: "OK", onPress: () => this.props.navigation.navigate("Read") }
                ],
                { cancelable: false }
            );

            this.setState({
                id:'',
                name: '',
                address: '',
                age: '',
                contact: '',
                email: '',

                //validation
                nameError: '',
                addressError: '',
                ageError: '',
                contactError: '',
                emailError: '',
            })
        }
    }

    submitVerify() {
           this.props.navigation.navigate("VerifyRoute", {
                idGet: this.state.idGet,
            })
    }
    

    submitSubscribe(){
        this.props.navigation.navigate("SubscribeRoute", {
            idGet: this.state.idGet,
        })
    }

    delete() {
        Alert.alert(
            "Confirmation",
            "Are you sure you want to delete Profile?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "YES", onPress: () => this.deleteProfile() }
            ],
            { cancelable: false }
        );
    }

    deleteProfile() {
        axios.delete(global.dbConnection + 'delete/' + this.state.idGet, this.state)
        Alert.alert(
            "Deleted",
            "Profile successfully deleted.",
            [
                { text: "OK", onPress: () => this.props.navigation.navigate("Read") }
            ],
            { cancelable: false }
        );
    }


    render() {
        return (
            <View>

                <Text style={styles.header}> Update Profile </Text>

                <Text style={styles.textLabel}>Name:</Text>
                <TextInput placeholder="Last Name, First Name MI"
                    onChangeText={(text) => { this.setState({ name: text }) }}
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
                    value={String(this.state.age)}
                    keyboardType='numeric'
                    maxLength={3}
                />
                <Text style={styles.error}>{this.state.ageError}</Text>

                <Text style={styles.textLabel}>Contact:</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => { this.setState({ contact: text }) }}
                    value={String(this.state.contact)}
                    keyboardType='numeric'
                    maxLength={11}
                />
                <Text style={styles.error}>{this.state.contactError}</Text>


                {this.state.isConfirmed === 0 ? 
                    <View style={styles.button}>
                        <Button title="Verify" onPress={() => { this.submitVerify() }} />
                    </View> 
                    :
                    <View style={styles.button}>
                        <Button title="Update" onPress={() => { this.submit() }} />
                    </View> 

                }

                {/* Delete button */}
                <View style={styles.deleteBtn}>
                <Button title="Delete" 
                        onPress={() => { this.delete() }} 
                        color="red"
                    />
                </View>


                {this.state.isConfirmed === 1 ?
                    <View style={styles.buttonSubs}>
                        <Button title="Subscribe" color="gold" onPress={() => { this.submitSubscribe() }} />
                    </View>
                    :
                   null
                }
            </View>
        );
    }
}