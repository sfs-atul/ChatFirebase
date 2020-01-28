import React, { Component } from 'react'
import { Text, View } from 'react-native'
import CommonStyle from '../../../common/CommonStyle'
import firebase from 'react-native-firebase';

export class Screen1 extends Component {

    componentDidMount() {
        firebase.auth().signOut();
    }
    render() {
        return (
            <View style={CommonStyle.container_center}>
                <Text> Screen1 </Text>
            </View>
        )
    }
}

export default Screen1
