import ClubPlayersRegistrationActionTypes from '../actionTypes/ClubPlayersRegistrationActionTypes';
import axios from "axios";
import ServiceUrls from '../../helpers/ServiceUrls';

export const getregisterUsers = (user, headers) => {
    return dispatch => {
        console.log("getregisterUsers>>>>>", user);
        dispatch(clubrequeststarted());
        axios.post(ServiceUrls.USERS_LIST, user, {
            headers: headers
        })
            .then(res => {
                let resCode = res.data.code;
                if (resCode === 200) {
                    console.log("getregisterUsers>>>>>", res.data.data);
                    dispatch(requestSuccess(res.data.data));
                } else {
                    dispatch(requestFailure(res.data.message));
                }

            })
            .catch(err => {
                dispatch(requestFailure(err.message));
            });
    };
}



export const addclubUsers = (clubuser, headers) => {
    return dispatch => {
        console.log("addclubUsers>>>>>", clubuser);
        dispatch(clubrequeststarted());
        axios.post(ServiceUrls.CREATE_USER, clubuser, {
            headers: headers
        })
            .then(res => {
                let resCode = res.data.code;
                if (resCode === 200) {
                    console.log("getregisterUsers>>>>>", res.data.data);
                    dispatch(clubcreateSuccess());
                } else {
                    dispatch(requestFailure(res.data.message));
                }

            })
            .catch(err => {
                dispatch(requestFailure(err.message));
            });
    };
}

export const errormessage = (msg) => {
    return dispatch => {
        dispatch(updateerrormessage(msg));
    };
}

export const isupdateclub = (tf) => {
    return dispatch => {
        dispatch(setupdateclubstatus(tf));
    };
}

const clubrequeststarted = () => ({
    type: ClubPlayersRegistrationActionTypes.ON_CLUB_PLAYERS_REGISTRATION_START
});
const requestSuccess = (data) => ({
    type: ClubPlayersRegistrationActionTypes.ON_CLUB_PLAYERS_REGISTRATION_SUCCESS,
    payload: data
});

const requestFailure = (data) => ({
    type: ClubPlayersRegistrationActionTypes.ON_CLUB_PLAYERS_REGISTRATION_FAIL,
    payload: data
});

const clubcreateSuccess = () => ({
    type: ClubPlayersRegistrationActionTypes.ON_CLUB_PLAYERS_CREATE
});

const setupdateclubstatus = (data) => ({
    type: ClubPlayersRegistrationActionTypes.ON_CLUB_PLAYERS_LIST_UPDATE,
    payload: data
});

const updateerrormessage = (data) => ({
    type: ClubPlayersRegistrationActionTypes.ON_CLUB_PLAYERS_ERROR_MESSAGE_UPDATE,
    payload: data
});



