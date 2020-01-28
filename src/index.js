import React, { Component } from 'react'
import { View } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createRootNavigator } from './appRoot/Router';
import LocalStorage from './common/LocalStorage';
import PrintLog from './common/PrintLog';
import firebase from 'react-native-firebase';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
        }
    }

    async componentDidMount() {
        //this.init();
        // let isLogin = await LocalStorage.read("isLogin");
        // PrintLog("isLogin >> ", isLogin);
        // let isLogin = false;
        // this.setState({ isLogin });
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ isLogin: user });
           // PrintLog('user', user)
        })
    }

    init = () => {
        if (!firebase.app.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyD_00558pMo6P9h9VDsbiVotNCUT2Pv9tc",
                authDomain: "chat-e9b23.firebaseapp.com",
                databaseURL: "https://chat-e9b23.firebaseio.com",
                projectId: "chat-e9b23",
                storageBucket: "chat-e9b23.appspot.com",
                messagingSenderId: "85534229401",
                appId: "1:85534229401:web:6fac334e3359d774a0c908",
                measurementId: "G-X1CBK48L15"
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

