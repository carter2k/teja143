import ClientDetailsActionTypes from '../actionTypes/ClientDetailsActionTypes';
import axios from "axios";
import ServiceUrls from '../../helpers/ServiceUrls';
import config from '../../../config';
import { getCacheObject } from '../../helpers/globalHelpers/GlobalHelperFunctions';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;

export const addclient = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.ADD_CLIENT_BY_ID, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("get>>", res.data);
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(request_add_client_success(res.data.response));
                } else {
                    dispatch(request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}

export const getclient = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.GET_CLIENT_BY_ID, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("get>>", res.data);
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

export const updateclient = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.UPDATE_CLIENT_BY_ID, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("get>>", res.data);
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(request_update_client_success(res.data.response));
                } else {
                    dispatch(request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}


export const resetClientPassword = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.UPDATE_CLIENT_USER_PASSWORD, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("get>>", res.data);
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(request_reset_password_success(res.data.response));
                } else {
                    dispatch(request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}

export const deleteclient = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        console.log(ServiceUrls.DELETE_CLIENT_BY_ID, i, user['access-token'])
        axios.post(ServiceUrls.DELETE_CLIENT_BY_ID, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("res", res);
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(request_delete_client_success(res.data.response));
                } else {
                    dispatch(request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}

export const checkclientUserNameExist = (i) => {
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

export const checkclientPhoneNumberExist = (i) => {
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

export const checkclientEmailExist = (i) => {
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



export const setEditClientPasswordUser = (i) => {
    return dispatch => {
        dispatch(EditClientPasswordUser(i));
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

export const setClientUsers = (i) => {
    return dispatch => {
        dispatch(setclientusers(i));
    };
}
export const addMoreUsers = () => {
    return dispatch => {
        dispatch(addmoreUsers());
    };
}

const request_delete_client_success = (data) => ({
    type: ClientDetailsActionTypes.DELETE_CLIENT_REQUEST_SUCCESS,
    payload: data
});

const request_start = () => ({
    type: ClientDetailsActionTypes.CLIENT_DETAILS_REQUEST_START
});
const request_success = (data, search_data) => ({
    type: ClientDetailsActionTypes.CLIENT_DETAILS_REQUEST_SUCCESS,
    payload: data,
    searchInfo: search_data
});



const request_add_client_success = (data) => ({
    type: ClientDetailsActionTypes.ADD_CLIENT_DETAILS_REQUEST_SUCCESS,
    payload: data
});



const request_fail = (data) => ({
    type: ClientDetailsActionTypes.CLIENT_DETAILS_REQUEST_FAIL,
    payload: data
});



const setdataToredux = (data) => ({
    type: ClientDetailsActionTypes.SET_CLIENT_DETAILS,
    payload: data
});


const pagerefresh = (data) => ({
    type: ClientDetailsActionTypes.CLIENT_DETAILS_PAGE_RESET,
    payload: data
});

const setpopuperror_msg = (data) => ({
    type: ClientDetailsActionTypes.CLIENT_DETAILS_POPUP_BOX_ERROR_MESSAGE,
    payload: data
});

const validate = (data) => ({
    type: ClientDetailsActionTypes.VALIDATE_CLIENT_DETAILS,
    payload: data
});

const setclientusers = (data) => ({
    type: ClientDetailsActionTypes.SET_CLIENT_USERS_DETAILS,
    payload: data,
});

const addmoreUsers = () => ({
    type: ClientDetailsActionTypes.ADD_MORE_USERS
});

const request_update_client_success = (data) => ({
    type: ClientDetailsActionTypes.UPDATE_CLIENT_DETAILS_REQUEST_SUCCESS,
    payload: data
});

const request_reset_password_success = (data) => ({
    type: ClientDetailsActionTypes.UPDATE_CLIENT_USER_PASSWORD,
    payload: data
});

const EditClientPasswordUser = (data) => ({
    type: ClientDetailsActionTypes.EDIT_PASSWORD_USER,
    payload: data
});


const checkuserExist = (data, msg, code, errtype) => ({
    type: ClientDetailsActionTypes.CLIENT_USERNAME_EXIST,
    payload: data,
    msg: msg,
    code: code,
    errtype: errtype

});






