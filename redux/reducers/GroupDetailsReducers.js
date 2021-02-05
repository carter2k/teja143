import GroupDetailsActionTypes from '../actionTypes/GroupDetailsActionTypes';
import { toast } from 'react-toastify';
const INITIAL_STATE = {
    groupdetails: '',
    group_id: "",
    id: '',
    supervisor_id: '',
    group_supervisor: '',
    name: "",
    group_email: '',
    group_phone: '',
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
        case GroupDetailsActionTypes.GROUP_DETAILS_REQUEST_START:
            return { ...state, loading: true }
        case GroupDetailsActionTypes.GROUP_DETAILS_REQUEST_SUCCESS:
            const details = action.payload;
            console.log("<><><><", details);
            return {
                ...state, loading: false,
                groupdetails: action.payload,
                supervisor: details.supervisor_id,
                id: details.id,
                status: 1,
                group_supervisor: details.group_supervisor,
                name: details.name,
                group_email: details.group_email,
                group_phone: details.group_phone,
                address: details.address,
                city: details.city,
                u_state: details.state,
                zip: details.zip,
                reload_details: false
            }

        case GroupDetailsActionTypes.GROUP_DETAILS_REQUEST_FAIL:
            return { ...state, loading: false, error: action.payload }

        case GroupDetailsActionTypes.GROUP_DETAILS_SEARCH:
            return { ...state, search_by_string: action.searchInfo.search_by_string, search_by_type: action.searchInfo.search_by_type, search_by_local_key: action.searchInfo.search_by_local_key }
        case GroupDetailsActionTypes.ACTIVE_TAB:
            return { ...state, active_tab: action.payload, search_by_string: "" }
        case GroupDetailsActionTypes.GROUP_DETAILS_ID:
            return { ...state, group_id: action.payload, item_deleted: false }

        case GroupDetailsActionTypes.ADD_GROUP_DETAILS_REQUEST_SUCCESS:

            toast.success(action.payload.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
            window.$('#add_group').modal('hide');
            return {
                ...state,
                group_id: '',
                group_supervisor: '',
                name: "",
                group_email: '',
                group_phone: '',
                address: "",
                city: "",
                u_state: "",
                zip: "",

                error: '',
                popup_msg: "",
                loading: false,
            }

        case GroupDetailsActionTypes.EMPTY_FIELDS_ON_LOAD:

            return {
                ...state,
                group_id: '',
                group_supervisor: '',
                name: "",
                group_email: '',
                group_phone: '',
                address: "",
                city: "",
                u_state: "",
                zip: "",

                error: '',
                popup_msg: "",
                loading: false,
            }

        case GroupDetailsActionTypes.UPDATE_GROUP_DETAILS_REQUEST_SUCCESS:
            toast.success(action.payload.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
            window.$('#add_group').modal('hide');
            return { ...state, reload_details: true }

        case GroupDetailsActionTypes.DELETE_GROUP_REQUEST_SUCCESS:
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

        case GroupDetailsActionTypes.RELOAD_GROUP_DETAILS:
            return { ...state, reload_details: true, item_deleted: false, popup_msg: '' }

        case GroupDetailsActionTypes.ADD_GROUP_DETAILS_REQUEST_FAIL:
            return { ...state, loading: false, popup_msg: action.payload }
        case GroupDetailsActionTypes.SET_GROUP_FORM_DETAILS:
            const val = action.payload.value;
            return {
                ...state,
                [action.payload.name]: val
            }
        case GroupDetailsActionTypes.GROUP_EDIT_CREATE_POPUP_BOX_ERROR_MESSAGE:
            return {
                ...state,
                popup_msg: action.payload
            }

        case GroupDetailsActionTypes.DELETE_GROUP_INFO_MSG:
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