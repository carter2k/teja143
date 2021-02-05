import GroupsActionTypes from '../actionTypes/GroupsActionTypes';
import homepage_dummy_data from '../../DUMMY_DATA/homepage.json';
import axios from "axios";
import ServiceUrls from '../../helpers/ServiceUrls';
import config from '../../../config';
import { getCacheObject } from '../../helpers/globalHelpers/GlobalHelperFunctions';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;



export const getallgroups = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.ALL_GROUPS, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("request>>>>" + ServiceUrls.ALL_GROUPS, user, res);
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

export const addgroup = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        console.log("add user", i);
        axios.post(ServiceUrls.ADD_GROUP, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("add user response", res.data);
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(request_add_group_success(res.data.response));
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
    type: GroupsActionTypes.GROUPS_REQUEST_START
});
const request_success = (data, search_data) => ({
    type: GroupsActionTypes.GROUPS_REQUEST_SUCCESS,
    payload: data,
    searchInfo: search_data
});

const request_add_group_success = (data) => ({
    type: GroupsActionTypes.ADD_GROUPS_REQUEST_SUCCESS,
    payload: data
});



const request_fail = (data) => ({
    type: GroupsActionTypes.GROUPS_REQUEST_FAIL,
    payload: data
});


const setalphabetInfo = (data) => ({
    type: GroupsActionTypes.SET_GROUP_ALPHABET_VAL,
    payload: data
});
const pagerefresh = (data) => ({
    type: GroupsActionTypes.PAGE_RESET_GROUP
});

const setpopuperror_msg = (data) => ({
    type: GroupsActionTypes.POPUP_BOX_ERROR_MESSAGE,
    payload: data
});