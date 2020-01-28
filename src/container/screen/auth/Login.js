import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import Wallpaper from '../../components/Wallpaper';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errorMessage: null,
            usersList: []
        }
    }

    componentDidMount = async () => {
        await firebase.database().ref('Users/').on('value', (snapshot) => {
            var arr = [];
            snapshot.forEach((Users) => {
                var obj = { key: Users.key, value: Users.val() }
                arr.push(obj);
            });
            this.setState({ usersList: arr });
        });
    }

    handleLogin = () => {
        const { email, password } = this.state
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((res) => this.successhandleLogin(res))
            .catch(error => this.setState({ errorMessage: error.message }))
    }

    successhandleLogin = async(res) => {
        console.log('successhandleLogin', res);
        var usersList = this.state.usersList;
        console.log('usersList', usersList);
        usersList.forEach(async (Users) => {
            if (res.user.email == Users.value.email) {
                 AsyncStorage.setItem('userId', JSON.stringify(Users.value.id));
                 AsyncStorage.setItem('name', Users.value.name);
                 AsyncStorage.setItem('email', Users.value.email);
            }
        });
    }

    render() {
        return (
            <Wallpaper>
                <View style={styles.container}>
                    <Text>Login</Text>
                    {this.state.errorMessage &&
                        <Text style={{ color: 'red' }}>
                            {this.state.errorMessage}
                        </Text>}
                    <TextInput
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder="Email"
                        placeholderTextColor='#000'
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                    />
                    <TextInput
                        secureTextEntry
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder="Password"
                        placeholderTextColor='#000'
                        placeholderTextColor='#000'
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                    />
                    <Button title="Login" onPress={this.handleLogin} />
                    <Button
                        title="Don't have an account? Sign Up"
                        onPress={() => this.props.navigation.navigate('Registration')}
                    />
                </View>
            </Wallpaper>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: '#fff',
        borderWidth: 1,
        marginTop: 8,
        backgroundColor: '#fff',
        opacity: 0.4,
        borderRadius: 10
    }
})