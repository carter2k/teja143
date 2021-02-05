import PrecinctActionTypes from '../actionTypes/PrecinctActionTypes';
const INITIAL_STATE = {
    group_id: "",
    precincts: [],
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
        case PrecinctActionTypes.PRECINCTS_REQUEST_START:
            return { ...state, loading: true, isUserLogIn: false }
        case PrecinctActionTypes.PRECINCTS_REQUEST_SUCCESS:
            return {
                ...state, loading: false,
                precincts: action.payload.data, pagination_total_pages: action.payload.totalPages,
                search_by_string: action.searchInfo.search_by_string, page_no: action.searchInfo.page_no,
                search_by_alphabet: action.searchInfo.search_by_alphabet
            }
        case PrecinctActionTypes.PRECINCTS_REQUEST_FAIL:
            return { ...state, loading: false, error: action.payload }

        case PrecinctActionTypes.SET_PRECINCTS_ALPHABET_VAL:
            return {
                ...state,
                search_by_alphabet: action.payload
            }


        case PrecinctActionTypes.ADD_PRECINCTS_REQUEST_SUCCESS:
            return {
                ...state,
                error: action.payload
            }
        case PrecinctActionTypes.PRECINCTS_POPUP_BOX_ERROR_MESSAGE:
            return {
                ...state,
                popup_msg: action.payload
            }
        case PrecinctActionTypes.SET_PRECINCTS_GROUP_ID_VAL:
            return {
                ...state,
                group_id: action.payload
            }



        default: return state;
    }
}