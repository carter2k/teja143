import DepartmentDetailsActionTypes from '../actionTypes/DepartmentDetailsActionTypes';
import { toast } from 'react-toastify';
const INITIAL_STATE = {
    departmentdetails: '',
    department_id: "",
    id: '',
    supervisor_id: '',
    department_supervisor: '',
    name: "",
    department_email: '',
    department_phone: '',
    address: "",
    city: "",
    u_state: "",
    zip: "",
    popup_msg: '',
    status: '',
    search_by_string: "",
    search_by_type: "",
    search_by_local_key: "",

    active_tab: 1,
    error: '',
    loading: false,
    reload_details: false,
    item_deleted: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DepartmentDetailsActionTypes.DEPARTMENT_DETAILS_REQUEST_START:
            return { ...state, loading: true }
        case DepartmentDetailsActionTypes.DEPARTMENT_DETAILS_REQUEST_SUCCESS:
            const details = action.payload;
            console.log("<><><><", details);
            return {
                ...state, loading: false,
                departmentdetails: action.payload,
                supervisor: details.supervisor_id,
                id: details.id,
                status: 1,
                department_supervisor: details.department_supervisor,
                name: details.name,
                department_email: details.department_email,
                department_phone: details.department_phone,
                address: details.address,
                city: details.city,
                u_state: details.state,
                zip: details.zip,
                reload_details: false
            }

        case DepartmentDetailsActionTypes.DEPARTMENT_DETAILS_REQUEST_FAIL:
            return { ...state, loading: false, error: action.payload }

        case DepartmentDetailsActionTypes.DEPARTMENT_DETAILS_SEARCH:
            return { ...state, search_by_string: action.searchInfo.search_by_string, search_by_type: action.searchInfo.search_by_type, search_by_local_key: action.searchInfo.search_by_local_key }
        case DepartmentDetailsActionTypes.ACTIVE_TAB:
            return { ...state, active_tab: action.payload, search_by_string: "" }
        case DepartmentDetailsActionTypes.DEPARTMENT_DETAILS_ID:
            return { ...state, department_id: action.payload, item_deleted: false }

        case DepartmentDetailsActionTypes.ADD_DEPARTMENT_DETAILS_REQUEST_SUCCESS:

            toast.success(action.payload.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
            window.$('#add_department').modal('hide');
            return {
                ...state,
                department_id: '',
                department_supervisor: '',
                name: "",
                department_email: '',
                department_phone: '',
                address: "",
                city: "",
                u_state: "",
                zip: "",

                error: '',
                popup_msg: "",
                loading: false,
            }

        case DepartmentDetailsActionTypes.EMPTY_FIELDS_ON_LOAD:

            return {
                ...state,
                department_id: '',
                department_supervisor: '',
                name: "",
                department_email: '',
                department_phone: '',
                address: "",
                city: "",
                u_state: "",
                zip: "",

                error: '',
                popup_msg: "",
                loading: false,
            }

        case DepartmentDetailsActionTypes.UPDATE_DEPARTMENT_DETAILS_REQUEST_SUCCESS:
            toast.success(action.payload.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
            window.$('#add_department').modal('hide');
            return { ...state, reload_details: true }

        case DepartmentDetailsActionTypes.DELETE_DEPARTMENT_REQUEST_SUCCESS:
            window.$('#delete_item').modal('hide');
            toast.success(action.payload.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
            return {
                ...state,
                item_deleted: true,
                loading: false,
            }

        case DepartmentDetailsActionTypes.RELOAD_DEPARTMENT_DETAILS:
            return { ...state, reload_details: true, item_deleted: false, popup_msg: '' }

        case DepartmentDetailsActionTypes.ADD_DEPARTMENT_DETAILS_REQUEST_FAIL:
            return { ...state, loading: false, popup_msg: action.payload }
        case DepartmentDetailsActionTypes.SET_DEPARTMENT_FORM_DETAILS:
            const val = action.payload.value;
            return {
                ...state,
                [action.payload.name]: val
            }
        case DepartmentDetailsActionTypes.DEPARTMENT_EDIT_CREATE_POPUP_BOX_ERROR_MESSAGE:
            return {
                ...state,
                popup_msg: action.payload
            }

        case DepartmentDetailsActionTypes.DELETE_DEPARTMENT_INFO_MSG:
            window.$('#delete_item').modal('hide');
            window.$('#info_msg').modal('show');
            return {
                ...state,
                popup_msg: action.payload,
                loading: false,
            }

        default: return state;
    }
}