import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

export default class KhaiBaoYT extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <BlurView intensity={100} style={[StyleSheet.absoluteFill]}>
        
      </BlurView>
    );
  }
}
