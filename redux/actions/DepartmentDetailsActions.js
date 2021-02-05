import DepartmentDetailsActionTypes from '../actionTypes/DepartmentDetailsActionTypes';
import dummy_data from '../../DUMMY_DATA/homepage.json';
import axios from "axios";
import ServiceUrls from '../../helpers/ServiceUrls';
import config from '../../../config';
import { getCacheObject } from '../../helpers/globalHelpers/GlobalHelperFunctions';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;

export const getdepartmentdetails = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.DEPARTMENT_DETAILS, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("department details", res.data)
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


export const getalldepartments = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.ALL_DEPARTMENTS, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("request>>>>" + ServiceUrls.ALL_DEPARTMENTS, user, res);
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

export const adddepartment = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        console.log("add user", i);
        axios.post(ServiceUrls.ADD_DEPARTMENT, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(adddepartment_request(res.data.response));
                } else {
                    dispatch(adddepartment_request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(adddepartment_request_fail(err.message));
            });
    };
}

export const editdepartment = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        console.log("add user", i);
        axios.post(ServiceUrls.EDIT_DEPARTMENT, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("edit department", res);
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(update_department_request(res.data.response));
                } else {
                    dispatch(adddepartment_request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(adddepartment_request_fail(err.message));
            });
    };
}


export const deletedepartment = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());

        axios.post(ServiceUrls.DELETE_DEPARTMENT_BY_ID, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log(ServiceUrls.DELETE_DEPARTMENT_BY_ID, i, res.data)
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(request_delete_department_success(res.data.response));//change
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

export const set_department_id = (obj) => {
    return dispatch => {
        dispatch(setdepartmentId(obj));
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
export const clearDepartmentFormFields = () => {
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

export const reloadDepartmentdetails = () => {
    return dispatch => {
        dispatch(reload_department_details());
    };
}


const request_delete_department_success = (data) => ({
    type: DepartmentDetailsActionTypes.DELETE_DEPARTMENT_REQUEST_SUCCESS,
    payload: data
});

const request_start = () => ({
    type: DepartmentDetailsActionTypes.DEPARTMENT_DETAILS_REQUEST_START
});
const request_success = (data) => ({
    type: DepartmentDetailsActionTypes.DEPARTMENT_DETAILS_REQUEST_SUCCESS,
    payload: data
});
const request_fail = (data) => ({
    type: DepartmentDetailsActionTypes.DEPARTMENT_DETAILS_REQUEST_FAIL,
    payload: data
});

const request_delete_info_msg = (data) => ({
    type: DepartmentDetailsActionTypes.DELETE_DEPARTMENT_INFO_MSG,
    payload: data
});






const setsearchInfo = (data) => ({
    type: DepartmentDetailsActionTypes.DEPARTMENT_DETAILS_SEARCH,
    payload: data,
    searchInfo: data
});


const setdepartmentId = (data) => ({
    type: DepartmentDetailsActionTypes.DEPARTMENT_DETAILS_ID,
    payload: data
});

const setactivetab = (data) => ({
    type: DepartmentDetailsActionTypes.ACTIVE_TAB,
    payload: data
});

const adddepartment_request = (data) => ({
    type: DepartmentDetailsActionTypes.ADD_DEPARTMENT_DETAILS_REQUEST_SUCCESS,
    payload: data
});

const update_department_request = (data) => ({
    type: DepartmentDetailsActionTypes.UPDATE_DEPARTMENT_DETAILS_REQUEST_SUCCESS,
    payload: data
});



const adddepartment_request_fail = (data) => ({
    type: DepartmentDetailsActionTypes.ADD_DEPARTMENT_DETAILS_REQUEST_FAIL,
    payload: data
});
const clearFields = () => ({
    type: DepartmentDetailsActionTypes.EMPTY_FIELDS_ON_LOAD,
});

const setdataToredux = (data) => ({
    type: DepartmentDetailsActionTypes.SET_DEPARTMENT_FORM_DETAILS,
    payload: data
});

const setpopuperror_msg = (data) => ({
    type: DepartmentDetailsActionTypes.DEPARTMENT_EDIT_CREATE_POPUP_BOX_ERROR_MESSAGE,
    payload: data
});

const reload_department_details = () => ({
    type: DepartmentDetailsActionTypes.RELOAD_DEPARTMENT_DETAILS
});

