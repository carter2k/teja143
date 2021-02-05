import GroupsActionTypes from '../actionTypes/GroupsActionTypes';
import config from '../../../config';
import { toast } from 'react-toastify';
const TOTAL_RECORDS_PER_PAGE = config.TOTAL_RECORDS_PER_PAGE;

const INITIAL_STATE = {
    groups: [],

    search_by_string: "",
    search_by_type: "",
    search_by_alphabet: "",
    page_no: 1,
    pagination_total_pages: 1,
    page_limit: TOTAL_RECORDS_PER_PAGE,
    error: '',
    popup_msg: "",
    loading: false,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GroupsActionTypes.GROUPS_REQUEST_START:
            return { ...state, loading: true, isUserLogIn: false }

        case GroupsActionTypes.GROUPS_REQUEST_SUCCESS:
            console.log("action.payload", action);
            return {
                ...state, loading: false,
                groups: action.payload.data, pagination_total_pages: action.payload.totalPages,
                search_by_string: action.searchInfo.search_by_string, page_no: action.searchInfo.page_no,
                search_by_alphabet: action.searchInfo.search_by_alphabet
            }
        case GroupsActionTypes.GROUPS_REQUEST_FAIL:

            return { ...state, loading: false, error: action.payload }

        case GroupsActionTypes.SET_GROUP_ALPHABET_VAL:
            return {
                ...state,
                search_by_alphabet: action.payload
            }


        case GroupsActionTypes.ADD_GROUPS_REQUEST_SUCCESS:
            toast.success("Group Added Successfully.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
            return {
                ...state,
                error: action.payload
            }
        case GroupsActionTypes.POPUP_BOX_ERROR_MESSAGE:
            return {
                ...state,
                popup_msg: action.payload
            }
        case GroupsActionTypes.PAGE_RESET_GROUP:
            return {
                ...state,
                groups: [],
                search_by_string: "",
                search_by_type: "",
                search_by_alphabet: "",
                page_no: 1,
                pagination_total_pages: 1,
                page_limit: TOTAL_RECORDS_PER_PAGE,
                error: '',
                popup_msg: "",
                loading: false,
            }
        default: return state;
    }
}