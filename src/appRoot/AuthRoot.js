import { createStackNavigator } from 'react-navigation-stack';

import Register from '../container/screen/auth/Registration';
import Login from '../container/screen/auth/Login';
import ForgotPassword from '../container/screen/auth/ForgotPassword';
import SecondScreen from '../container/components/SecondScreen';

export default AuthRoot = () => {
    return createStackNavigator(    
        {
            Registration: { screen: Register },
            Login: { screen: Login },
            ForgotPassword: { screen: ForgotPassword },
            SecondScreen: { screen: SecondScreen },
            
        },
        {
            initialRouteName: "Login",
            headerMode: 'none',
            defaultNavigationOptions: {
               // gesturesEnabled: false,
            },
        }
    )
}