import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Image, Linking, Dimensions } from 'react-native';
import axios from 'axios';
import { ListItem } from 'react-native-elements'

import { styles } from '../styles/styles.js'
import { FlatList } from 'react-native-gesture-handler';

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


            isLoading: true,
            dataSource: []

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


                //news API
                axios.get("http://newsapi.org/v2/top-headlines?country=ph&apiKey=3846b342a54142149ca91df6121d53ea")
                    .then(response => {
                        this.setState({
                            isLoading: false,
                            dataSource: response.data.articles
                        })
                    })
            });
    }

    renderItem = ({ item }) => (
        <ListItem
            leftAvatar={{ source:{uri: item.urlToImage} }}
            title={item.title}
            subtitle={item.description}
            bottomDivider
            chevron
            onPress={() => Linking.openURL(item.url)}
        />
    )

    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        let { dataSource, isLoading } = this.state

        if (isLoading) {
            return (
                <View>
                    <ActivityIndicator size="large" animating />
                </View>
            )
        } else {
            return (

                <View style={{
                    borderBottomColor: "black",
                    borderWidth: 1,
                    marginVertical: 10,
                    marginHorizontal: 10,
                    maxHeight: 200,
                    flex: 1,
                    flexDirection: "column",
                }}>

                    <Text style={styles.header}> Weather Today </Text>

                    {/* weather */}
                    <View style={{
                        marginVertical: 10,
                        marginHorizontal: 10,
                        maxHeight: 150,
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
                    {/* end weather */}

                    {/* news */}
                    <View style={{
                        borderBottomColor: "black",
                        borderWidth: 1,
                        marginTop: 150,
                        height: Math.round(Dimensions.get('window').height)-310,
                    }}>
                        <Text style={styles.header}> Latest News </Text>

                        <FlatList
                            data={dataSource}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    {/* end news */}

                </View>
            );
        }

    }
}