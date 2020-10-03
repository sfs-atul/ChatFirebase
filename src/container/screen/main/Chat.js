import React, { Component } from 'react';
import { SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import PrintLog from '../../../common/PrintLog';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';

var chatRoomKey ='';
export default class Chat extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: params.email,
            headerTintColor: '#fa324f',
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            clientId: '',
            userId: '',
            messages: [],
            roomKey: '',
            username : ''
        };
    }

    async componentDidMount() {
        this.init();
        const { item } = this.props.navigation.state.params;
        this.setState({
            clientId: item.id,
            userId: await AsyncStorage.getItem('userId'),
            username: await AsyncStorage.getItem('name')
        });
        console.log('clientId',this.state.clientId,'userId',this.state.userId);

        this.get(message =>
            this.setState(previous => ({
                messages: GiftedChat.append(previous.messages, message)
            }))
        );
    }

    //initialise firebase
    init = () => {
        if (!firebase.app.length) {
            firebase.initializeApp({
                apiKey: "xxx",
                authDomain: "xxx-xxx.xxx.x",
                databaseURL: "x://x-x.x.x",
                projectId: "x-xxx",
                storageBucket: "xxx-xxx.xxx.xxxx",
                messagingSenderId: "xxx",
                appId: "1:xxx:web:xxx",
                measurementId: "G-xxx"
            });
        }
    }

    renderBubble(props) {
        return <Bubble {...props} 
        textStyle={{
            right: {
              color: '#fff',
            },
          }}
          wrapperStyle={{
            left: {
              backgroundColor: '#90ee90',
            },
          }}
        />;
      }

    render() {
        const { messages, userId,username } = this.state
        const chat = <GiftedChat
            messages={messages}
            loadEarlier={true}
            scrollToBottom={true}
           // renderBubble={this.renderBubble}
            onSend={messages => this.send(messages)}
            user={{
                _id: userId,
                name: username
            }}
        />
        if (Platform.OS === "android") {
            return (
                <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={30} enabled>
                    {chat}
                </KeyboardAvoidingView>
            )
        }else{
        return (<SafeAreaView style={{ flex: 1 }}>{chat}</SafeAreaView>);
    }
}



    //*FIREBASE*

    send = (messages) => {
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            };
            //this.db.push(message)
            setTimeout(async() => {
                 await firebase.database().ref("messages/" + chatRoomKey).push(message);
            }, 100);
        });
        this.chatHistory();
    }; 
    
    chatHistory = (messages) => {
        messages.forEach(item => {
            const chatData = {
                lastMsg: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            };
            setTimeout(async() => {
                await firebase.database().ref("ChatHistory/" + chatRoomKey).set(chatData);
            }, 100);
        });
    };



    parse = message => {
        const { user, text, timestamp } = message.val();
        const { key: _id } = message;
        const createdAt = new Date(timestamp);
        return {
            _id,
            createdAt,
            text,
            user
        };
    };

    get = async(callback) => {
       await this.getRoomKey();
        console.log('chatRoomKey==>',chatRoomKey)
         firebase.database().ref("messages/" + chatRoomKey).on("child_added", snapshot => callback(this.parse(snapshot)));
    };

    off() {
        firebase.database().ref("messages/" + chatRoomKey).off();
    }

    getRoomKey = async () => {
        let user = await AsyncStorage.getItem('userId');
        let client = this.state.clientId;
        let roomKey = parseInt(user) > parseInt(client) ? user + "" + client : client + "" + user;
        this.setState({ roomKey: roomKey });
        chatRoomKey = this.state.roomKey;
        console.log('roomKkkey', chatRoomKey)
    }

    get db() {
       
    }

}



