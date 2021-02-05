import SupervisorActionTypes from '../actionTypes/SupervisorActionTypes';

const INITIAL_STATE = {
    supervisors: [],
    search_by_string: "",
    search_by_type: "",
    search_by_alphabet: "",
    page_no: 1,
    pagination_total_pages: 1,
    page_limit: 5,
    error: '',
    popup_msg: "",
    loading: false,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SupervisorActionTypes.SUPERVISORS_REQUEST_START:
            return { ...state, loading: true, isUserLogIn: false }
        case SupervisorActionTypes.SUPERVISORS_REQUEST_SUCCESS:
            console.log("action.payload", action);
            return {
                ...state, loading: false,
                supervisors: action.payload.data, pagination_total_pages: action.payload.totalPages,
                search_by_string: action.searchInfo.search_by_string, page_no: action.searchInfo.page_no,
                search_by_alphabet: action.searchInfo.search_by_alphabet,
            }
        case SupervisorActionTypes.SUPERVISORS_REQUEST_FAIL:
            return { ...state, loading: false, error: action.payload }

        case SupervisorActionTypes.SET_SUPERVISORS_ALPHABET_VAL:
            return {
                ...state,
                search_by_alphabet: action.payload
            }


        case SupervisorActionTypes.ADD_SUPERVISORS_REQUEST_SUCCESS:
            return {
                ...state,
                error: action.payload
            }
        case SupervisorActionTypes.SUPERVISORS_POPUP_BOX_ERROR_MESSAGE:
            return {
                ...state,
                popup_msg: action.payload
            }

        case SupervisorActionTypes.SUPERVISORS_PAGE_RESET:
            return {
                ...state,
                supervisors: [],
                search_by_string: "",
                search_by_type: "",
                search_by_alphabet: "",
                page_no: 1,
                pagination_total_pages: 1,
                page_limit: 5,
                error: '',
                popup_msg: "",
                loading: false,
            }


        default: return state;
    }
}