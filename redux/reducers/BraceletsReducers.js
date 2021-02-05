import BraceletActionTypes from '../actionTypes/BraceletsActionTypes';

const INITIAL_STATE = {
    group_id: "",
    bracelets: [],
    search_by_string: "",
    search_by_type: "",
    search_by_alphabet: "",
    search_by_bracelet_id: "",
    page_no: 1,
    pagination_total_pages: 1,
    page_limit: 5,
    error: '',
    popup_msg: "",
    loading: false,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BraceletActionTypes.BRACELETS_REQUEST_START:
            return { ...state, loading: true, isUserLogIn: false }

        case BraceletActionTypes.BRACELETS_REQUEST_SUCCESS:
            var braceltes = action.payload.data;

            var filterbracelet = action.filter_id;
            let newbracelets = [];
            if (filterbracelet || filterbracelet == 'new') {
                braceltes.forEach((item, index) => {
                    if (!item.offender_name || item.id == filterbracelet) {
                        newbracelets.push(item);
                    }
                });

                braceltes = newbracelets;
            }
            console.log("braceltes", braceltes);
            return {
                ...state, loading: false,
                bracelets: braceltes, pagination_total_pages: action.payload.totalPages,
                page_no: action.searchInfo.page_no,

            }
        case BraceletActionTypes.BRACELETS_REQUEST_FAIL:
            return { ...state, loading: false, error: action.payload }

        case BraceletActionTypes.SET_BRACELETS_ALPHABET_VAL:
            return {
                ...state,
                search_by_alphabet: action.payload
            }


        case BraceletActionTypes.ADD_BRACELETS_REQUEST_SUCCESS:
            return {
                ...state,
                error: action.payload
            }
        case BraceletActionTypes.BRACELETS_POPUP_BOX_ERROR_MESSAGE:
            return {
                ...state,
                popup_msg: action.payload
            }
        case BraceletActionTypes.BRACELET_SEARCH:
            return {
                ...state,
                search_by_string: action.searchInfo.search_by_string,
                search_by_type: action.searchInfo.search_by_type,
                search_by_bracelet_id: action.searchInfo.search_by_bracelet_id
            }

        case BraceletActionTypes.SET_BRACELETS_GROUP_ID_VAL:
            return {
                ...state,
                group_id: action.payload
            }
        case BraceletActionTypes.BRACELETS_PAGE_RESET:
            return {
                ...state,
                bracelets: [],
                search_by_string: "",
                search_by_type: "",
                search_by_alphabet: "",
                search_by_bracelet_id: "",
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