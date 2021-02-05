import ResetPasswordActionTypes from '../actionTypes/ResetPasswordActionTypes';
import axios from "axios";
import ServiceUrls from '../../helpers/ServiceUrls';
import config from '../../../config';
import { getCacheObject } from '../../helpers/globalHelpers/GlobalHelperFunctions';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;


export const resetpassword = (user) => {
    return dispatch => {
        dispatch(requeststarted());
        axios.post(ServiceUrls.RESET_PASSWORD, user)
            .then(res => {
                console.log("res>>", res.data)
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(resetpasswordsuccess(res.data.response));
                } else {
                    dispatch(resetpasswordFailure(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(resetpasswordFailure(err.message));
            });
    };
}


export const userresetpassword = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(requeststarted());
        axios.post(ServiceUrls.RESET_PASSWORD_BY_USER, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(resetpasswordsuccess(res.data.response));
                } else {
                    dispatch(setpopuperrormsg(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(setpopuperrormsg(err.message));
            });
    };
}

export const setdata = (i) => {
    return dispatch => {
        dispatch(setdataToredux(i));
    };
}

export const cleardata = () => {
    return dispatch => {
        dispatch(clearalldata());
    };
}

export const popuperrormsg = (msg) => {
    return dispatch => {
        dispatch(setpopuperrormsg(msg));
    };
}


export const errormsg = (msg) => {

    return dispatch => {
        dispatch(seterrormsg(msg));
    };
}

const requeststarted = (data) => ({
    type: ResetPasswordActionTypes.ON_RESET_PASSWORD_REQUEST_START,
    payload: data
});

const setdataToredux = (data) => ({
    type: ResetPasswordActionTypes.SET_RESET_PASSWORD_DETAILS,
    payload: data
});

const resetpasswordsuccess = (data) => ({
    type: ResetPasswordActionTypes.ON_RESET_PASSWORD_REQUEST_SUCCESS,
    payload: data
});

const resetpasswordFailure = (data) => ({
    type: ResetPasswordActionTypes.ON_RESET_PASSWORD_REQUEST_FAIL,
    payload: data
});

const seterrormsg = (data) => ({
    type: ResetPasswordActionTypes.RESET_PASSWORD_ERROR_MSG,
    payload: data
});

const setpopuperrormsg = (data) => ({
    type: ResetPasswordActionTypes.RESET_PASSWORD_POPUP_ERROR_MSG,
    payload: data
});
const clearalldata = (data) => ({
    type: ResetPasswordActionTypes.ON_RESET_PASSWORD_FORM_CLEAR,
    payload: data
});




