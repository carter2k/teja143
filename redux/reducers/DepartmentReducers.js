import DepartmentActionTypes from '../actionTypes/DepartmentActionTypes';
import config from '../../../config';
import { toast } from 'react-toastify';
const TOTAL_RECORDS_PER_PAGE = config.TOTAL_RECORDS_PER_PAGE;

const INITIAL_STATE = {
    departments: [],

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
        case DepartmentActionTypes.DEPARTMENTS_REQUEST_START:
            return { ...state, loading: true, isUserLogIn: false }

        case DepartmentActionTypes.DEPARTMENTS_REQUEST_SUCCESS:
            console.log("action.payload", action);
            return {
                ...state, loading: false,
                departments: action.payload.data, pagination_total_pages: action.payload.totalPages,
                search_by_string: action.searchInfo.search_by_string, page_no: action.searchInfo.page_no,
                search_by_alphabet: action.searchInfo.search_by_alphabet
            }
        case DepartmentActionTypes.DEPARTMENTS_REQUEST_FAIL:

            return { ...state, loading: false, error: action.payload }

        case DepartmentActionTypes.SET_DEPARTMENT_ALPHABET_VAL:
            return {
                ...state,
                search_by_alphabet: action.payload
            }


        case DepartmentActionTypes.ADD_DEPARTMENTS_REQUEST_SUCCESS:
            toast.success("Department Added Successfully.", {
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
        case DepartmentActionTypes.POPUP_BOX_ERROR_MESSAGE:
            return {
                ...state,
                popup_msg: action.payload
            }
        case DepartmentActionTypes.PAGE_RESET_GROUP:
            return {
                ...state,
                departments: [],
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