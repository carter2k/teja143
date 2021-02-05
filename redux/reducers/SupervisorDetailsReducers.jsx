import SupervisorDetailsActionTypes from '../actionTypes/SupervisorDetailsActionTypes';
import { toast } from 'react-toastify';
import { htmlDOBformat, filter_country_code } from '../../helpers/globalHelpers/Utils'
import _ from 'lodash';
const INITIAL_STATE = {
    id: '',
    offender_id: '',
    precinct_id: 2,
    first_name: '',
    last_name: '',
    address: '',
    city: '',
    u_state: '',
    zipcode: '',
    email: '',
    mobile: '',
    home_phone: '',
    work_phone: '',
    cell_number: '',
    OffendersList: [],
    "mname": "",
    "sex": "",
    "race": "",
    "date_of_birth": "",
    "ethnicity": "",
    "marital_status": "single",
    "SSN": "",

    precinct_name: '',
    precinct_phone: '',
    precinct_address: '',
    precinct_state: '',
    precinct_city: '',
    precinct_zip: '',
    precinct_email: '',
    officer_id: '',
    status: '1',
    error: '',
    popup_msg: "",
    loading: false,
    submit_success: false,
    nav_from: 1,
    is_create: false,
    item_deleted: false,

    validate_ph_no: '',
    validate_email_no: '',

    reassign_supervisor_id: '',
    reassign_supervisor_name: '',
    reassign_offender: '',
    page_reload: '',
    image_url: '',
    is_added: false,
    is_updated: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SupervisorDetailsActionTypes.SUPERVISOR_DETAILS_REQUEST_START:
            return { ...state, loading: true, isUserLogIn: false }
        case SupervisorDetailsActionTypes.SUPERVISOR_DETAILS_REQUEST_SUCCESS:
            var supervisor = action.payload;

            // window.$('#add_edit_supervisor').modal('show');
            return {
                ...state, loading: false,
                id: supervisor.id,
                officer_id: supervisor.officer_id,
                //  precinct_id: supervisor.precinct_id,
                first_name: supervisor.fname,
                last_name: supervisor.lname,
                address: supervisor.address,
                city: supervisor.city,
                u_state: supervisor.state,
                zipcode: supervisor.zip,
                email: supervisor.email,
                mobile: filter_country_code(supervisor.mobile),
                home_phone: supervisor.home_phone, work_phone: supervisor.work_phone, cell_number: supervisor.cell_number,
                mname: supervisor.mname,
                sex: supervisor.sex,
                race: supervisor.race,
                date_of_birth: htmlDOBformat(supervisor.date_of_birth),
                ethnicity: supervisor.ethnicity,
                marital_status: supervisor.marital_status,
                SSN: supervisor.SSN,
                OffendersList: supervisor.OffendersList,
                precinct_name: supervisor.precinct_name,
                precinct_phone: supervisor.precinct_phone,
                precinct_address: supervisor.precinct_address,
                precinct_state: supervisor.precinct_state,
                precinct_city: supervisor.precinct_city,
                precinct_zip: supervisor.precinct_zip,
                precinct_email: supervisor.precinct_email,
                officer_id: supervisor.officer_id,
                page_reload: false,
                validate_ph_no: supervisor.mobile,
                validate_email_no: supervisor.email,
                image_url: supervisor.profile_pic
            }

        case SupervisorDetailsActionTypes.SUPERVISOR_DETAILS_PAGE_RESET:
            var supervisor = action.payload;
            return {
                ...state, ...INITIAL_STATE
            }
        case SupervisorDetailsActionTypes.SUPERVISOR_DETAILS_REQUEST_FAIL:
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

        case SupervisorDetailsActionTypes.ADD_SUPERVISOR_DETAILS_REQUEST_SUCCESS:
            toast.success(action.payload.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
            // window.$('#add_edit_supervisor').modal('hide');
            return {
                ...state, ...INITIAL_STATE, is_added: true, submit_success: true,
            }

        case SupervisorDetailsActionTypes.DELETE_SUPERVISOR_REQUEST_SUCCESS:
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

        case SupervisorDetailsActionTypes.DELETE_SUPERVISOR_INFO_MSG:
            window.$('#delete_item').modal('hide');
            window.$('#info_msg').modal('show');
            return {
                ...state,
                popup_msg: action.payload,
                loading: false,
            }

        case SupervisorDetailsActionTypes.UPDATE_SUPERVISOR_PIC_INFO:
            return { ...state, image_url: action.payload.image_url, loading: false }

        case SupervisorDetailsActionTypes.UPDATE_SUPERVISOR_DETAILS_REQUEST_SUCCESS:
            toast.success(action.payload.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
            //  window.$('#add_edit_supervisor').modal('hide');
            return {
                ...state, ...INITIAL_STATE,
                popup_msg: "",
                loading: false,
                submit_success: true,
                is_updated: true
            }



        case SupervisorDetailsActionTypes.VALIDATE_SUPERVISOR_DETAILS:
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
                popup_msg: action.payload
            }

        case SupervisorDetailsActionTypes.SET_SUPERVISOR_DETAILS:
            const val = action.payload.value;

            return {
                ...state,
                [action.payload.name]: val
            }


        case SupervisorDetailsActionTypes.SUPERVISOR_DETAILS_POPUP_BOX_ERROR_MESSAGE:
            return {
                ...state,
                popup_msg: action.payload
            }

        case SupervisorDetailsActionTypes.RE_ASSIGN_SUPERVISOR:
            window.$('#re_assign_msg').modal('show');
            return {
                ...state,
                reassign_supervisor_id: action.payload.supervisor_id,
                reassign_supervisor_name: action.payload.supervisor_name,
                reassign_offender: action.payload.offender
            }

        case SupervisorDetailsActionTypes.RE_ASSIGN_SUPERVISOR_SUCCESS:
            window.$('#re_assign_msg').modal('hide');
            let offenders = state.OffendersList;
            _.remove(offenders, {
                offender_id: state.reassign_offender.offender_id
            });
            return {
                ...state,
                OffendersList: offenders,
                reassign_offender: '',
                loading: false,
            }

        case SupervisorDetailsActionTypes.SUPERVISOR_PAGE_GROUP_ID:
            return { ...state, group_id: action.payload, is_create: true }

        case SupervisorDetailsActionTypes.SUPERVISOR_SET_NAV_FROM:
            return { ...state, nav_from: action.payload }



        default: return state;
    }
}