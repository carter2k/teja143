import SupervisorDetailsActionTypes from '../actionTypes/SupervisorDetailsActionTypes';
import axios from "axios";
import ServiceUrls from '../../helpers/ServiceUrls';
import config from '../../../config';
import { getCacheObject } from '../../helpers/globalHelpers/GlobalHelperFunctions';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;


export const addsupervisor = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        console.log("get>>", ServiceUrls.ADD_SUPERVISOR_BY_ID, user['access-token']);
        axios.post(ServiceUrls.ADD_SUPERVISOR_BY_ID, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("get>>", res.data);
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(request_add_supervisor_success(res.data.response));
                } else {
                    dispatch(request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}

export const deletesupervisor = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.DELETE_SUPERVISOR_BY_ID, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(request_delete_supervisor_success(res.data.response));
                } else if (resCode === 220) {
                    dispatch(request_delete_supervisorinfo_msg(res.data.response.message));
                } else {
                    dispatch(request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}

export const reassign_supervisorService = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.RE_ASSIGN_SUPERVISOR_TO_OFFENDER, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(request_reassign_supervisor_success(res.data.response));
                } else if (resCode === 220) {
                    dispatch(request_delete_supervisorinfo_msg(res.data.response.message));
                } else {
                    dispatch(request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}



export const editsupervisor = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        console.log("get>>", i, ServiceUrls.EDIT_SUPERVISOR_BY_ID);
        axios.post(ServiceUrls.EDIT_SUPERVISOR_BY_ID, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {

                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(updateSpervisor(res.data.response));
                } else {
                    dispatch(request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}

export const getsupervisor = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.GET_SUPERVISOR_BY_ID, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("get>>", res.data, user['access-token']);
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(request_success(res.data.response.data));
                } else {
                    dispatch(request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}

export const uploadpic = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.UPLOAD_PIC, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(updateuserpicdetails(res.data.response));
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

export const refresh_supervisor = () => {
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

export const reassignSupervisor = (i) => {
    return dispatch => {
        dispatch(reassign_supervisor(i));
    };
}





const setgroupId = (data) => ({
    type: SupervisorDetailsActionTypes.SUPERVISOR_PAGE_GROUP_ID,
    payload: data
});

const request_start = () => ({
    type: SupervisorDetailsActionTypes.SUPERVISOR_DETAILS_REQUEST_START
});
const request_success = (data) => ({
    type: SupervisorDetailsActionTypes.SUPERVISOR_DETAILS_REQUEST_SUCCESS,
    payload: data
});



const request_add_supervisor_success = (data) => ({
    type: SupervisorDetailsActionTypes.ADD_SUPERVISOR_DETAILS_REQUEST_SUCCESS,
    payload: data
});


const request_delete_supervisor_success = (data) => ({
    type: SupervisorDetailsActionTypes.DELETE_SUPERVISOR_REQUEST_SUCCESS,
    payload: data
});



const request_fail = (data) => ({
    type: SupervisorDetailsActionTypes.SUPERVISOR_DETAILS_REQUEST_FAIL,
    payload: data
});


const setdataToredux = (data) => ({
    type: SupervisorDetailsActionTypes.SET_SUPERVISOR_DETAILS,
    payload: data
});


const pagerefresh = () => ({
    type: SupervisorDetailsActionTypes.SUPERVISOR_DETAILS_PAGE_RESET
});

const setpopuperror_msg = (data) => ({
    type: SupervisorDetailsActionTypes.SUPERVISOR_DETAILS_POPUP_BOX_ERROR_MESSAGE,
    payload: data
});

const validate = (data) => ({
    type: SupervisorDetailsActionTypes.VALIDATE_SUPERVISOR_DETAILS,
    payload: data
});


export const nav = (i) => {
    return dispatch => {
        dispatch(setnav(i));
    };
}

const setnav = (data) => ({
    type: SupervisorDetailsActionTypes.SUPERVISOR_SET_NAV_FROM,
    payload: data
});


const updateSpervisor = (data) => ({
    type: SupervisorDetailsActionTypes.UPDATE_SUPERVISOR_DETAILS_REQUEST_SUCCESS,
    payload: data
});

const request_delete_supervisorinfo_msg = (data) => ({
    type: SupervisorDetailsActionTypes.DELETE_SUPERVISOR_INFO_MSG,
    payload: data
});

const request_reassign_supervisor_success = (data) => ({
    type: SupervisorDetailsActionTypes.RE_ASSIGN_SUPERVISOR_SUCCESS,
    payload: data
});

const reassign_supervisor = (data) => ({
    type: SupervisorDetailsActionTypes.RE_ASSIGN_SUPERVISOR,
    payload: data
});
const updateuserpicdetails = (data) => ({
    type: SupervisorDetailsActionTypes.UPDATE_SUPERVISOR_PIC_INFO,
    payload: data
});


