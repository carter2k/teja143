import VictimsActionTypes from '../actionTypes/VictimsActionTypes';
import axios from "axios";
import ServiceUrls from '../../helpers/ServiceUrls';
import config from '../../../config';
import { getCacheObject } from '../../helpers/globalHelpers/GlobalHelperFunctions';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;

export const getallvictims = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        console.log("victims get>>", JSON.stringify(i));
        axios.post(ServiceUrls.VICTIMS_BY_GROUP_ID, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("victims get>>", res.data);
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(request_success(res.data.response, i));
                } else {
                    dispatch(request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}

export const addvictim = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.ADD_GROUP, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("add user response", res.data);
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(request_add_victims_success(res.data.response));
                } else {
                    dispatch(request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}


export const victimlist_page_refresh = (i) => {
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
    type: VictimsActionTypes.VICTIMS_REQUEST_START
});
const request_success = (data, search_data) => ({
    type: VictimsActionTypes.VICTIMS_REQUEST_SUCCESS,
    payload: data,
    searchInfo: search_data
});

const request_add_victims_success = (data) => ({
    type: VictimsActionTypes.ADD_VICTIMS_REQUEST_SUCCESS,
    payload: data
});



const request_fail = (data) => ({
    type: VictimsActionTypes.VICTIMS_REQUEST_FAIL,
    payload: data
});


const setalphabetInfo = (data) => ({
    type: VictimsActionTypes.SET_VICTIMS_ALPHABET_VAL,
    payload: data
});


const pagerefresh = (data) => ({
    type: VictimsActionTypes.VICTIMS_PAGE_RESET
});

const setpopuperror_msg = (data) => ({
    type: VictimsActionTypes.VICTIMS_POPUP_BOX_ERROR_MESSAGE,
    payload: data
});

//set bracelets group id
export const setvictimsGroupId = (id) => {
    return dispatch => {
        dispatch(setVictims_group_id(id));
    };
}

const setVictims_group_id = (data) => ({
    type: VictimsActionTypes.SET_VICTIMS_GROUP_ID_VAL,
    payload: data
});
