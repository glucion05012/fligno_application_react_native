import React, { Component } from 'react';
import { Button } from 'react-native';
import Home from './src/components/home-component';

import Read from './src/components/read-component';
import Create from './src/components/create-component';
import Edit from './src/components/edit-component';

import API from './src/components/api-component';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// set for your IP address and PORT and start "sudo php artisan serve --host=192.168.254.102 --port=80"
export const dbConnection = "http://192.168.254.102:80/api/";

export default class App extends Component{
  render(){

    const createHomeStack = ({ navigation }) =>(
      <Stack.Navigator>
        <Stack.Screen name="Home" 
                      component={Home}
                      options={{
                        headerLeft: () => (
                          <Button
                            onPress={() => navigation.openDrawer()}
                            title=" > "
                            color="blue"
                          />
                        ),
                      }}
            
        />
      </Stack.Navigator>
    )

    const createReadStack = ({ navigation }) => (
        <Stack.Navigator>
          <Stack.Screen name="Read" 
                        component={Read} 
                        options={{
                          headerLeft: () => (
                            <Button
                              onPress={() => navigation.openDrawer()}
                              title=" > "
                              color="blue"
                            />
                          ),
                        }}/>
          <Stack.Screen name="CreateRoute" component={Create} />
        <Stack.Screen name="EditRoute" component={Edit} />
        </Stack.Navigator>
    )

    return(
      <NavigationContainer>
        <Drawer.Navigator initialRouteName={Home}>
          <Drawer.Screen name="Home" children={createHomeStack} />
          <Drawer.Screen name="Read" children={createReadStack} />
          <Drawer.Screen name="API" component={API} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
};