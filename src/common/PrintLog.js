/**
 * The method will use to console log
 * @param {*} name = Hint or message to recognize log
 * @param {*} value = Value we want to console
 */ 
export default function PrintLog(name, value) {
    let __DEV__ = true;
    if (__DEV__) {
        return console.log(name, value);
    }
};  