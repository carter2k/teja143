import HomePageActionTypes from '../actionTypes/HomePageActionTypes';
import homepage_dummy_data from '../../DUMMY_DATA/homepage.json';
import axios from "axios";
import ServiceUrls from '../../helpers/ServiceUrls';


export const getallsettings = (i) => {
    return dispatch => {
        dispatch(request_start());
        dispatch(allevents(homepage_dummy_data.allevents));
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

const setsearchInfo = (data) => ({
    type: HomePageActionTypes.SEARCH,
    payload: data,
    searchInfo: data
});
