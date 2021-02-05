import HomePageActionTypes from '../actionTypes/HomePageActionTypes';
import homepage_dummy_data from '../../DUMMY_DATA/homepage.json';
import axios from "axios";
import config from '../../../config';
import { getCacheObject } from '../../helpers/globalHelpers/GlobalHelperFunctions';
import ServiceUrls from '../../helpers/ServiceUrls';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;
const offpercent = { voilent_offenders: 120, sex_offenders: 140, non_voilent_offenders: 200 }


export const getoverviewPercentages = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.HOME_PAGE_OVERVIEW_PERCENTAGES, {}, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(overviewPercentages(res.data.response.data));
                } else {
                    dispatch(percentage_request_fail(res.data.message));
                }

            })
            .catch(err => {
                dispatch(percentage_request_fail(err.message));
            });
    };
}

export const offender_percentage = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());

        axios.post(ServiceUrls.DASHBOARD_OFFENDERS_PERCENTAGE, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                let resCode = res.data.status;
                console.log("user info service", i, res)
                if (resCode === 200) {
                    dispatch(homepageoffenders(res.data.response.data));
                } else {
                    dispatch(homepageOffenders_request_fail(res.data.message));
                }

            })
            .catch(err => {
                dispatch(percentage_request_fail(err.message));
            });
    };
}

export const getredallevents = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.RED_EVENTS, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(allevents(res.data.response));
                } else {
                    console.log("events >>>", res.data.response);
                    dispatch(request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                console.log("events >>>", err.message);
                dispatch(request_fail(err.message));
            });
    };
}

export const offender_percentage_ns = () => {

    return dispatch => {
        dispatch(homepageoffenders(offpercent));
    };
}

export const page_refresh = () => {
    return dispatch => {
        dispatch(pagerefresh());
    };
}

export const nextpage_events = (obj) => {
    return dispatch => {
        dispatch(nextpage_events_list(homepage_dummy_data.allevents));
    };
}

export const previouspage_events = (obj) => {
    return dispatch => {
        dispatch(previouspage_events_list(homepage_dummy_data.allevents));
    };
}

export const search = (obj) => {
    return dispatch => {
        dispatch(setsearchInfo(obj));
    };
}

export const setHomePageData = (obj) => {
    return dispatch => {
        dispatch(setdata(obj));
    };
}



export const gethomepageinfo_dummy = (i) => {
    return dispatch => {
        dispatch(request_success(homepage_dummy_data));
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
    type: HomePageActionTypes.HOME_PAGE_REQUEST_START
});
const request_success = (data) => ({
    type: HomePageActionTypes.HOME_PAGE_REQUEST_SUCCESS,
    payload: data
});
const request_fail = (data) => ({
    type: HomePageActionTypes.HOME_PAGE_REQUEST_FAIL,
    payload: data
});

const percentage_request_fail = (data) => ({
    type: HomePageActionTypes.HOME_PAGE_PERCENTAGE_REQUEST_FAIL,
    payload: data
});



const allevents = (data) => ({
    type: HomePageActionTypes.ALL_EVETNS_REQUEST_SUCCESS,
    payload: data
});

const nextpage_events_list = (data) => ({
    type: HomePageActionTypes.EVENTS_PAGEINATION_NEXT_PAGE,
    payload: data
});

const previouspage_events_list = (data) => ({
    type: HomePageActionTypes.EVENTS_PAGEINATION_PREVIOUS_PAGE,
    payload: data
});

const pagerefresh = () => ({
    type: HomePageActionTypes.HOME_PAGE_RESET
});

const overviewPercentages = (data) => ({
    type: HomePageActionTypes.HOME_PAGE_OVERVIEW,
    payload: data
});

const homepageoffenders = (data) => ({
    type: HomePageActionTypes.HOME_PAGE_OFFENDERS_SUCCESS,
    payload: data
});

const homepageOffenders_request_fail = (data) => ({
    type: HomePageActionTypes.HOME_PAGE_OFFENDERS_REQUEST_FAIL,
    payload: data
});




const setpopuperror_msg = (data) => ({
    type: HomePageActionTypes.POPUP_BOX_ERROR_MESSAGE,
    payload: data
});


const setsearchInfo = (data) => ({
    type: HomePageActionTypes.SEARCH,
    payload: data,
    searchInfo: data
});

const setdata = (data) => ({
    type: HomePageActionTypes.SET_HOME_PAGE_DATA,
    payload: data
});
