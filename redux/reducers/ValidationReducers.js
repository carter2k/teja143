import ValidationActionTypes from '../actionTypes/ValidationActionTypes';

const INITIAL_STATE = {
    phone_validate_msg: '',
    email_validate_msg: '',
    username_validate_msg: '',
    valdate_popup_msg: "",
    valdate_err_msg: '',
    validate_bracelet_msg: '',

    victim_phone_validate_msg: '',

    previous_phone: '',
    previous_email: '',

    loading: false,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ValidationActionTypes.VALIDATION_REQUEST_START:
            return { ...state, loading: true, isUserLogIn: false }
        case ValidationActionTypes.VALIDATION_REQUEST_SUCCESS:

            if (action.errtype == 1) {
                return {
                    ...state, loading: false,
                    username_validate_msg: action.payload
                }
            } else if (action.errtype == 2) {
                return {
                    ...state, loading: false,
                    phone_validate_msg: action.payload,
                }
            } else if (action.errtype == 3) {
                return {
                    ...state, loading: false,
                    email_validate_msg: action.payload,
                }
            } else if (action.errtype == 4) {
                return {
                    ...state, loading: false,
                    bracelet_validate_msg: action.payload,
                }
            }

        case ValidationActionTypes.VALIDATION_REQUEST_FAIL:
            return { ...state, loading: false, valdate_err_msg: action.payload }

        case ValidationActionTypes.SET_VALIDATION_PHONE_DATA:
            return { ...state, loading: false, phone_validate_msg: action.payload }

        case ValidationActionTypes.VALIDATION_VICTIM_REQUEST_SUCCESS:
            return { ...state, loading: false, victim_phone_validate_msg: action.payload }

        case ValidationActionTypes.SET_VALIDATION_EMAIL_DATA:
            return { ...state, loading: false, email_validate_msg: action.payload }
        case ValidationActionTypes.RESET_VALIDATION_DATA:
            return { ...state, loading: false, email_validate_msg: '', phone_validate_msg: '', victim_phone_validate_msg: '', bracelet_validate_msg: '' }

        case ValidationActionTypes.SET_VALIDATION_BRACELET_DATA:
            return { ...state, loading: false, bracelet_validate_msg: action.payload }

        default: return state;
    }
}