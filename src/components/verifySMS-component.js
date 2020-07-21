import React, { Component } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import axios from 'axios';
//import { dbConnection } from '../../App';
import '../../config'

import { styles } from '../styles/styles.js'
import { TextInput } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

export default class verifySMS extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idGet: props.route.params.idGet,
            code: '',
            contact: '',
            //validation
            codeError: '',
        }
    }

    submitResend() {

        axios.get(global.dbConnection + "edit/" + this.state.idGet)
            .then(response => {
                this.setState({
                    contact: response.data.contact,
                })

                // send sms
                console.log(this.state.contact)
                axios.get(global.dbConnection + 'sendSMS/' + this.state.contact)
                    .then(response => {
                        console.log(response.data);
                        alert('SMS Sent!');
                    })
                    .catch((err) => {
                        console.log(err);
                    })

            })
            .catch((err) => {
                console.log(err);
            })
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }


    validate = () => {
        //validation
        let codeError = '';

        if (this.state.code.length === 0) {
            codeError = "*Field is required..";
        } else if (this.state.code.length !== 4) {
            codeError = "*Code should be 4 digits.";
        }

        if (codeError) {
            this.setState({ codeError });
            return false;
        }

        return true;
    }

    submit () {

        const isValid = this.validate();

        if (isValid) {
            let codeError = '';
            axios.get(global.dbConnection + 'edit/' + this.state.idGet)
                .then(response => {
                    if (response.data.SMStoken !== this.state.code) {
                        codeError = "*Invalid verification code!";
                        this.setState({ codeError });
                    } else {
                        // backend connection
                        axios.get(global.dbConnection + 'SMSverify/' + this.state.idGet)
                            .then(res => {

                                Alert.alert(
                                    "Success",
                                    "Profile successfully verified.",
                                    [
                                        { text: "OK", onPress: () => this.props.navigation.navigate("Read") }
                                    ],
                                    { cancelable: false }
                                );

                                this.setState({
                                    code: '',

                                    //validation
                                    codeError: '',

                                })

                                //this.props.history.push('/'); 
                            }).catch((err) => {
                                console.log(err);
                            });

                    }
                });

        }


    }

    render() {
        return (
            <View>
                <Text style={styles.header}> Verification Code </Text>

                <Text style={styles.textLabel}>Enter Code:</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => { this.setState({ code: text }) }}
                    value={String(this.state.code)}
                    keyboardType='numeric'
                    maxLength={4}
                />
                <Text style={styles.error}>{this.state.codeError}</Text>


                <View style={styles.button}>
                    <Button title="Validate" onPress={() => { this.submit() }} />
                </View> 

                <View style={styles.button}>
                    <Button title="Resend Code" color="red" onPress={() => { this.submitResend() }} />
                </View> 
            </View>
        )
    }
}