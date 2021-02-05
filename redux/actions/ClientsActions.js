import ClientsActionTypes from '../actionTypes/ClientsActionTypes';
import homepage_dummy_data from '../../DUMMY_DATA/homepage.json';
import axios from "axios";
import ServiceUrls from '../../helpers/ServiceUrls';
import config from '../../../config';
import { getCacheObject } from '../../helpers/globalHelpers/GlobalHelperFunctions';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;



export const getallclients = (i) => {
    return dispatch => {
        const user = getCacheObject(SESSION_KEY_NAME);
        dispatch(request_start());
        axios.post(ServiceUrls.ALL_CLIENTS, i, { headers: { "access-token": user['access-token'] } })
            .then(res => {
                console.log("request>>>>" + ServiceUrls.ALL_CLIENTS, user, res);
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


export const filterClients = (i) => {
    return dispatch => {
        dispatch(filter_clients(i));
    };
}


export const clients_page_refresh = () => {
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

const request_start = () => ({
    type: ClientsActionTypes.CLIENTS_REQUEST_START
});
const request_success = (data, search_data) => ({
    type: ClientsActionTypes.CLIENTS_REQUEST_SUCCESS,
    payload: data,
    searchInfo: search_data
});

const request_add_group_success = (data) => ({
    type: ClientsActionTypes.ADD_CLIENTS_REQUEST_SUCCESS,
    payload: data
});



const request_fail = (data) => ({
    type: ClientsActionTypes.CLIENTS_REQUEST_FAIL,
    payload: data
});


const setalphabetInfo = (data) => ({
    type: ClientsActionTypes.SET_CLIENTS_ALPHABET_VAL,
    payload: data
});
const pagerefresh = () => ({
    type: ClientsActionTypes.CLIENT_PAGE_RESET
});

const setpopuperror_msg = (data) => ({
    type: ClientsActionTypes.POPUP_BOX_ERROR_MESSAGE,
    payload: data
});

const filter_clients = (data) => ({
    type: ClientsActionTypes.FIND_STATE_BY_CLIENT,
    payload: data
});
