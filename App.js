import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Vietnam from './assets/screens/Vietnam.js'
import World from './assets/screens/World.js'
import About from './assets/screens/About.js'

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()
const BottomTabs = createMaterialBottomTabNavigator()
const TopTabs = createMaterialTopTabNavigator()

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  createHomeStack= () => 
    <Stack.Navigator>
      <Stack.Screen name='Việt Nam' component={Vietnam} />
      <Stack.Screen name='Thế Giới' component={World} />
      <Stack.Screen name='Giới Thiệu' component={About} />
    </Stack.Navigator>

  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Việt Nam" component={Vietnam} />
          <Drawer.Screen name='Thế Giới' component={World} />
          <Drawer.Screen name='Giới Thiệu' component={About} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
