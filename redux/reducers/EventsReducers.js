import EventsActionTypes from '../actionTypes/EventsActionTypes';
import { dataformat, getEventName } from '../../helpers/globalHelpers/Utils';
import { FILTER_BAND_EVENTS } from '../../helpers/Constans';
const INITIAL_STATE = {
    events: [],
    offender_id: '0',
    search_by_string: "",
    search_by_type: "",
    search_by_alphabet: "",
    search_by_event: "",
    search_by_date: "",
    search_by_date_format: '',
    page_no: 1,
    pagination_total_pages: 1,
    page_limit: 10,
    error: '',
    popup_msg: "",
    loading: false,
    eventTypes: [],
    event_name: 'All Notifications'
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EventsActionTypes.EVENTS_REQUEST_START:
            return { ...state, loading: true, isUserLogIn: false }
        case EventsActionTypes.EVENTS_REQUEST_SUCCESS:
            let event_name = getEventName(action.searchInfo.search_by_event, state.eventTypes)
            return {
                ...state, loading: false,
                events: action.payload.data, pagination_total_pages: action.payload.totalPages,
                search_by_string: action.searchInfo.search_by_string, page_no: action.searchInfo.page_no,
                search_by_alphabet: action.searchInfo.search_by_alphabet,
                search_by_date: action.searchInfo.search_by_date,
                search_by_event: action.searchInfo.search_by_event,
                search_by_date_format: dataformat(action.searchInfo.search_by_date),
                offender_id: action.searchInfo.offender_id,
                event_name: event_name
            }

        case EventsActionTypes.EVENTS_TYPES_SUCCESS:
            let eventtypes = action.payload;
            const filteredEvents = eventtypes.filter(item => (!FILTER_BAND_EVENTS.includes(item.id)));
            let ename = getEventName(state.search_by_event, filteredEvents)
            return {
                ...state, loading: false, eventTypes: filteredEvents,
                event_name: ename
            }

        case EventsActionTypes.EVENTS_REQUEST_FAIL:
            return { ...state, loading: false, error: action.payload, events: [] }

        case EventsActionTypes.EVENTS_PAGE_RESET:
            return { ...state, ...INITIAL_STATE }

        case EventsActionTypes.SET_EVENTS_ALPHABET_VAL:
            return {
                ...state,
                search_by_alphabet: action.payload
            }


        case EventsActionTypes.ADD_EVENTS_REQUEST_SUCCESS:
            return {
                ...state,
                error: action.payload
            }
        case EventsActionTypes.EVENTS_POPUP_BOX_ERROR_MESSAGE:
            return {
                ...state,
                popup_msg: action.payload
            }

        case EventsActionTypes.EVENT_SEARCH:
            let event_name1 = getEventName(action.searchInfo.search_by_event, state.eventTypes)
            return {
                ...state,
                search_by_string: action.searchInfo.search_by_string,
                search_by_type: action.searchInfo.search_by_type,
                search_by_alphabet: action.searchInfo.search_by_alphabet,
                search_by_event: action.searchInfo.search_by_event,
                search_by_date: action.searchInfo.search_by_date,
                search_by_date_format: dataformat(action.searchInfo.search_by_date),
                offender_id: action.searchInfo.offender_id,
                event_name: event_name1
            }
        case EventsActionTypes.SET_CURRENT_DATE:
            return {
                ...state,
                search_by_date: action.payload,
                search_by_date_format: dataformat(action.payload)
            }


        case EventsActionTypes.SET_EVENT_TYPE:
            let search_by_event = '';
            if (action.payload == 'check_ins') {
                search_by_event = '';
            } else if (action.payload == 'curfew_violation') {
                search_by_event = 16;  //16 curfew voilation
            } else if (action.payload == 'low_battery') {
                search_by_event = 5;  // phone battery low
            } else if (action.payload == 'perimeter_violation') {
                search_by_event = '';
            } else if (action.payload == 'victim_violation') {
                search_by_event = 17;
            }
            return {
                ...state,
                search_by_event: search_by_event,
            }


        default: return state;
    }
}