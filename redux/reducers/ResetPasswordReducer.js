import ResetPasswordActionTypes from '../actionTypes/ResetPasswordActionTypes';
import { toast } from 'react-toastify';

const INITIAL_STATE = {
    old_password: '',
    new_password: '',
    confirm_password: '',
    loading: false,
    password_changed: false,
    error: '',
    reset_password_error_popup_msg: '',
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ResetPasswordActionTypes.ON_RESET_PASSWORD_REQUEST_START:
            return { ...state, loading: true }

        case ResetPasswordActionTypes.ON_RESET_PASSWORD_REQUEST_SUCCESS:

            toast.success("Password Updated Successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
            return { ...state, loading: false, password_changed: true }

        case ResetPasswordActionTypes.ON_RESET_PASSWORD_REQUEST_FAIL:
            return { ...state, loading: false, error: action.payload }


        case ResetPasswordActionTypes.ON_RESET_PASSWORD_FORM_CLEAR:
            return { ...state, ...INITIAL_STATE }


        case ResetPasswordActionTypes.RESET_PASSWORD_POPUP_ERROR_MSG:
            return { ...state, loading: false, reset_password_error_popup_msg: action.payload }

        case ResetPasswordActionTypes.RESET_PASSWORD_ERROR_MSG:
            return { ...state, loading: false, error: action.payload }

        case ResetPasswordActionTypes.SET_RESET_PASSWORD_DETAILS:
            const val = action.payload.value;
            return {
                ...state,
                [action.payload.name]: val
            }
        default: return state;
    }
}