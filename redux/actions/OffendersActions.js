import OffendersActionTypes from '../actionTypes/OffendersActionTypes';
import axios from "axios";
import ServiceUrls from '../../helpers/ServiceUrls';
import config from '../../../config';
import { getCacheObject } from '../../helpers/globalHelpers/GlobalHelperFunctions';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;

export const getalloffenders = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.OFFENDERS_BY_GROUP_ID, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("getalloffenders>>test>>>", res.data, i);
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

export const addoffender = (i) => {
    return dispatch => {
        dispatch(request_start());
        const user = getCacheObject(SESSION_KEY_NAME);
        axios.post(ServiceUrls.ADD_GROUP, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("add user response", res.data);
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(request_add_offenders_success(res.data.response));
                } else {
                    dispatch(request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}





export const page_refresh = (i) => {
    return dispatch => {
        dispatch(pagerefresh());
    };
}

export const offenders_list_page_refresh = () => {
    return dispatch => {
        dispatch(pagerefresh());
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
export const setoffenderStatus = (type) => {
    return dispatch => {
        dispatch(setoffender_status(type));
    };
}
export const setoffenderType = (type) => {
    return dispatch => {
        dispatch(setoffender_type(type));
    };
}


const request_start = () => ({
    type: OffendersActionTypes.OFFENDERS_REQUEST_START
});
const request_success = (data, search_data) => ({
    type: OffendersActionTypes.OFFENDERS_REQUEST_SUCCESS,
    payload: data,
    searchInfo: search_data
});

const request_add_offenders_success = (data) => ({
    type: OffendersActionTypes.ADD_OFFENDERS_REQUEST_SUCCESS,
    payload: data
});



const request_fail = (data) => ({
    type: OffendersActionTypes.OFFENDERS_REQUEST_FAIL,
    payload: data
});


const setalphabetInfo = (data) => ({
    type: OffendersActionTypes.SET_OFFENDERS_ALPHABET_VAL,
    payload: data
});


const pagerefresh = () => ({
    type: OffendersActionTypes.OFFENDERS_PAGE_RESET
});

const setpopuperror_msg = (data) => ({
    type: OffendersActionTypes.OFFENDERS_POPUP_BOX_ERROR_MESSAGE,
    payload: data
});

export const setoffenderGroupId = (id) => {
    return dispatch => {
        dispatch(setoffender_group_id(id));
    };
}

const setoffender_group_id = (data) => ({
    type: OffendersActionTypes.SET_OFFENDERS_GROUP_ID_VAL,
    payload: data
});


const setoffender_status = (data) => ({
    type: OffendersActionTypes.SET_OFFENDERS_STATUS,
    payload: data
});

const setoffender_type = (data) => ({
    type: OffendersActionTypes.SET_OFFENDERS_TYPE,
    payload: data
});