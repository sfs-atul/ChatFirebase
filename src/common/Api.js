import axios from "axios";
import axiosRetryInterceptor from "axios-retry-interceptor";
import PrintLog from "../common/PrintLog";

const axiosInstance = axios.create();

axiosRetryInterceptor(axiosInstance, {
    maxAttempts: 3,
    waitTime: 1000,
    errorCodes: [501, 401, 500]
});

const apiHeaders = {
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        // Use if needed Authorization
        // "Authorization": "Bearer " + GLOBAL.TOKEN, 
    }
}

var apiCalling = {

    getApi: (url, successCallback, errorCallback) => {
        PrintLog("getApi url >>", url);
        axiosInstance
            .get(url, apiHeaders)
            .then(response => {
                PrintLog("GET API Response >> ", response);
                successCallback(response);
            })
            .catch(error => {
                PrintLog("GET API Error >> ", error);
                errorCallback(error);
            });
    },

    postApi: (url, params, successCallback, errorCallback) => {
        PrintLog("postApi url >>", url);
        axiosInstance
            .post(url, params, apiHeaders)
            .then(response => {
                PrintLog("POST API Response >> ", response);
                successCallback(response);
            })
            .catch(error => {
                PrintLog("POST API Error >> ", error);
                errorCallback(error);
            });
    },

    deleteApi: (url, successCallback, errorCallback) => {
        PrintLog("postApi url >>", url);
        axiosInstance
            .delete(url, apiHeaders)
            .then(response => {
                PrintLog("DELETE API Response >> ", response);
                successCallback(response);
            })
            .catch(error => {
                PrintLog("DELETE API Error >> ", error);
                errorCallback(error);
            });
    },

    getApiWithoutHeader: (url, successCallback, errorCallback) => {
        PrintLog("getApiWithoutHeader url >>", url);
        axiosInstance
            .get(url)
            .then(response => {
                PrintLog("GET/WH API Response >> ", response);
                successCallback(response);
            })
            .catch(error => {
                PrintLog("GET/WH API Error >> ", error);
                errorCallback(error);
            });
    },

    postApiWithoutHeader: (url, params, successCallback, errorCallback) => {
        PrintLog("postApiWithoutHeader url >>", url);
        axiosInstance
            .post(url, params)
            .then(response => {
                PrintLog("POST/WH API Response >> ", response);
                successCallback(response);
            })
            .catch(error => {
                PrintLog("POST/WH API Error >> ", error);
                errorCallback(error);
            });
    },

}
module.exports = apiCalling;