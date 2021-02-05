import HomePageActionTypes from '../actionTypes/HomePageActionTypes';
import { toast } from 'react-toastify';
import { dateconvert, past7thdaydate, locationfromMindate, todaydate, filter_country_code } from '../../helpers/globalHelpers/Utils';
const INITIAL_STATE = {
    events: [],
    overviewPercentages: {},
    missedCheckIn: 0,
    nextCheckin: 0,
    outOfRange: 0,
    search_by_string: "",
    search_by_type: "",
    search_by_local_key: "",
    search_by_event: "",

    pagination_pageno: 1,
    pagination_total_pages: 1,
    error: '',
    popup_msg: "",
    loading: false,

    violent_offenders: 0,
    sex_offenders: 0,
    non_violent_offenders: 0,
    client_id: "",
    state_id:"",
    offender_type: 0,
    event_type: '',
    from_date: '',
    to_date: '',
    offender_fromday_date: past7thdaydate(),
    offender_today_date: todaydate(),
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HomePageActionTypes.HOME_PAGE_REQUEST_START:
            return { ...state, loading: true, isUserLogIn: false }
        case HomePageActionTypes.HOME_PAGE_REQUEST_SUCCESS:
            return { ...state, loading: false, events: action.payload.events, overviewPercentages: action.payload.overviewPercentages }
        case HomePageActionTypes.HOME_PAGE_REQUEST_FAIL:
            return { ...state, loading: false, error: action.payload }
        case HomePageActionTypes.HOME_PAGE_PERCENTAGE_REQUEST_FAIL:

            return {
                ...state,
                loading: false,
                missedCheckIn: 0,
                nextCheckin: 0,
                outOfRanage: 0,
            }
        case HomePageActionTypes.HOME_PAGE_REQUEST_SUCCESS:
            return { ...state, loading: false, events: action.payload.events, overviewPercentages: action.payload.overviewPercentages }
        case HomePageActionTypes.ALL_EVETNS_REQUEST_SUCCESS:
            return {
                ...state, loading: false, events: action.payload.data
            }
        case HomePageActionTypes.EVENTS_PAGEINATION_NEXT_PAGE:
            return { ...state, pagination_pageno: state.pagination_pageno + 1 }
        case HomePageActionTypes.EVENTS_PAGEINATION_PREVIOUS_PAGE:
            return { ...state, pagination_pageno: state.pagination_pageno - 1 }
        case HomePageActionTypes.SEARCH:
            return {
                ...state,
                search_by_string: action.searchInfo.search_by_string,
                search_by_type: action.searchInfo.search_by_type,
                search_by_local_key: action.searchInfo.search_by_local_key,
                search_by_event: action.searchInfo.search_by_event
            }
        case HomePageActionTypes.POPUP_BOX_ERROR_MESSAGE:
            return {
                ...state,
                popup_msg: action.payload
            }
        case HomePageActionTypes.HOME_PAGE_OVERVIEW:
            return {
                ...state,
                missedCheckIn: action.payload.missedCheckIn ? action.payload.missedCheckIn : 0,
                nextCheckin: action.payload.nextCheckin ? action.payload.nextCheckin : 0,
                outOfRange: action.payload.outOfRanage ? action.payload.outOfRanage : 0,
            }

        case HomePageActionTypes.HOME_PAGE_RESET:
            console.log("reset called")
            return {
                ...state, ...INITIAL_STATE
            }

        case HomePageActionTypes.HOME_PAGE_OFFENDERS_SUCCESS:
            return {
                ...state, loading: false,
                violent_offenders: action.payload.violent_offenders ? action.payload.violent_offenders : 0,
                sex_offenders: action.payload.sex_offenders ? action.payload.sex_offenders : 0,
                non_violent_offenders: action.payload.non_violent_offenders ? action.payload.non_violent_offenders : 0,
            }

        case HomePageActionTypes.HOME_PAGE_OFFENDERS_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
                violent_offenders: 0,
                sex_offenders: 0,
                non_violent_offenders: 0,
            }
        case HomePageActionTypes.SET_HOME_PAGE_DATA:
            const val = action.payload.value;
            return {
                ...state,
                [action.payload.name]: val
            }

        default: return state;
    }
}