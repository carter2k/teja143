import BraceletDetailsActionTypes from '../actionTypes/BraceletDetailsActionTypes';
import { toast } from 'react-toastify';
const INITIAL_STATE = {
    bracelet_serial_no: '',
    client_id: '',
    id: '',
    status: '',
    device_make: '',
    is_create: false,
    error: '',
    popup_msg: "",
    loading: false,
    submit_success: false,
    item_deleted: false,
    validate_bracelet_serial_no: '',
}


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BraceletDetailsActionTypes.BRACELET_DETAILS_REQUEST_START:
            return { ...state, loading: true, isUserLogIn: false }
        case BraceletDetailsActionTypes.BRACELET_DETAILS_REQUEST_SUCCESS:
            var braceletinfo = action.payload;
            return {
                ...state, loading: false,
                bracelet_serial_no: braceletinfo.device_slno,
                client_id: braceletinfo.client_id,
                id: braceletinfo.id,
                status: braceletinfo.status + '',
                device_make: braceletinfo.device_make,
                validate_bracelet_serial_no: braceletinfo.device_slno,
            }
        case BraceletDetailsActionTypes.BRACELET_DETAILS_REQUEST_FAIL:

            toast.error(action.payload, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });

            return { ...state, loading: false, error: action.payload }

        case BraceletDetailsActionTypes.ADD_BRACELET_DETAILS_REQUEST_SUCCESS:
            toast.success(action.payload.message, {
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

                bracelet_serial_no: '',
                client_id: '',
                status: '',
                device_make: '',
                error: '',
                popup_msg: "",
                validate_bracelet_serial_no: '',
                loading: false,
                submit_success: true
            }

        case BraceletDetailsActionTypes.UPDATE_BRACELET_DETAILS_REQUEST_SUCCESS:
            toast.success(action.payload.message, {
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

                error: '',
                popup_msg: "",
                loading: false,
                submit_success: true
            }



        case BraceletDetailsActionTypes.BRACELET_DETAILS_PAGE_RESET:
            let is_create = action.payload ? action.payload : false;
            return {
                ...state,
                is_create: is_create,
                bracelet_serial_no: '',
                client_id: '',
                id: '',
                status: '',
                device_make: '',
                error: '',
                popup_msg: "",
                loading: false,
                submit_success: false,
                item_deleted: false,
                validate_bracelet_serial_no: '',
            }

        case BraceletDetailsActionTypes.DELETE_BRACELET_REQUEST_SUCCESS:
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

        case BraceletDetailsActionTypes.SET_BRACELET_DETAILS:
            console.log("dataa", action.payload);
            const val = action.payload.value;
            return {
                ...state,
                [action.payload.name]: val,
            }


        case BraceletDetailsActionTypes.VALIDATE_BRACELET_DETAILS:

            toast.error(action.payload, {
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


        case BraceletDetailsActionTypes.BRACELET_DETAILS_POPUP_BOX_ERROR_MESSAGE:
            return {
                ...state,
                popup_msg: action.payload
            }

        case BraceletDetailsActionTypes.DELETE_BRACELET_INFO_MSG:
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