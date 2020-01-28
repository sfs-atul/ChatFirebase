import firebase from "react-native-firebase";
import AsyncStorage from "@react-native-community/async-storage";

class Fire {
    constructor() {
        this.state = {
            clientId: '',
            roomKey:''
        }
        this.init();
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

    send = (messages, clientId) => {
        this.setState({ clientId: clientId });
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            };
            this.db.push(message)
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

    get = callback => {
        this.db.on("child_added", snapshot => callback(this.parse(snapshot)));
    };

    off() {
        this.db.off();
    }

    getRoomKey = async() => {
        let user = await AsyncStorage.getItem('userId');
        let client = this.state.clientId;
        let roomKey = parseInt(user) > parseInt(client) ? user + "" + client : client + "" + user;
        this.setState({ roomKey: roomKey })
    }

    get db() {
        return firebase.database().ref("messages/" + roomKey)
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }
}

export default new Fire();

