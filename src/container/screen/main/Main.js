import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput,Image,Dimensions  } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import CommonStyle from '../../../common/CommonStyle';
import firebase from 'react-native-firebase';
import PrintLog from '../../../common/PrintLog';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';

const { width, height } = Dimensions.get('screen')

export class Main extends Component {
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
        console.log('componentDidMount MyuserId==>>',await AsyncStorage.getItem('userId')) 
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
                <TouchableOpacity
                onPress={()=> firebase.auth().signOut()}
                >
                    <Text style={{color:'red'}}>Logout</Text>
                </TouchableOpacity>
                <Text>List fo users:</Text>

                <FlatList 
                    style={{ marginTop: 22}}
                    data={usersList}
                    keyExtractor={item => item.id}
                     renderItem={({ item }) => //<TouchableOpacity
                    //     onPress={() => this.props.navigation.navigate('Chat', { item })}
                    // >
                    //     <Text>{item.email}</Text>
                    // </TouchableOpacity>
                    <View>
                        <TouchableOpacity onPress={() =>{this.props.navigation.navigate('Chat', { item })}} style={{ width: "100%", height: 60, flexDirection: 'row', }}>
                    <View style={{ width: 64, height: 64 }}>
                        <Image style={{ width: 50, height: 50, margin: 7, borderRadius: 25, backgroundColor: "#E1E1E1" }}
                           // source={{ uri: item.item.Images[this.find_Id(item.item)] + "" }}
                           source={{ uri: 'https://picsum.photos/200/300' }}
                             />
                    </View>
                    <View style={{ width: width - 144, height: 64, justifyContent: 'center', marginLeft: 5, }}>
                        <Text style={{ color: '#000', fontSize: hp('2%') }}>
                            {item.name}
                            {/* {item.item.receiver == this.state.UserId ? item.item.sender_name : item.item.recevier_name} */}
                            </Text>
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            {/* {item.item.sender == this.state.UserId ?
                                <View style={{ width: wp("4.5%"), height: hp("2.1%"), marginRight: wp("1.5%") }}>
                                    <Image style={{ width: '100%', height: '100%', resizeMode: 'contain', tintColor: item.item.unread_msg[key1] == 0 ? "green" : CLR_GREY }} source={Tick}></Image>
                                </View>
                                : <View />} */}
                            <Text style={{ color: 'grey', fontSize: hp('1.7%')}} numberOfLines={1}>
                                {/* {item.item.last_message} */}
                                </Text>
                        </View>
                    </View>
                    <View style={{ width: wp("20%"), height: 64, alignItems: 'center', flexDirection: 'column', }}>
                        <Text style={{ fontSize: hp('1.5%'), marginTop: 12 }}>
                            {/* {this.time(item.item.timestamp)} */}
                            </Text>
                        {/* {parseInt(item.item.unread_msg[key]) >= 1 ?
                            <View style={{ width: hp('2.4%'), height: hp('2.4%'), borderRadius: hp('2.2%') / 2, backgroundColor: 'red', marginTop: hp('1%'), justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: "white", fontSize: hp('1.5%') }}>{item.item.unread_msg[key]}</Text>
                            </View> : <View />} */}
                    </View>
                </TouchableOpacity>
                    </View>
                    }
                />
              
            </View>
        )
    }
}

export default Main;
