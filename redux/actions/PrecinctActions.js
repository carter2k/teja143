import PrecinctActionTypes from '../actionTypes/PrecinctActionTypes';
import homepage_dummy_data from '../../DUMMY_DATA/homepage.json';
import axios from "axios";
import ServiceUrls from '../../helpers/ServiceUrls';
import config from '../../../config';
import { getCacheObject } from '../../helpers/globalHelpers/GlobalHelperFunctions';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;



export const getallprecincts = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.PRECINCTS_BY_GROUP_ID, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("getSupervisors>>test>>>", res.data, i);
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

export const addprecinct = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.ADD_GROUP, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("add user response", res.data);
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(request_add_precincts_success(res.data.response));
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
    type: PrecinctActionTypes.PRECINCTS_REQUEST_START
});
const request_success = (data, search_data) => ({
    type: PrecinctActionTypes.PRECINCTS_REQUEST_SUCCESS,
    payload: data,
    searchInfo: search_data
});

const request_add_precincts_success = (data) => ({
    type: PrecinctActionTypes.ADD_PRECINCTS_REQUEST_SUCCESS,
    payload: data
});



const request_fail = (data) => ({
    type: PrecinctActionTypes.PRECINCTS_REQUEST_FAIL,
    payload: data
});


const setalphabetInfo = (data) => ({
    type: PrecinctActionTypes.SET_PRECINCTS_ALPHABET_VAL,
    payload: data
});


const pagerefresh = (data) => ({
    type: PrecinctActionTypes.PRECINCTS_PAGE_RESET
});

const setpopuperror_msg = (data) => ({
    type: PrecinctActionTypes.PRECINCTS_POPUP_BOX_ERROR_MESSAGE,
    payload: data
});
//set precincts group id
export const setprecinctsGroupId = (id) => {
    return dispatch => {
        dispatch(setPrecincts_group_id(id));
    };
}

const setPrecincts_group_id = (data) => ({
    type: PrecinctActionTypes.SET_PRECINCTS_GROUP_ID_VAL,
    payload: data
});