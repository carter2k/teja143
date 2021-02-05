import OffendersDetailsActionTypes from '../actionTypes/OffendersDetailsActionTypes';
import axios from "axios";
import ServiceUrls from '../../helpers/ServiceUrls';
import config from '../../../config';
import { getCacheObject } from '../../helpers/globalHelpers/GlobalHelperFunctions';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;
const GOOGLE_MAP_API_KEY = config.GOOGLE_MAP_API_KEY;

export const addoffender = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.ADD_OFFENDER_BY_ID, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("get>>", res.data);
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(request_add_offenders_success(res.data.response));
                } else {
                    dispatch(request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}

export const getoffender = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.GET_OFFENDER_BY_ID, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("get>>", res.data, user['access-token']);
                let resCode = res.data.status;
                console.log("error msg", res);
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

export const getoffendersLocationHistory = (i, search) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(history_location_request_start());

        axios.post(ServiceUrls.OFFENDER_LOCATION_HISTORY, i, { headers: { "access-token": user['access-token'] } })
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

export const editoffender = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        console.log("get>>", i, ServiceUrls.EDIT_OFFENDER_BY_ID);
        axios.post(ServiceUrls.EDIT_OFFENDER_BY_ID, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("update>>", res.data, i);
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(updateOffenderDetails(res.data.response));
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

export const uploadpicfetch = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        fetch(ServiceUrls.UPLOAD_PIC,
            {
                method: 'post',
                headers: new Headers({
                    'access-token': user['access-token']
                }),
                body: i
            }).then(res => {
                console.log("pic info", res);
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


export const updatecurfewTime = (i) => {
    return dispatch => {
        dispatch(request_start());
        const user = getCacheObject(SESSION_KEY_NAME);
        axios.post(ServiceUrls.UPDATE_OFFENDER_CURFEW_TIME, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(request_update_curfew_success(res.data.response));
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
                    dispatch(setOffender_location(res.data.results[0].formatted_address));
                } else {
                    //  dispatch(request_fail("Something wrong with Map Points"));
                }

            })
            .catch(err => {
                //   dispatch(request_fail(err.message));
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
                    dispatch(setOffender_location(res.data.results[0].formatted_address));
                } else {
                    dispatch(request_fail("Something wrong with Map Points"));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}

export const deleteoffender = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.DELETE_OFFENDER_BY_ID, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(request_delete_offender_success(res.data.response));
                } else {
                    dispatch(request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}


export const getgoogleplacesFetch = (st) => {
    return dispatch => {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        let url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + st + "&types=geocode&key=" + GOOGLE_MAP_API_KEY;
        fetch(proxyurl + url)
            .then(response => {
                console.log("location>>>>>", response.json());
            })
            .then(contents => console.log(contents))
            .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
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

export const offender_page_refresh = () => {
    return dispatch => {
        dispatch(pagerefresh());
    };
}

export const setdata = (i) => {
    return dispatch => {
        dispatch(setdataToredux(i));
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

export const locationdetails = (i) => {
    return dispatch => {
        dispatch(setlocationdetails(i));
    };
}


export const errormsg = (msg) => {
    return dispatch => {
        dispatch(request_fail(msg));
    };
}
export const setdates = (i) => {
    return dispatch => {
        dispatch(set_dates(i));
    };
}



export const setpopupmsg = (msg) => {
    return dispatch => {
        dispatch(setpopuperror_msg(msg));
    };
}

export const locationHistoryClick = (data) => {
    return dispatch => {
        dispatch(location_history_click(data));
    };
}


const setgroupId = (data) => ({
    type: OffendersDetailsActionTypes.OFFENDERS_PAGE_GROUP_ID,
    payload: data
});

const request_start = () => ({
    type: OffendersDetailsActionTypes.OFFENDERS_DETAILS_REQUEST_START
});
const request_success = (data, search_data) => ({
    type: OffendersDetailsActionTypes.OFFENDERS_DETAILS_REQUEST_SUCCESS,
    payload: data,
    searchInfo: search_data
});

const request_location_history_success = (data, search_data) => ({
    type: OffendersDetailsActionTypes.OFFENDERS_LOCATION_HISTORY_REQUEST_SUCCESS,
    payload: data,
    searchInfo: search_data
});

const set_dates = (dates) => ({
    type: OffendersDetailsActionTypes.SET_OFFENDERS_LOCATION_HISTORY_FROM_TO,
    payload: dates
});


const request_delete_offender_success = (data) => ({
    type: OffendersDetailsActionTypes.DELETE_OFFENDERS_REQUEST_SUCCESS,
    payload: data
});

const request_add_offenders_success = (data) => ({
    type: OffendersDetailsActionTypes.ADD_OFFENDERS_DETAILS_REQUEST_SUCCESS,
    payload: data
});



const request_fail = (data) => ({
    type: OffendersDetailsActionTypes.OFFENDERS_DETAILS_REQUEST_FAIL,
    payload: data
});


const history_location_request_start = (data) => ({
    type: OffendersDetailsActionTypes.OFFENDERS_LOCATION_HISTORY_REQUEST_START,
    payload: data
});

const history_location_request_fail = (data) => ({
    type: OffendersDetailsActionTypes.OFFENDERS_HISTORY_LOCATIONS_REQUEST_FAIL,
    payload: data
});





const setdataToredux = (data) => ({
    type: OffendersDetailsActionTypes.SET_OFFENDER_DETAILS,
    payload: data
});


const pagerefresh = () => ({
    type: OffendersDetailsActionTypes.OFFENDERS_DETAILS_PAGE_RESET
});

const setpopuperror_msg = (data) => ({
    type: OffendersDetailsActionTypes.OFFENDERS_DETAILS_POPUP_BOX_ERROR_MESSAGE,
    payload: data
});

const setperimeter = (data) => ({
    type: OffendersDetailsActionTypes.PERIMETER_INITIALIZATION,
    payload: data
});
const onchangePerimeter_type = (data) => ({
    type: OffendersDetailsActionTypes.ONCHANGE_PERIMETER,
    payload: data
});

const setlocationdetails = (data) => ({
    type: OffendersDetailsActionTypes.SET_LOCATION,
    payload: data
});

export const nav = (i) => {
    return dispatch => {
        dispatch(setnav(i));
    };
}

const setnav = (data) => ({
    type: OffendersDetailsActionTypes.OFFENDER_SET_NAV_FROM,
    payload: data
});

const setOffender_location = (data) => ({
    type: OffendersDetailsActionTypes.SET_OFFENDER_LOCATION,
    payload: data
});

const updateOffenderDetails = (data) => ({
    type: OffendersDetailsActionTypes.UPDATE_OFFENDERS_DETAILS_REQUEST_SUCCESS,
    payload: data
});

const updateuserpicdetails = (data) => ({
    type: OffendersDetailsActionTypes.UPDATE_PIC_INFO,
    payload: data
});

const location_history_click = (data) => ({
    type: OffendersDetailsActionTypes.OFFENDERS_LOCATION_HISTORY_CLICK_TO_VIEW_INFO_BOX,
    payload: data
});
const request_update_curfew_success = (data) => ({
    type: OffendersDetailsActionTypes.UPDATE_CURFEW_TIME_REQUEST_SUCCESS,
    payload: data
});

