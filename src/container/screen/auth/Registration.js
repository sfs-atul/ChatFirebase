import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import firebase from 'react-native-firebase'
import Wallpaper from '../../components/Wallpaper';
import AsyncStorage from '@react-native-community/async-storage';

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            name: '',
            errorMessage: null,
            getUniqueId: 0
        }
    }
    async componentDidMount() {
        await firebase.database().ref('Users/').on('value', (snapshot) => {
            console.log("snapshot._childKeys.length", snapshot._childKeys.length)
            this.setState({ getUniqueId: snapshot._childKeys.length });
        });
    }

    handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((res) => this.successhandleSignUp(res))
            .catch(error => this.setState({ errorMessage: error.message }))
    }

    successhandleSignUp = (response) => {
        console.log('successhandleSignUp', response);
        var user = firebase.auth().currentUser;
        this.createChatId(user);
        this.props.navigation.navigate('Dashboard');
    }

    createChatId = async(user) => {
        var id = (this.state.getUniqueId + 1);
        firebase.database().ref('Users/' + id).set({
            email: user.email,
            id: id,
            name: this.state.name
        });
        await AsyncStorage.setItem('userId',id.toString());
        await AsyncStorage.setItem('name',name);
        GLOBAL.USERNAME = this.state.name;
        GLOBAL.EMAIL = this.state.email;
    }


    render() {
        return (
            <Wallpaper>
                <View style={styles.container}>
                    <Text>Sign Up</Text>
                    {this.state.errorMessage &&
                        <Text style={{ color: 'red' }}>
                            {this.state.errorMessage}
                        </Text>}
                    <TextInput
                        placeholder="Name"
                        autoCapitalize="none"
                        placeholderTextColor='#000'
                        style={styles.textInput}
                        onChangeText={name => this.setState({ name })}
                        value={this.state.name}
                    />
                    <TextInput
                        placeholder="Email"
                        autoCapitalize="none"
                        placeholderTextColor='#000'
                        style={styles.textInput}
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                    />
                    <TextInput
                        secureTextEntry
                        placeholder="Password"
                        autoCapitalize="none"
                        placeholderTextColor='#000'
                        style={styles.textInput}
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                    />
                    <Button title="Sign Up" onPress={() => this.handleSignUp()} />
                    <Button
                        title="Already have an account? Login"
                        onPress={() => this.props.navigation.goBack()}
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
