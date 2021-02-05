import PlacesAutoCompleteActionTypes from '../actionTypes/PlacesAutoCompleteActionTypes';
import axios from "axios";
import ServiceUrls from '../../helpers/ServiceUrls';
import config from '../../../config';
import { getCacheObject } from '../../helpers/globalHelpers/GlobalHelperFunctions';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;
const GOOGLE_MAP_API_KEY = config.GOOGLE_MAP_API_KEY;


export const getgoogleaddress = (lat, lng) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        //var i = { lat: 40.714224, lng: -73.961452 };
        let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=" + GOOGLE_MAP_API_KEY;
        axios.get(url)
            .then(res => {
                if (res && res.data && res.data.results[0] && res.data.results[0].formatted_address) {
                    dispatch(set_google_places(res.data.results[0].formatted_address));
                } else {
                    dispatch(request_fail("Something wrong with Map Points"));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}


export const getlatlongfromPlaceId = (placeid) => {
    return dispatch => {
        dispatch(request_start());
        let url = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + placeid + "&key=" + GOOGLE_MAP_API_KEY;
        let data = { url: url };
        axios.post(ServiceUrls.GET_GOOGLE_DATA, data)
            .then(res => {
                if (res.status == 200) {
                    dispatch(set_location(res.data.data));
                } else {
                    dispatch(request_fail("error"));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}


export const getgoogleplaces = (st) => {
    return dispatch => {
        let url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + st + "&types=geocode&key=" + GOOGLE_MAP_API_KEY;
        let data = { url: url };
        console.log("data", url)
        axios.post(ServiceUrls.GET_GOOGLE_DATA, data)
            .then(res => {
                dispatch(set_google_places_data(res.data.data));
            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}




export const getgoogleplacesFetch = (st) => {
    return dispatch => {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        let url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + st + "&types=geocode&key=" + GOOGLE_MAP_API_KEY;
        fetch(proxyurl + url)
            .then(response => {
                dispatch(set_google_places_data(response));
            })
            .then(contents => console.log(contents))
            .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    };
}





export const set_google_places = (obj) => {
    return dispatch => {
        dispatch(set_google_places_data(obj));
    };
}

export const set_onchange_address = (i) => {
    return dispatch => {
        dispatch(setOnchangeAddress(i));
    };
}

const request_start = (data) => ({
    type: PlacesAutoCompleteActionTypes.PLACES_LOADING_START,
    payload: data
});

const request_fail = (data) => ({
    type: PlacesAutoCompleteActionTypes.PLACES_REQEST_STOP,
    payload: data
});

const set_google_places_data = (data) => ({
    type: PlacesAutoCompleteActionTypes.SET_PLACES_LIST,
    payload: data
});

const set_location = (data) => ({
    type: PlacesAutoCompleteActionTypes.GET_LAT_LANG_BY_PLACE_ID,
    payload: data
});

const setOnchangeAddress = (data) => ({
    type: PlacesAutoCompleteActionTypes.ON_CHANGE_ADDRESS,
    payload: data
});

