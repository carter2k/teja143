import EventsActionTypes from '../actionTypes/EventsActionTypes';
import axios from "axios";
import ServiceUrls from '../../helpers/ServiceUrls';
import config from '../../../config';
import { getCacheObject } from '../../helpers/globalHelpers/GlobalHelperFunctions';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;

export const getallevents = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        console.log("get events>>request", i);
        axios.post(ServiceUrls.EVENTS, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {

                console.log("get events>>response", res.data);
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

export const addevent = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.ADD_GROUP, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(request_add_events_success(res.data.response));
                } else {
                    dispatch(request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}

export const geteventstypes = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.GET_EVENT_TYPES, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("res>>>", res);
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(request_get_events(res.data.response.data));
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

export const events_page_refresh = () => {
    return dispatch => {
        dispatch(pagerefresh());
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
export const setdateval = (d) => {
    return dispatch => {
        dispatch(setdate(d));
    };
}

export const setEventType = (obj) => {
    return dispatch => {
        dispatch(setEvent(obj));
    };
}


const request_start = () => ({
    type: EventsActionTypes.EVENTS_REQUEST_START
});
const request_success = (data, search_data) => ({
    type: EventsActionTypes.EVENTS_REQUEST_SUCCESS,
    payload: data,
    searchInfo: search_data
});

const request_add_events_success = (data) => ({
    type: EventsActionTypes.ADD_EVENTS_REQUEST_SUCCESS,
    payload: data
});


const request_get_events = (data) => ({
    type: EventsActionTypes.EVENTS_TYPES_SUCCESS,
    payload: data
});



const request_fail = (data) => ({
    type: EventsActionTypes.EVENTS_REQUEST_FAIL,
    payload: data
});


const setalphabetInfo = (data) => ({
    type: EventsActionTypes.SET_EVENTS_ALPHABET_VAL,
    payload: data
});


const pagerefresh = () => ({
    type: EventsActionTypes.EVENTS_PAGE_RESET
});

const setpopuperror_msg = (data) => ({
    type: EventsActionTypes.EVENTS_POPUP_BOX_ERROR_MESSAGE,
    payload: data
});
const setsearchInfo = (data) => ({
    type: EventsActionTypes.EVENT_SEARCH,
    searchInfo: data
});
const setdate = (data) => ({
    type: EventsActionTypes.SET_CURRENT_DATE,
    payload: data
});
const setEvent = (data) => ({
    type: EventsActionTypes.SET_EVENT_TYPE,
    payload: data
});

