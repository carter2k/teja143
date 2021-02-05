import ValidationActionTypes from '../actionTypes/ValidationActionTypes';
import axios from "axios";
import ServiceUrls from '../../helpers/ServiceUrls';
import config from '../../../config';
import { getCacheObject } from '../../helpers/globalHelpers/GlobalHelperFunctions';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;


export const checkUserNameExist = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        let data = { username: i.value };
        axios.post(ServiceUrls.CHECK_CLIENT_USERNAME_EXIST, data, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("get>>", res.data);
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(checkuserExist(i, res.data.response.message, resCode, 1)); //1==> username
                } else if (resCode === 400) {
                    dispatch(checkuserExist(i, res.data.response.message, resCode, 1));
                } else {
                    dispatch(request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}

export const checkPhoneNumberExist = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        let data = { mobile: i.value };
        axios.post(ServiceUrls.CHECK_CLIENT_PHONE_NO_EXIST, data, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("get>>", res.data);
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(checkuserExist(i, res.data.response.message, resCode, 2)); //1==> username
                } else if (resCode === 400) {
                    dispatch(checkuserExist(i, res.data.response.message, resCode, 2));
                } else {
                    dispatch(request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}

export const checkVictimPhoneNumberExist = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        let data = { mobile: i.value };
        axios.post(ServiceUrls.CHECK_CLIENT_PHONE_NO_EXIST, data, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(checkVictimExist(res.data.response.message)); //1==> username
                } else if (resCode === 400) {
                    dispatch(checkVictimExist(res.data.response.message));
                } else {
                    dispatch(request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}

export const checkEmailExist = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        let data = { email: i.value };
        axios.post(ServiceUrls.CHECK_CLIENT_EMAIL_EXIST, data, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("get>>", res.data);
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(checkuserExist(i, res.data.response.message, resCode, 3)); //1==> username
                } else if (resCode === 400) {
                    dispatch(checkuserExist(i, res.data.response.message, resCode, 3));
                } else {
                    dispatch(request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}

export const checkBraceletExist = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        let data = { device_slno: i.value };
        axios.post(ServiceUrls.CHECK_BRACELET_DUPLICATE, data, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("get>>", res.data);
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(setdataTobraceletmsg(res.data.response.message)); //1==> username
                } else if (resCode === 400) {
                    dispatch(setdataTobraceletmsg(res.data.response.message));
                } else {
                    dispatch(request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}

export const setvalidationemaildata = (i) => {
    return dispatch => {
        dispatch(setdataToemailmsg(i));
    };
}

export const setvalidationbraceletdata = (i) => {
    return dispatch => {
        dispatch(setdataTobraceletmsg(i));
    };
}

export const setvalidationphonedata = (i) => {
    return dispatch => {
        dispatch(setdataTophonemsg(i));
    };
}

export const resetvalidatedata = () => {
    return dispatch => {
        dispatch(reset_data());
    };
}


const checkuserExist = (i, data, code, errtype) => ({
    type: ValidationActionTypes.VALIDATION_REQUEST_SUCCESS,
    i: i,
    payload: data,
    code: code,
    errtype: errtype

});


export const checkVictimExist = (data) => ({
    type: ValidationActionTypes.VALIDATION_VICTIM_REQUEST_SUCCESS,
    payload: data,

});


const request_fail = (data) => ({
    type: ValidationActionTypes.VALIDATION_REQUEST_FAIL,
    payload: data
});

const setdataToemailmsg = (data) => ({
    type: ValidationActionTypes.SET_VALIDATION_EMAIL_DATA,
    payload: data,
});
export const setdataTobraceletmsg = (data) => ({
    type: ValidationActionTypes.SET_VALIDATION_BRACELET_DATA,
    payload: data,
});


const setdataTophonemsg = (data) => ({
    type: ValidationActionTypes.SET_VALIDATION_PHONE_DATA,
    payload: data,
});

const reset_data = () => ({
    type: ValidationActionTypes.RESET_VALIDATION_DATA,

});




