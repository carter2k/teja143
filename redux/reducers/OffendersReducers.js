import OffendersActionTypes from '../actionTypes/OffendersActionTypes';
const INITIAL_STATE = {
    offenders: [],
    search_by_string: "",
    search_by_type: "",
    search_by_alphabet: "",
    offender_type: 0,
    page_no: 1,
    pagination_total_pages: 1,
    offender_status: "all",
    page_limit: 5,
    error: '',
    popup_msg: "",
    loading: false,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case OffendersActionTypes.OFFENDERS_REQUEST_START:
            return { ...state, loading: true, isUserLogIn: false }
        case OffendersActionTypes.OFFENDERS_REQUEST_SUCCESS:
            return {
                ...state, loading: false,
                offenders: action.payload.data, pagination_total_pages: action.payload.totalPages,
                search_by_string: action.searchInfo.search_by_string, page_no: action.searchInfo.page_no,
                search_by_alphabet: action.searchInfo.search_by_alphabet, offender_type: action.searchInfo.offender_type
            }
        case OffendersActionTypes.OFFENDERS_REQUEST_FAIL:
            return { ...state, loading: false, error: action.payload }

        case OffendersActionTypes.SET_OFFENDERS_ALPHABET_VAL:
            return {
                ...state,
                search_by_alphabet: action.payload
            }


        case OffendersActionTypes.ADD_OFFENDERS_REQUEST_SUCCESS:
            return {
                ...state,
                error: action.payload
            }
        case OffendersActionTypes.OFFENDERS_POPUP_BOX_ERROR_MESSAGE:
            return {
                ...state,
                popup_msg: action.payload
            }

        case OffendersActionTypes.SET_OFFENDERS_STATUS:
            return {
                ...state,
                offender_status: action.payload
            }

        case OffendersActionTypes.SET_OFFENDERS_TYPE:
            return {
                ...state,
                offender_type: action.payload
            }

        case OffendersActionTypes.OFFENDERS_PAGE_RESET:
            return {
                ...state, ...INITIAL_STATE,
            }



        default: return state;
    }
}