import BraceletActionTypes from '../actionTypes/BraceletsActionTypes';
import axios from "axios";
import ServiceUrls from '../../helpers/ServiceUrls';
import config from '../../../config';
import { getCacheObject } from '../../helpers/globalHelpers/GlobalHelperFunctions';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;


export const getallbracelets = (i, filter_id) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        console.log(ServiceUrls.BRACELETS_BY_GROUP_ID, user['access-token'], user['access-token'], JSON.stringify(i))
        axios.post(ServiceUrls.BRACELETS_BY_GROUP_ID, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("braclets", res, i)
                let resCode = res.data.status;
                if (resCode === 200) {

                    dispatch(request_success(res.data.response, i, filter_id));
                } else {
                    dispatch(request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}

export const addbracelet = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.ADD_GROUP, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("add user response", res.data);
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(request_add_bracelets_success(res.data.response));
                } else {
                    dispatch(request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}
export const search = (obj) => {
    return dispatch => {
        dispatch(setsearchInfo(obj));
    };
}

export const bracelet_page_refresh = (i) => {
    return dispatch => {
        dispatch(pagerefresh(i));
    };
}

export const setalphabet = (i) => {
    return dispatch => {
        dispatch(setalphabetInfo(i));
    };
}

export const errormsg = (msg) => {
    return dispatch => {
        dispatch(request_fail(msg));
    };
}

export const setpopupmsg = (msg) => {
    return dispatch => {
        dispatch(setpopuperror_msg(msg));
    };
}

const request_start = () => ({
    type: BraceletActionTypes.BRACELETS_REQUEST_START
});
const request_success = (data, search_data, filter_id) => ({
    type: BraceletActionTypes.BRACELETS_REQUEST_SUCCESS,
    payload: data,
    searchInfo: search_data,
    filter_id: filter_id
});

const request_add_bracelets_success = (data) => ({
    type: BraceletActionTypes.ADD_BRACELETS_REQUEST_SUCCESS,
    payload: data
});



const request_fail = (data) => ({
    type: BraceletActionTypes.BRACELETS_REQUEST_FAIL,
    payload: data
});


const setalphabetInfo = (data) => ({
    type: BraceletActionTypes.SET_BRACELETS_ALPHABET_VAL,
    payload: data
});


const pagerefresh = (data) => ({
    type: BraceletActionTypes.BRACELETS_PAGE_RESET
});

const setpopuperror_msg = (data) => ({
    type: BraceletActionTypes.BRACELETS_POPUP_BOX_ERROR_MESSAGE,
    payload: data
});


const setsearchInfo = (data) => ({
    type: BraceletActionTypes.BRACELET_SEARCH,
    searchInfo: data
});

//set bracelets group id
export const setbraceletssGroupId = (id) => {
    return dispatch => {
        dispatch(setBracelets_group_id(id));
    };
}

const setBracelets_group_id = (data) => ({
    type: BraceletActionTypes.SET_BRACELETS_GROUP_ID_VAL,
    payload: data
});