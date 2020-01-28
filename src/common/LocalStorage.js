import AsyncStorage from '@react-native-community/async-storage';

module.exports = {
    save: async function (key, data) {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            return false;
        }
    },

    read: async function (key) {
        try {
            let data = await AsyncStorage.getItem(key);
            if (data !== null) {
                return JSON.parse(data);
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    },

    empty: function (key) {
        try {
            AsyncStorage.setItem(key, '');
            return true;
        } catch (error) {
            return false;
        }
    },

    removeItem: async function (key) {
        await AsyncStorage.removeItem(key);
    },

    flushQuestionKeys: function () {
        AsyncStorage.getAllKeys().then((keys) => {
            const questionKeys = keys.filter((key) => {
                return key;
            });
            questionKeys.map((key) => {
                this.removeItem(key)
            });
        });
    }
}