import React, { Component } from 'react'
import { View } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createRootNavigator } from './appRoot/Router';
import LocalStorage from './common/LocalStorage';
import PrintLog from './common/PrintLog';//Custom Console.log
import firebase from 'react-native-firebase';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
        }
    }

    async componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ isLogin: user });
        })
    }

    init = () => {
        if (!firebase.app.length) {
            firebase.initializeApp({
                apiKey: "Your_Key",
                authDomain: "xxx",
                databaseURL: "xxx",
                projectId: "xxx-xxx",
                storageBucket: "xxx",
                messagingSenderId: "xxx",
                appId: "xxx",
                measurementId: "xxx"
            });
        }
    }

    render() {
        const { isLogin } = this.state;
        const Layout = createAppContainer(createRootNavigator(isLogin));
        return (
            <View style={{ flex: 1 }}>
                {<Layout />}
            </View>
        )
    }
}

