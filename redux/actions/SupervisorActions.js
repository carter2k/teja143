import SupervisorActionTypes from '../actionTypes/SupervisorActionTypes';
import homepage_dummy_data from '../../DUMMY_DATA/homepage.json';
import axios from "axios";
import ServiceUrls from '../../helpers/ServiceUrls';
import config from '../../../config';
import { getCacheObject } from '../../helpers/globalHelpers/GlobalHelperFunctions';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;


export const getallsupervisors = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.SUPERVISORS_BY_GROUP_ID, i, { headers: { "access-token": user['access-token'] } })
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

export const addsupervisor = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.ADD_GROUP, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("add user response", res.data);
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(request_add_supervisors_success(res.data.response));
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
    type: SupervisorActionTypes.SUPERVISORS_REQUEST_START
});
const request_success = (data, search_data) => ({
    type: SupervisorActionTypes.SUPERVISORS_REQUEST_SUCCESS,
    payload: data,
    searchInfo: search_data
});

const request_add_supervisors_success = (data) => ({
    type: SupervisorActionTypes.ADD_SUPERVISORS_REQUEST_SUCCESS,
    payload: data
});



const request_fail = (data) => ({
    type: SupervisorActionTypes.SUPERVISORS_REQUEST_FAIL,
    payload: data
});


const setalphabetInfo = (data) => ({
    type: SupervisorActionTypes.SET_SUPERVISORS_ALPHABET_VAL,
    payload: data
});

const pagerefresh = (data) => ({
    type: SupervisorActionTypes.SUPERVISORS_PAGE_RESET
});

const setpopuperror_msg = (data) => ({
    type: SupervisorActionTypes.SUPERVISORS_POPUP_BOX_ERROR_MESSAGE,
    payload: data
});
//set supervisor group id
export const setsupervisorGroupId = (id) => {
    return dispatch => {
        dispatch(setSupervisor_group_id(id));
    };
}

const setSupervisor_group_id = (data) => ({
    type: SupervisorActionTypes.SET_SUPERVISORS_GROUP_ID_VAL,
    payload: data
});