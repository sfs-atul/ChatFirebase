import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import CommonStyle from '../../../common/CommonStyle';
import firebase from 'react-native-firebase';
import PrintLog from '../../../common/PrintLog';
import AsyncStorage from '@react-native-community/async-storage';


export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            messages: [],
            usersList: '',
            usersListID: null,
            username : '',
        };
    }

    async componentDidMount() {
        const { currentUser } = firebase.auth();
        this.setState({ currentUser, username : await AsyncStorage.getItem('name') });
        // PrintLog('currentUser', currentUser);
        // AsyncStorage.setItem('userId',currentUser.uid)
        this.readUserData();
        

    }

    readUserData() {
        firebase.database().ref('Users/').on('value', (snapshot) => {
            var data = snapshot.val();
            //PrintLog('dataaa', data);
            let dataArr = []
            data.map((item) => {
                if (item != null) {
                    dataArr.push(item)
                }
            });
            this.setState({
                usersList: dataArr
            });
            // var allUsers = [];
            // for (var key in data) {
            //     allUsers.push(data[key]);
            // }
            // PrintLog('data', allUsers);
            // this.setState({
            //     usersList: allUsers
            // })
        });
    }

    render() {
        const { usersList } = this.state;

        return (
            <View style={[CommonStyle.container_center, { marginTop: 35 }]}>
                <Text>Name: {this.state.username}</Text>
                <Text>List fo users:</Text>
                <FlatList 
                    style={{ marginTop: 22 }}
                    data={usersList}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Chat', { item })}
                    >
                        <Text>{item.email}</Text>
                    </TouchableOpacity>
                    }
                />
            </View>
        )
    }
}

export default Dashboard;
