import React, { Component } from 'react';
import { View, Text, Button, Image } from 'react-native';
import axios from 'axios';

import { styles } from '../styles/styles.js'

export default class Home extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {

            // weather
            icon: '',
            temp: '',
            humidity: '',
            wind: '',
            city: '',
            region: '',
            day: '',
            description: '',


            // news
            author: '',
            title: '',
            description: '',
            url: '',
            urlToImage: '',
            publishedAt: '',
            content: '',
            news: []

        }
    }

    componentDidMount() {
        this._isMounted = true;
        var d = new Date();
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        var dayToday = weekday[d.getDay()];


        // ipinfo API
        axios.get("https://ipinfo.io/?token=40fd1b3a59a6bc")
            .then(response => {
                this.setState({
                    region: response.data.region,
                    city: response.data.city,

                })

                //getting geolocation
                let geoLoc = JSON.stringify(response.data.loc);
                geoLoc = geoLoc.split(',');
                let lat = geoLoc[0];
                let lon = geoLoc[1];

                lat = lat.replace(/['"]+/g, '')
                lon = lon.replace(/['"]+/g, '')

                // openweather API
                axios.get("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid=b289a697bb9ecbfc41529eed314a7f41")
                    .then(response => {
                        let icon = "http://openweathermap.org/img/wn/" + response.data.weather[0].icon + "@2x.png"

                        this.setState({
                            icon: icon,
                            temp: Math.trunc(response.data.main.temp),
                            humidity: response.data.main.humidity,
                            wind: Math.trunc(response.data.wind.speed * 3.6),
                            day: dayToday,
                            description: response.data.weather[0].description

                        })
                    }).catch((err) => {
                        console.log(err);
                    });

                // openweather API end
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        return (
            <View style={{
                borderBottomColor: "black",
                borderWidth: 1,
                marginVertical: 10,
                marginHorizontal: 10,
                maxHeight:200,
                flex: 1,
                flexDirection: "row",
            }}>

                <View style={{
                    marginVertical: 10,
                    marginHorizontal: 10,
                    flex: 1,
                    minWidth: 70,
                }} >
                    <Text>{this.state.city}, {this.state.region}</Text>
                    <Text>{this.state.day}</Text>
                    <Text>{this.state.description}</Text>

                    <Image
                        style={{
                            width: 66,
                            height: 58,
                            marginTop: 10,
                            backgroundColor: 'gray',
                        }}
                        source={{ uri: this.state.icon }}
                    />
                </View>

                <View style={{
                    flex: 1,
                    marginVertical: 10,
                    marginHorizontal: 10,
                }}>
                    <Text>Humidity: {this.state.humidity}%</Text>
                    <Text>Wind: {this.state.wind} km/h</Text>
                    <Text style={{ fontSize: 50, marginTop: 30, }}>{this.state.temp}&#8451;</Text>
                </View>


            </View>
        );
    }
}