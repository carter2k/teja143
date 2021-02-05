import EditHomeScreenActionTypes from '../actionTypes/EditHomeScreenActionTypes';
import homepage_dummy_data from '../../DUMMY_DATA/homepage.json';
import axios from "axios";
import ServiceUrls from '../../helpers/ServiceUrls';
import config from '../../../config';
import { getCacheObject } from '../../helpers/globalHelpers/GlobalHelperFunctions';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;



export const getedithomescreenEvents = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.DASHBOARD_USER_PERCENTAGE, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("dashboard percentages", res);
                let resCode = res.data.status;
                if (resCode === 200) {
                    dispatch(gethomescreenevents(res.data.response));//gethomescreenevents
                } else {
                    dispatch(request_fail(res.data.response.message));
                }

            })
            .catch(err => {
                dispatch(request_fail(err.message));
            });
    };
}
export const updateevent = (i) => {
    return dispatch => {
        dispatch(request_start());
        const user = getCacheObject(SESSION_KEY_NAME);
        axios.post(ServiceUrls.UPDATE_DASHBOARD_EVENT, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("add user response", res.data, i);
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


const request_start = () => ({
    type: EditHomeScreenActionTypes.EDITHOMESCREEN_REQUEST_START
});



export const gethomescreenevents = (data) => ({
    type: EditHomeScreenActionTypes.EDITHOMESCREENS_REQUEST_SUCCESS,
    payload: data
});

export const addEvent = (data) => ({
    type: EditHomeScreenActionTypes.ADD_EVENT_HOMESCREENS_REQUEST_SUCCESS,
    payload: data
});

export const removeEvent = (data) => ({
    type: EditHomeScreenActionTypes.REMOVE_EVENT_EDITHOMESCREENS_REQUEST_SUCCESS,
    payload: data
});

const request_success = (data, i) => ({
    type: EditHomeScreenActionTypes.ADD_EVENT_HOMESCREENS_REQUEST_SUCCESS,
    payload: data,
    event_info: i
});
const request_fail = (data) => ({
    type: EditHomeScreenActionTypes.EDITHOMESCREENS_REQUEST_FAIL,
    payload: data
});
export const refresh_edit_homescreen_data = () => ({
    type: EditHomeScreenActionTypes.EDIT_HOME_SCREEN_CLEAR_DATA,
});



