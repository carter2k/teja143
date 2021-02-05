import LoginActionTypes from '../actionTypes/LoginActionTypes';
// import { setCacheObject, getCacheObject } from '../../helpers/globalHelpers/GlobalHelperFunctions';
import config from '../../../config';
const LOGIN_USER_NAME = config.LOGIN_USER_NAME;

const INITIAL_STATE = {
    user: null,
    email: (LOGIN_USER_NAME),
    error: '',
    loading: false,
    isUserLogIn: false,
    reset_password_popup_msg: '',
    reset_confirm_password_popup_msg: '',
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LoginActionTypes.ON_LOGIN_REQUEST_START:
            return { ...state, loading: true, isUserLogIn: false }

        case LoginActionTypes.ON_LOGIN_REQUEST_SUCCESS:
            return { ...state, loading: false, user: action.payload, isUserLogIn: true }

        case LoginActionTypes.ON_LOGIN_REQUEST_FAIL:
            return { ...state, loading: false, error: action.payload, isUserLogIn: false }


        case LoginActionTypes.SET_USER_INFO:
            return { ...state, ...INITIAL_STATE, user: action.payload, error: '' }

        case LoginActionTypes.RESET_POPUP_ERROR_MSG:
            return { ...state, error: '', reset_password_popup_msg: action.payload }

        case LoginActionTypes.RESET_PASSWORD_SUCCESS:
            window.$('#reset_password').modal('hide');
            window.$('#resend_confirmed').modal('show');
            return { ...state, error: '' }

        case LoginActionTypes.RESET_PASSWORD_FAIL:
            return { ...state, error: '', reset_password_popup_msg: action.payload }

        case LoginActionTypes.RESET_LOGIN_DETAILS:
            return { ...state, ...INITIAL_STATE, email: (LOGIN_USER_NAME) }


        case LoginActionTypes.SET_LOGIN_DETAILS:
            const val = action.payload.value;
            return {
                ...state,
                [action.payload.name]: val
            }

        case LoginActionTypes.RESEND_EMAIL_PASSWORD_SUCCESS:
            return { ...state, ...INITIAL_STATE, error: '', reset_confirm_password_popup_msg: action.payload }

        default: return state;
    }
}