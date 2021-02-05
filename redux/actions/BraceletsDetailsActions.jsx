import BraceletDetailsActionTypes from '../actionTypes/BraceletDetailsActionTypes';
import axios from "axios";
import ServiceUrls from '../../helpers/ServiceUrls';
import config from '../../../config';
import { getCacheObject } from '../../helpers/globalHelpers/GlobalHelperFunctions';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;

export const addbracelet = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.ADD_BRACELET_BY_ID, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("get>>", res.data);
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(request_add_bracelet_success(res.data.response));
                } else {
                    dispatch(request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}

export const getbracelet = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.GET_CLEINT_BRACELET, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("get>>", res.data);
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(request_success(res.data.response.data, i));
                } else {
                    dispatch(request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}

export const updatebracelet = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.UPDATE_BRACELET_BY_ID, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("get>>", res.data);
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(request_update_bracelet_success(res.data.response));
                } else {
                    dispatch(request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}


export const deletebracelet = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.DELETE_BRACELET_BY_ID, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(request_delete_bracelet_success(res.data.response));
                } else if (resCode === 220) {
                    dispatch(request_delete_braceletinfo_msg(res.data.response.message));
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
        dispatch(pagerefresh(i));
    };
}

export const setdata = (i) => {
    return dispatch => {
        dispatch(setdataToredux(i));
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


export const validateform = (i) => {
    return dispatch => {
        dispatch(validate(i));
    };
}




const request_start = () => ({
    type: BraceletDetailsActionTypes.BRACELET_DETAILS_REQUEST_START
});
const request_success = (data, search_data) => ({
    type: BraceletDetailsActionTypes.BRACELET_DETAILS_REQUEST_SUCCESS,
    payload: data,
    searchInfo: search_data
});



const request_add_bracelet_success = (data) => ({
    type: BraceletDetailsActionTypes.ADD_BRACELET_DETAILS_REQUEST_SUCCESS,
    payload: data
});

const request_update_bracelet_success = (data) => ({
    type: BraceletDetailsActionTypes.UPDATE_BRACELET_DETAILS_REQUEST_SUCCESS,
    payload: data
});



const request_fail = (data) => ({
    type: BraceletDetailsActionTypes.BRACELET_DETAILS_REQUEST_FAIL,
    payload: data
});


const setdataToredux = (data) => ({
    type: BraceletDetailsActionTypes.SET_BRACELET_DETAILS,
    payload: data
});


const pagerefresh = (data) => ({

    type: BraceletDetailsActionTypes.BRACELET_DETAILS_PAGE_RESET,
    payload: data
});

const setpopuperror_msg = (data) => ({
    type: BraceletDetailsActionTypes.BRACELET_DETAILS_POPUP_BOX_ERROR_MESSAGE,
    payload: data
});


const validate = (data) => ({
    type: BraceletDetailsActionTypes.VALIDATE_BRACELET_DETAILS,
    payload: data
});


const request_delete_bracelet_success = (data) => ({
    type: BraceletDetailsActionTypes.DELETE_BRACELET_REQUEST_SUCCESS,
    payload: data
});


const request_delete_braceletinfo_msg = (data) => ({
    type: BraceletDetailsActionTypes.DELETE_BRACELET_INFO_MSG,
    payload: data
});



