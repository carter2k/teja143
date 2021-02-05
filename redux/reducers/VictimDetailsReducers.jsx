import VictimsDetailsActionTypes from '../actionTypes/VictimsDetailsActionTypes';
import { toast } from 'react-toastify';
import { htmlDOBformat, filter_country_code, convertTolocationtoMap } from '../../helpers/globalHelpers/Utils'
const INITIAL_STATE = {
    id: '',
    offender_id: '',
    first_name: '',
    last_name: '',
    address: '',
    city: '',
    u_state: '',
    zipcode: '',
    email: '',
    mobile: '',
    sex: "",
    race: "",
    date_of_birth: "",
    ethnicity: "",
    user_id: '',
    home_zone: { radius: '', lat: '', lng: '', address: '' },
    work_zone: { radius: '', lat: '', lng: '', address: '' },
    perimeter_size: '',
    victim_location_center: '',
    perimeters: '1',
    offender: '',
    old_offender_id: '',
    status: '1',
    error: '',
    image_url: '',
    popup_msg: "",
    loading: false,
    submit_success: false,
    nav_from: 1,
    is_create: false,
    item_deleted: false,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case VictimsDetailsActionTypes.VICTIM_DETAILS_REQUEST_START:
            return { ...state, loading: true, isUserLogIn: false }

        case VictimsDetailsActionTypes.VICTIM_DETAILS_REQUEST_SUCCESS:
            var victim = action.payload.data;
            var offender = action.payload.offender_details;

            let homezone = convertTolocationtoMap(victim.home_zone);
            let workzone = convertTolocationtoMap(victim.work_zone);
            return {
                ...state, loading: false,
                id: victim.id,
                first_name: victim.fname,
                last_name: victim.lname,
                email: victim.email,
                mobile: filter_country_code(victim.mobile),
                address: victim.address,
                u_state: victim.state,
                city: victim.city,
                zipcode: victim.zip,
                image_url: victim.image_url,
                offender_id: victim.offender_id,
                old_offender_id: victim.offender_id,
                user_id: victim.user_id,
                race: victim.race,
                sex: victim.sex,
                date_of_birth: victim.date_of_birth,
                home_zone: homezone,
                work_zone: workzone,
                offender: offender,
                perimeter_size: homezone.radius ? homezone.radius : '',
                victim_location_center: homezone.address ? homezone.address : '',
                perimeters: '1',
            }

        case VictimsDetailsActionTypes.VICTIM_DETAILS_PAGE_RESET:
            return {
                ...state, ...INITIAL_STATE,
            }
        case VictimsDetailsActionTypes.VICTIM_DETAILS_REQUEST_FAIL:
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

        case VictimsDetailsActionTypes.ADD_VICTIM_DETAILS_REQUEST_SUCCESS:
            console.log("add victim", state.submit_success)
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
                ...INITIAL_STATE,
                submit_success: true
            }

        case VictimsDetailsActionTypes.DELETE_VICTIM_REQUEST_SUCCESS:
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

        case VictimsDetailsActionTypes.DELETE_VICTIM_INFO_MSG:
            window.$('#delete_item').modal('hide');
            window.$('#info_msg').modal('show');
            return {
                ...state,
                popup_msg: action.payload,
                loading: false,
            }


        case VictimsDetailsActionTypes.UPDATE_SUPERVISOR_PIC_INFO:
            return { ...state, image_url: action.payload.image_url, loading: false }

        case VictimsDetailsActionTypes.UPDATE_VICTIM_DETAILS_REQUEST_SUCCESS:
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
                popup_msg: action.payload.message,
                loading: false,
                submit_success: true
            }



        case VictimsDetailsActionTypes.VALIDATE_VICTIM_DETAILS:

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

        case VictimsDetailsActionTypes.SET_VICTIM_DETAILS:
            const val = action.payload.value;
            return {
                ...state,
                [action.payload.name]: val
            }


        case VictimsDetailsActionTypes.VICTIM_DETAILS_POPUP_BOX_ERROR_MESSAGE:
            return {
                ...state,
                popup_msg: action.payload
            }

        case VictimsDetailsActionTypes.VICTIM_PAGE_GROUP_ID:
            return { ...state, group_id: action.payload, is_create: true }

        case VictimsDetailsActionTypes.VICTIM_SET_NAV_FROM:
            return { ...state, nav_from: action.payload }

        case VictimsDetailsActionTypes.VICTIM_PERIMETER_INITIALIZATION:
            let payload = parseInt(action.payload.radius);
            payload = payload ? payload : ''
            if (state.perimeters == '1') {
                state.home_zone.radius = payload;
                return {
                    ...state,
                    perimeter_size: payload,
                    home_zone: state.home_zone
                }
            } else if (state.perimeters == '2') {
                state.work_zone.radius = payload;
                return {
                    ...state,
                    perimeter_size: payload,
                    work_zone: state.work_zone
                }
            } else if (state.perimeters == '3') {
                state.restrict_zone.radius = payload;
                return {
                    ...state,
                    perimeter_size: payload,
                    restrict_zone: state.restrict_zone
                }
            } else {
                return
            }


        case VictimsDetailsActionTypes.VICTIM_SET_LOCATION:
            if (state.perimeters == '1') {
                state.home_zone.lat = action.payload.lat;
                state.home_zone.lng = action.payload.lng;
                state.home_zone.address = action.payload.address;
                return {
                    ...state,
                    victim_location_center: action.payload.address,
                    home_zone: state.home_zone,
                    location_data_update: action.payload.address
                }
            } else if (state.perimeters == '2') {
                state.work_zone.lat = action.payload.lat;
                state.work_zone.lng = action.payload.lng;
                state.work_zone.address = action.payload.address;
                return {
                    ...state,
                    victim_location_center: action.payload.address,
                    work_zone: state.work_zone,
                    location_data_update: action.payload.address
                }
            } else if (state.perimeters == '3') {
                state.restrict_zone.lat = action.payload.lat;
                state.restrict_zone.lng = action.payload.lng;
                state.restrict_zone.address = action.payload.address;
                return {
                    ...state,
                    victim_location_center: action.payload.address,
                    restrict_zone: state.restrict_zone,
                    location_data_update: action.payload.address
                }
            } else {
                return
            }

        case VictimsDetailsActionTypes.VICTIM_ONCHANGE_PERIMETER:
            console.log("onchage paremeter", action.payload);
            if (action.payload == '1') {
                return {
                    ...state,
                    perimeter_size: state.home_zone.radius,
                    perimeters: action.payload,
                    victim_location_center: state.home_zone.address
                }
            } else if (action.payload == '2') {
                return {
                    ...state,
                    perimeter_size: state.work_zone.radius,
                    perimeters: action.payload,
                    victim_location_center: state.work_zone.address
                }
            } else if (action.payload == '3') {
                return {
                    ...state,
                    perimeter_size: state.restrict_zone.radius,
                    perimeters: action.payload,
                    victim_location_center: state.restrict_zone.address
                }
            } else {
                return
            }

        default: return state;
    }
}