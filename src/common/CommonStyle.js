import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colorPrimary, white, black, grey } from './Colors';

let statusBarHeight = Platform.OS === 'ios' ? 22 : StatusBar.currentHeight;
const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', width: '100%'
    },
    container_center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    divider: {
        marginVertical: hp("1%"),
        backgroundColor: black,
        width: wp("100%"),
        height: 0.8
    },

    profile_image: {
        width: 50,
        height: 50,
    },

    heading: {
        color: '#fff',
        fontSize: hp("2%")
    },

    text_mute: {
        color: "#aaa",
    },

    text_small: {
        fontSize: hp("1%"),
    },

    text_input: {
        color: '#fff',
        fontSize: hp("1%")
    },

    btn: {
        backgroundColor: colorPrimary,
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
    },

    btn_active: {
        backgroundColor: colorPrimary,
    },

    btn_text: {
        color: '#fff',
        fontSize: hp("3%"),
        fontWeight: 'bold',
    },

    footer: {
        padding: 10,
        backgroundColor: '#2a2a2a',
        borderTopColor: '#333',
        borderTopWidth: 1,
    },
});