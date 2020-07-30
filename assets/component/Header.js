import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { Appbar } from 'react-native-paper';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View>
                <StatusBar barStyle='light-content' />
                <Appbar.Header>
                    {
                        this.props.children
                    }
                    <Appbar.Content title={this.props.title} subtitle={this.props.subtitle} />
                </Appbar.Header>
            </View>
        );
    }
}
