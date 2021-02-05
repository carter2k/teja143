import GroupDetailsActionTypes from '../actionTypes/GroupDetailsActionTypes';
import dummy_data from '../../DUMMY_DATA/homepage.json';
import axios from "axios";
import ServiceUrls from '../../helpers/ServiceUrls';
import config from '../../../config';
import { getCacheObject } from '../../helpers/globalHelpers/GlobalHelperFunctions';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;

export const getgroupdetails = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.GROUP_DETAILS, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("group details", res.data)
                let resCode = res.data.status;
                if (resCode === 200 && res.data.response.data) {
                    dispatch(request_success(res.data.response.data, i));
                } else {
                    dispatch(request_fail("Something went wrong."));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}


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
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(addgroup_request(res.data.response));
                } else {
                    dispatch(addgroup_request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(addgroup_request_fail(err.message));
            });
    };
}

export const editgroup = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        console.log("add user", i);
        axios.post(ServiceUrls.EDIT_GROUP, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("edit group", res);
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(update_group_request(res.data.response));
                } else {
                    dispatch(addgroup_request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(addgroup_request_fail(err.message));
            });
    };
}


export const deletegroup = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());

        axios.post(ServiceUrls.DELETE_GROUP_BY_ID, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log(ServiceUrls.DELETE_GROUP_BY_ID, i, res.data)
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(request_delete_group_success(res.data.response));
                } else if (resCode === 220) {
                    dispatch(request_delete_info_msg(res.data.response.message));
                } else {
                    dispatch(request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}

export const search = (obj) => {
    return dispatch => {
        dispatch(setsearchInfo(obj));
    };
}

export const set_group_id = (obj) => {
    return dispatch => {
        dispatch(setgroupId(obj));
    };
}


export const activetab = (obj) => {
    return dispatch => {
        dispatch(setactivetab(obj));
    };
}

export const errormsg = (msg) => {
    return dispatch => {
        dispatch(request_fail(msg));
    };
}
export const clearGroupFormFields = () => {
    return dispatch => {
        dispatch(clearFields());
    };
}

export const setdata = (i) => {
    return dispatch => {
        dispatch(setdataToredux(i));
    };
}
export const setpopupmsg = (msg) => {
    return dispatch => {
        dispatch(setpopuperror_msg(msg));
    };
}

export const reloadGroupdetails = () => {
    return dispatch => {
        dispatch(reload_group_details());
    };
}


const request_delete_group_success = (data) => ({
    type: GroupDetailsActionTypes.DELETE_GROUP_REQUEST_SUCCESS,
    payload: data
});

const request_start = () => ({
    type: GroupDetailsActionTypes.GROUP_DETAILS_REQUEST_START
});
const request_success = (data) => ({
    type: GroupDetailsActionTypes.GROUP_DETAILS_REQUEST_SUCCESS,
    payload: data
});
const request_fail = (data) => ({
    type: GroupDetailsActionTypes.GROUP_DETAILS_REQUEST_FAIL,
    payload: data
});

const request_delete_info_msg = (data) => ({
    type: GroupDetailsActionTypes.DELETE_GROUP_INFO_MSG,
    payload: data
});






const setsearchInfo = (data) => ({
    type: GroupDetailsActionTypes.GROUP_DETAILS_SEARCH,
    payload: data,
    searchInfo: data
});


const setgroupId = (data) => ({
    type: GroupDetailsActionTypes.GROUP_DETAILS_ID,
    payload: data
});

const setactivetab = (data) => ({
    type: GroupDetailsActionTypes.ACTIVE_TAB,
    payload: data
});

const addgroup_request = (data) => ({
    type: GroupDetailsActionTypes.ADD_GROUP_DETAILS_REQUEST_SUCCESS,
    payload: data
});

const update_group_request = (data) => ({
    type: GroupDetailsActionTypes.UPDATE_GROUP_DETAILS_REQUEST_SUCCESS,
    payload: data
});



const addgroup_request_fail = (data) => ({
    type: GroupDetailsActionTypes.ADD_GROUP_DETAILS_REQUEST_FAIL,
    payload: data
});
const clearFields = () => ({
    type: GroupDetailsActionTypes.EMPTY_FIELDS_ON_LOAD,
});

const setdataToredux = (data) => ({
    type: GroupDetailsActionTypes.SET_GROUP_FORM_DETAILS,
    payload: data
});

const setpopuperror_msg = (data) => ({
    type: GroupDetailsActionTypes.GROUP_EDIT_CREATE_POPUP_BOX_ERROR_MESSAGE,
    payload: data
});

const reload_group_details = () => ({
    type: GroupDetailsActionTypes.RELOAD_GROUP_DETAILS
});

