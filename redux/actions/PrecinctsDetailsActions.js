import PrecinctsDetailsActionTypes from '../actionTypes/PrecinctsDetailsActionTypes';
import axios from "axios";
import ServiceUrls from '../../helpers/ServiceUrls';
import config from '../../../config';
import { getCacheObject } from '../../helpers/globalHelpers/GlobalHelperFunctions';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;

export const addprecinct = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.ADD_PRECINCT_BY_ID, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("get>>", res.data);
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(request_add_precinct_success(res.data.response));
                } else {
                    dispatch(request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}


export const editprecinct = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        console.log("get>>", i, ServiceUrls.EDIT_PRECINCT_BY_ID);
        axios.post(ServiceUrls.EDIT_PRECINCT_BY_ID, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("get>>", i, res);
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(updatePrecinctdetails(res.data.response));
                } else {
                    dispatch(request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}

export const getprecinct = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.GET_PRECINCT_BY_ID, i, { headers: { "access-token": user['access-token'] } })
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
export const set_group_id = (obj) => {
    return dispatch => {
        dispatch(setgroupId(obj));
    };
}

export const page_refresh = () => {
    return dispatch => {
        dispatch(pagerefresh());
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



const setgroupId = (data) => ({
    type: PrecinctsDetailsActionTypes.PRECINCT_PAGE_GROUP_ID,
    payload: data
});

const request_start = () => ({
    type: PrecinctsDetailsActionTypes.PRECINCT_DETAILS_REQUEST_START
});
const request_success = (data, search_data) => ({
    type: PrecinctsDetailsActionTypes.PRECINCT_DETAILS_REQUEST_SUCCESS,
    payload: data,
    searchInfo: search_data
});



const request_add_precinct_success = (data) => ({
    type: PrecinctsDetailsActionTypes.ADD_PRECINCT_DETAILS_REQUEST_SUCCESS,
    payload: data
});



const request_fail = (data) => ({
    type: PrecinctsDetailsActionTypes.PRECINCT_DETAILS_REQUEST_FAIL,
    payload: data
});


const setdataToredux = (data) => ({
    type: PrecinctsDetailsActionTypes.SET_PRECINCT_DETAILS,
    payload: data
});


const pagerefresh = () => ({
    type: PrecinctsDetailsActionTypes.PRECINCT_DETAILS_PAGE_RESET
});

const setpopuperror_msg = (data) => ({
    type: PrecinctsDetailsActionTypes.PRECINCT_DETAILS_POPUP_BOX_ERROR_MESSAGE,
    payload: data
});

const validate = (data) => ({
    type: PrecinctsDetailsActionTypes.VALIDATE_PRECINCT_DETAILS,
    payload: data
});



export const nav = (i) => {
    return dispatch => {
        dispatch(setnav(i));
    };
}

const setnav = (data) => ({
    type: PrecinctsDetailsActionTypes.PRECINCT_SET_NAV_FROM,
    payload: data
});

const updatePrecinctdetails = (data) => ({
    type: PrecinctsDetailsActionTypes.UPDATE_PRECINCT_DETAILS_REQUEST_SUCCESS,
    payload: data
});
