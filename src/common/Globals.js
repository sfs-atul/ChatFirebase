// Live URL
export const BASE_URL =     'http://18.220.95.159/api/';

module.exports = {
    //* Live *//
    
	REQUEST_URL:            'http://18.220.95.159/api/',
	IMAGE_BASE:             'http://18.220.95.159/',
    GOOGLE_MAP_API_KEY:     'AIzaSyDZTib3xD80Sf7q-Z_InWiJqqC_Ftoqfag',

    //* DEV *//
    
	// REQUEST_URL:         'http://192.168.0.20:8000/api/',
	//IMAGE_BASE:           'http://18.220.95.159/',
	//GOOGLE_MAP_API_KEY:   'AIzaSyDYvalbW9BDXioYiRuxuQxhkDsHPcNY5iM',

	//* Auth *//
    EMAIL: '',
    USERNAME: '',
	PASS: '',
	LOGGED_IN: false,
	AUTH_TOKEN: '',
	CURRENT_APP_VERSION: '0.0.0',
	

	//* APIs *//
	REGISTER: 				BASE_URL + "register",
	LOGIN: 					BASE_URL + "login",
	UPDATE_DEVICE_TOKEN:	BASE_URL + "update_device_info",
	VIEW_PROFILE: 			BASE_URL + "view_profile",


};