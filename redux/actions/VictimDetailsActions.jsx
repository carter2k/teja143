import VictimsDetailsActionTypes from '../actionTypes/VictimsDetailsActionTypes';
import axios from "axios";
import ServiceUrls from '../../helpers/ServiceUrls';
import config from '../../../config';
import { getCacheObject } from '../../helpers/globalHelpers/GlobalHelperFunctions';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;
const GOOGLE_MAP_API_KEY = config.GOOGLE_MAP_API_KEY;


export const addvictim = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.ADD_VICTIM, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("get>>", res.data);
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(request_add_victim_success(res.data.response));
                } else {
                    dispatch(request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}

export const deletevictim = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.DELETE_VICTIM_BY_ID, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(request_delete_victim_success(res.data.response));
                } else if (resCode === 220) {
                    dispatch(request_delete_victiminfo_msg(res.data.response.message));
                } else {
                    dispatch(request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}


export const editvictim = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        console.log("get>>", i, ServiceUrls.EDIT_VICTIM_BY_ID);
        axios.post(ServiceUrls.EDIT_VICTIM_BY_ID, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {

                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(updateVictim(res.data.response));
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



export const getvictim = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.GET_VICTIM_BY_ID, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("get>>", res.data, user['access-token']);
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(request_success(res.data.response));
                } else {
                    dispatch(request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}


export const getgoogleaddress = (lat, lng) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        // dispatch(request_start());
        //var i = { lat: 40.714224, lng: -73.961452 };
        let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=" + GOOGLE_MAP_API_KEY;
        axios.get(url)
            .then(res => {
                if (res && res.data && res.data.results[0] && res.data.results[0].formatted_address) {
                    dispatch(setVictim_location(res.data.results[0].formatted_address));
                } else {
                    //  dispatch(request_fail("Something wrong with Map Points"));
                }

            })
            .catch(err => {
                //   dispatch(request_fail(err.message));
            });
    };
}


export const getvictimsLocationHistory = (i, search) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(history_location_request_start());

        axios.post(ServiceUrls.VICTIM_LOCATION_HISTORY, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("get history>>", res.data, i);
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(request_location_history_success(res.data.response.data, search));
                } else {
                    dispatch(history_location_request_fail(res.data.response.message));
                }

            })
            .catch(err => {

                dispatch(request_fail(err.message));
            });
    };
}

export const getgoogleplaces = (st) => {
    return dispatch => {
        let url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + st + "&types=geocode&key=" + GOOGLE_MAP_API_KEY;
        axios.get(url)
            .then(res => {
                console.log("location>>>>>", res);
                if (res && res.data && res.data.results[0] && res.data.results[0].formatted_address) {
                    dispatch(setVictim_location(res.data.results[0].formatted_address));
                } else {
                    dispatch(request_fail("Something wrong with Map Points"));
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

export const setdates = (i) => {
    return dispatch => {
        dispatch(set_dates(i));
    };
}
export const setvictimdata = (i) => {
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

export const setPerimeter = (i) => {
    return dispatch => {
        dispatch(setperimeter(i));
    };
}

export const onchangePerimeterType = (i) => {
    return dispatch => {
        dispatch(onchangePerimeter_type(i));
    };
}

export const victimLocationdetails = (i) => {
    return dispatch => {
        dispatch(setlocationdetails(i));
    };
}

const setperimeter = (data) => ({
    type: VictimsDetailsActionTypes.VICTIM_PERIMETER_INITIALIZATION,
    payload: data
});
const onchangePerimeter_type = (data) => ({
    type: VictimsDetailsActionTypes.VICTIM_ONCHANGE_PERIMETER,
    payload: data
});
const setVictim_location = (data) => ({
    type: VictimsDetailsActionTypes.SET_VICTIM_LOCATION,
    payload: data
});
const setlocationdetails = (data) => ({
    type: VictimsDetailsActionTypes.VICTIM_SET_LOCATION,
    payload: data
});


const setgroupId = (data) => ({
    type: VictimsDetailsActionTypes.VICTIM_PAGE_GROUP_ID,
    payload: data
});

const request_start = () => ({
    type: VictimsDetailsActionTypes.VICTIM_DETAILS_REQUEST_START
});
const request_success = (data) => ({
    type: VictimsDetailsActionTypes.VICTIM_DETAILS_REQUEST_SUCCESS,
    payload: data
});

const request_location_history_success = (data, search_data) => ({
    type: VictimsDetailsActionTypes.VICTIMS_LOCATION_HISTORY_REQUEST_SUCCESS,
    payload: data,
    searchInfo: search_data
});
const history_location_request_start = (data) => ({
    type: VictimsDetailsActionTypes.VICTIMS_LOCATION_HISTORY_REQUEST_START,
    payload: data
});

const request_add_victim_success = (data) => ({
    type: VictimsDetailsActionTypes.ADD_VICTIM_DETAILS_REQUEST_SUCCESS,
    payload: data
});

const set_dates = (dates) => ({
    type: VictimsDetailsActionTypes.SET_VICTIMS_LOCATION_HISTORY_FROM_TO,
    payload: dates
});

const history_location_request_fail = (data) => ({
    type: VictimsDetailsActionTypes.VICTIMS_HISTORY_LOCATIONS_REQUEST_FAIL,
    payload: data
});
const request_delete_victim_success = (data) => ({
    type: VictimsDetailsActionTypes.DELETE_VICTIM_REQUEST_SUCCESS,
    payload: data
});



const request_fail = (data) => ({
    type: VictimsDetailsActionTypes.VICTIM_DETAILS_REQUEST_FAIL,
    payload: data
});


const setdataToredux = (data) => ({
    type: VictimsDetailsActionTypes.SET_VICTIM_DETAILS,
    payload: data
});


const pagerefresh = () => ({
    type: VictimsDetailsActionTypes.VICTIM_DETAILS_PAGE_RESET
});

const setpopuperror_msg = (data) => ({
    type: VictimsDetailsActionTypes.VICTIM_DETAILS_POPUP_BOX_ERROR_MESSAGE,
    payload: data
});

const validate = (data) => ({
    type: VictimsDetailsActionTypes.VALIDATE_VICTIM_DETAILS,
    payload: data
});


export const nav = (i) => {
    return dispatch => {
        dispatch(setnav(i));
    };
}

const setnav = (data) => ({
    type: VictimsDetailsActionTypes.VICTIM_SET_NAV_FROM,
    payload: data
});


const updateVictim = (data) => ({
    type: VictimsDetailsActionTypes.UPDATE_VICTIM_DETAILS_REQUEST_SUCCESS,
    payload: data
});
export const refresh_victim = () => {
    return dispatch => {
        dispatch(pagerefresh());
    };
}
const request_delete_victiminfo_msg = (data) => ({
    type: VictimsDetailsActionTypes.DELETE_VICTIM_INFO_MSG,
    payload: data
});
const updateuserpicdetails = (data) => ({
    type: VictimsDetailsActionTypes.UPDATE_SUPERVISOR_PIC_INFO,
    payload: data
});
