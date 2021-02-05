import PrecinctsDetailsActionTypes from '../actionTypes/PrecinctsDetailsActionTypes';
import { toast } from 'react-toastify';
const INITIAL_STATE = {
    precinct_id: '',
    group_id: '',
    center_id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    u_state: '',
    zip: '',
    status: '',
    id: '',
    is_create: '',
    error: '',
    popup_msg: "",
    loading: false,
    submit_success: false,
    nav_from: 1,
    is_create: false,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PrecinctsDetailsActionTypes.PRECINCT_DETAILS_REQUEST_START:
            return { ...state, loading: true, isUserLogIn: false }
        case PrecinctsDetailsActionTypes.PRECINCT_DETAILS_REQUEST_SUCCESS:
            var precinct = action.payload;
            return {
                ...state, loading: false,
                center_id: precinct.center_id,
                precinct_id: precinct.precinct_id,
                id: precinct.id,
                group_id: precinct.group_id,
                name: precinct.precinct_name,
                email: precinct.precinct_email,
                phone: precinct.precinct_phone,
                address: precinct.precinct_address,
                city: precinct.precinct_city,
                u_state: precinct.precinct_state,
                zip: precinct.precinct_zip,
                status: precinct.status,
                is_create: false
            }
        case PrecinctsDetailsActionTypes.PRECINCT_DETAILS_REQUEST_FAIL:

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

        case PrecinctsDetailsActionTypes.ADD_PRECINCT_DETAILS_REQUEST_SUCCESS:
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
                name: '',
                email: '',
                phone: '',
                address: '',
                city: '',
                u_state: '',
                zip: '',

                status: '1',
                id: '',
                error: '',
                popup_msg: "",
                loading: false,
                submit_success: true

            }

        case PrecinctsDetailsActionTypes.UPDATE_PRECINCT_DETAILS_REQUEST_SUCCESS:
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
                popup_msg: action.payload.message,
                loading: false,
                submit_success: true

            }

        case PrecinctsDetailsActionTypes.PRECINCT_DETAILS_PAGE_RESET:
            return {
                ...state, loading: false,
                precinct_id: '',
                group_id: '',
                center_id: '',
                name: '',
                email: '',
                phone: '',
                address: '',
                city: '',
                u_state: '',
                zip: '',
                status: '',
                id: '',
                error: '',
                popup_msg: "",
                loading: false,
                submit_success: false,
                nav_from: 1,
                is_create: false,
            }


        case PrecinctsDetailsActionTypes.VALIDATE_PRECINCT_DETAILS:

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

        case PrecinctsDetailsActionTypes.SET_PRECINCT_DETAILS:
            const val = action.payload.value;
            return {
                ...state,
                [action.payload.name]: val
            }


        case PrecinctsDetailsActionTypes.PRECINCT_DETAILS_POPUP_BOX_ERROR_MESSAGE:
            return {
                ...state,
                popup_msg: action.payload
            }

        case PrecinctsDetailsActionTypes.PRECINCT_PAGE_GROUP_ID:
            return { ...state, group_id: action.payload, is_create: true }
        case PrecinctsDetailsActionTypes.PRECINCT_SET_NAV_FROM:
            return { ...state, nav_from: action.payload }
        default: return state;


    }
}