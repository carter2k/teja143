import ClubPlayersRegistrationActionTypes from '../actionTypes/ClubPlayersRegistrationActionTypes';

const INITIAL_STATE = {
    clubs: [],
    error: '',
    loading: false,
    isupdateClubs: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ClubPlayersRegistrationActionTypes.ON_CLUB_PLAYERS_REGISTRATION_START:
            return { ...state, loading: true }
        case ClubPlayersRegistrationActionTypes.ON_CLUB_PLAYERS_REGISTRATION_SUCCESS:
            return { ...state, loading: false, clubs: action.payload, isupdateClubs: false }
        case ClubPlayersRegistrationActionTypes.ON_CLUB_PLAYERS_REGISTRATION_FAIL:
            return { ...state, loading: false, error: action.payload }
        case ClubPlayersRegistrationActionTypes.ON_CLUB_PLAYERS_CREATE:
            return { ...state, loading: false, isupdateClubs: true }
        case ClubPlayersRegistrationActionTypes.ON_CLUB_PLAYERS_LIST_UPDATE:
            return { ...state, isupdateClubs: action.payload }
        case ClubPlayersRegistrationActionTypes.ON_CLUB_PLAYERS_ERROR_MESSAGE_UPDATE:
            return { ...state, error: '' }

        default: return state;
    }
}