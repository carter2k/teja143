import LoginActionTypes from '../actionTypes/LoginActionTypes';
import axios from "axios";
import ServiceUrls from '../../helpers/ServiceUrls';
import dummy_data from '../../DUMMY_DATA/homepage.json';

export const loginUser = (user) => {
    return dispatch => {
      
        dispatch(loginrequeststarted());
        axios.post(ServiceUrls.USER_LOGIN, user)
            .then(res => {
                let resCode = res.data.code;

                if (resCode === 200) {
                    dispatch(loginrequestSuccess(res.data));
                } else {
                    dispatch(loginrequestFailure(res.data.message));
                }

            })
            .catch(err => {
                dispatch(loginrequestFailure(err.message));
            });
    };
}

export const login = (user) => {
    return dispatch => {
        dispatch(loginrequeststarted());
        axios.post(ServiceUrls.LOGIN, user)
            .then(res => {
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(loginrequestSuccess(res.data.response));
                } else {
                    dispatch(loginrequestFailure(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(loginrequestFailure(err.message));
            });
    };
}


export const resetpassword = (user) => {
    return dispatch => {
        dispatch(loginrequeststarted());
        console.log(ServiceUrls.FORGET_PASSWORD, user)
        axios.post(ServiceUrls.FORGET_PASSWORD, user)
            .then(res => {
                console.log("res.data>>", res.data)
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(resetpasswordsuccess(res.data.response));
                } else if (resCode === 220) {
                    dispatch(resetpasswordFailure(res.data.response.message));
                } else {
                    dispatch(resetpasswordFailure(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(resetpasswordFailure(err.message));
            });
    };
}

export const setdata = (i) => {
    return dispatch => {
        dispatch(setdataToredux(i));
    };
}

export const resetlogin = () => {
    return dispatch => {
        dispatch(setresetlogininfo());
    };
}



export const userdetails = (user) => {
    return dispatch => {
        dispatch(setuserdetails(user));
    };
}

export const errorlogin = (msg) => {
    return dispatch => {
        dispatch(loginrequestFailure(msg));
    };
}


export const popuperrormsg = (msg) => {
    return dispatch => {
        dispatch(setpopuperrormsg(msg));
    };
}

const setdataToredux = (data) => ({
    type: LoginActionTypes.SET_LOGIN_DETAILS,
    payload: data
});

export const resetpasswordsuccess = (data) => ({
    type: LoginActionTypes.RESET_PASSWORD_SUCCESS,
    payload: data
});

const resetpasswordFailure = (data) => ({
    type: LoginActionTypes.RESET_PASSWORD_FAIL,
    payload: data
});

export const setpopuperrormsg = (data) => ({
    type: LoginActionTypes.RESET_POPUP_ERROR_MSG,
    payload: data
});


const loginrequeststarted = () => ({
    type: LoginActionTypes.ON_LOGIN_REQUEST_START
});
const loginrequestSuccess = (data) => ({
    type: LoginActionTypes.ON_LOGIN_REQUEST_SUCCESS,
    payload: data
});

const setuserdetails = (data) => ({
    type: LoginActionTypes.SET_USER_INFO,
    payload: data
});



const loginrequestFailure = (data) => ({
    type: LoginActionTypes.ON_LOGIN_REQUEST_FAIL,
    payload: data
});

const setresetlogininfo = () => ({
    type: LoginActionTypes.RESET_PASSWORD_FAIL,
});

