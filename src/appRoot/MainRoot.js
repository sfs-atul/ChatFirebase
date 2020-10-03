import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

import Main from "../container/screen/main/Main";
import Dashboard from '../container/screen/main/Dashboard';
import Screen1 from '../container/screen/main/Screen1';
import Screen2 from '../container/screen/main/Screen2';
import Screen3 from '../container/screen/main/Screen3';
import Chat from '../container/screen/main/Chat';

const MainStackNavigator = createStackNavigator(
    {
        Main: { screen: Main },
        Chat: { screen: Chat },
    },
    {
        initialRouteName: "Main",
        headerMode: "none",
        defaultNavigationOptions: {
            header: null,
        }
    }
);

const DrawerNavigator = createDrawerNavigator(
    {
        Dashboard: { screen: Dashboard },
        Logout: { screen: Screen1 },
        Screen2: { screen: Screen2 },
        Screen3: { screen: Screen3 },

    },
    {
        drawerPosition: "left",
        headerMode: "none",
        drawerLockMode: "locked-closed",
    }
);

export default (MainRoot = () => {
    return createStackNavigator(
        {
            DrawerNavigator: DrawerNavigator,
            Main: MainStackNavigator,
        },
        {
            initialRouteName: "Main",
            headerMode: "none",
            defaultNavigationOptions: {
                header: null,
            }
        }
    );
});
