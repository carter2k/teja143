import OffendersDetailsActionTypes from '../actionTypes/OffendersDetailsActionTypes';
import React, { Fragment } from "react";
import {
    dateconvert, past7thdaydate, locationfromMindate,
    todaydate, nextday, filter_country_code,
    convertTolocationtoMap, diffdate, convertStToDateObj, validateFromDateWithCurrentDate, filterTimes
} from '../../helpers/globalHelpers/Utils';
import { Marker } from "react-google-maps";
import _ from 'lodash';
import { locationHistoryClick } from '../actions/OffenderDetailsActions';
import { toast } from 'react-toastify';
import MarkerWithInfoBox from '../../maps/MarkerWithInfoBox';
const mapMarker = require('../../maps/marker_black.png')
const history_location = require('../../maps/history_location.svg');

const {
    MarkerWithLabel
} = require("react-google-maps/lib/components/addons/MarkerWithLabel");
const INITIAL_STATE = {
    offender_id: '',
    bracelet_id: '',
    precinct_id: '2',
    first_name: '',
    last_name: '',
    address: '',
    city: '',
    u_state: '',
    zipcode: '',
    email: '',
    mobile: '',
    phone1: '',
    phone2: '',
    phone3: '',
    supervisor: '',
    victim_first_name: '',
    victim_last_name: '',
    image_url: '',
    case_number: '',
    home_zone: { radius: '', lat: '', lng: '', address: '' },
    work_zone: { radius: '', lat: '', lng: '', address: '' },
    restrict_zone: { radius: '', lat: '', lng: '', address: '' },
    offender_location_lat: '',
    offender_location_lng: '',
    offender_location_address: '',
    offender_location_time: '',
    id: '',
    supervisor_address: '',
    supervisor_cell_number: '',
    supervisor_city: '',
    supervisor_email: '',
    supervisor_home_pone: '',
    supervisor_mobile: '',
    supervisor_name: '',
    supervisor_state: '',
    supervisor_work_pone: '',
    supervisor_zip: '',
    supervisor_email: '',
    supervisor_name: '',
    supervisor_phone: '',

    bracelet_serial_number: '',

    precinct_address: '',
    precinct_city: '',
    precinct_email: '',
    precinct_name: '',
    precinct_phone: '',
    precinct_state: '',
    precinct_zip: '',
    location_data_update: '',
    perimeter_size: '',
    location_center: '',
    perimeters: '1',
    error: '',
    popup_msg: "",
    loading: false,
    submit_success: false,
    nav_from: 1,
    is_create: false,
    item_deleted: false,

    validate_ph_no: '',
    validate_email_no: '',
    victim_validate_ph_no: '',

    location_history: '',
    show_location_point_click: '',
    location_history_data: [],
    location_filter: 7,

    location_today_date: todaydate(),
    location_initial_date: locationfromMindate(),
    location_from_date: past7thdaydate(),
    location_to_date: todaydate(),
    clicked_location: '',

    victim_fname: "",
    victim_lname: "",
    victim_mobile: "",
    case_number: "",
    case_id: "",

    date_of_birth: '',
    marker_click: false,
    SSN: '', sex: '', race: '', ethnicity: '', offender_type: '',
    is_added: false,
    is_updated: false,
    historyLocationloading: false,
    height: '',
    weight: '',
    curfew_from: null,
    curfew_to: null,
    curfew_time: '0',
    filter_times: ''
}

export default (state = INITIAL_STATE, action) => {
    var emptylocations = { radius: '', lat: '', lng: '', address: '' };
    switch (action.type) {
        case OffendersDetailsActionTypes.OFFENDERS_DETAILS_REQUEST_START:
            return { ...state, loading: true }

        case OffendersDetailsActionTypes.OFFENDERS_LOCATION_HISTORY_REQUEST_START:
            return { ...state, historyLocationloading: true }

        case OffendersDetailsActionTypes.OFFENDERS_DETAILS_REQUEST_SUCCESS:
            var offender = action.payload.data;
            var offender_location = action.payload.location;
            let homezone = convertTolocationtoMap(offender.home_zone);
            let workzone = convertTolocationtoMap(offender.work_zone);
            let restrictzone = INITIAL_STATE.restrict_zone;
            let curfew_from = convertStToDateObj(offender.curfew_from);
            let curfew_to = convertStToDateObj(offender.curfew_to);
            let datevalidation = validateFromDateWithCurrentDate(curfew_to);
            let filter_times = filterTimes(curfew_from);
            //  window.$('#add_edit_offender').modal('show');
            return {
                ...state, loading: false,
                bracelet_id: offender.bracelet_id,
                first_name: offender.fname,
                last_name: offender.lname,
                address: offender.address,
                city: offender.city,
                u_state: offender.state,
                zipcode: offender.zip,
                email: offender.email,
                mobile: filter_country_code(offender.mobile),
                phone1: '', phone2: '', phone3: '',
                supervisor: offender.parole_officer_id,
                //  precinct_id: offender.precinct_id,
                victim_first_name: offender.victim_first_name,
                victim_last_name: offender.victim_last_name,
                offender_id: offender.offender_id,
                home_zone: homezone,
                work_zone: workzone,
                restrict_zone: restrictzone,
                offender_location_lat: offender_location ? offender_location.gps_loc_lat : '',
                offender_location_lng: offender_location ? offender_location.gps_loc_long : '',
                offender_location_address: offender_location ? offender_location.address : '',
                offender_location_time: offender_location ? offender_location.time : '',
                id: offender.id,
                supervisor_address: offender.supervisor_address,
                supervisor_cell_number: offender.supervisor_cell_number,
                supervisor_city: offender.supervisor_city,
                supervisor_email: offender.supervisor_email,
                supervisor_home_pone: offender.supervisor_home_pone,
                supervisor_mobile: offender.supervisor_mobile,
                supervisor_name: offender.supervisor_name,
                supervisor_state: offender.supervisor_state,
                supervisor_work_pone: offender.supervisor_work_pone,
                supervisor_zip: offender.supervisor_zip,
                supervisor_email: offender.supervisor_email,
                supervisor_name: offender.supervisor_name,
                supervisor_phone: offender.supervisor_phone,
                precinct_address: offender.precinct_address,
                precinct_city: offender.precinct_city,
                precinct_email: offender.precinct_email,
                precinct_name: offender.precinct_name,
                precinct_phone: offender.precinct_phone,
                precinct_state: offender.precinct_state,
                precinct_zip: offender.precinct_zip,
                perimeter_size: homezone.radius ? homezone.radius : '',
                location_center: homezone.address ? homezone.address : '',
                image_url: offender.image_url,
                bracelet_serial_number: offender.bracelet_serial_number,
                perimeters: '1',
                is_create: false,

                validate_email_no: offender.email,
                validate_ph_no: offender.mobile,

                victim_fname: offender.victim_fname ? offender.victim_fname : "",
                victim_lname: offender.victim_lname ? offender.victim_lname : "",
                victim_mobile: offender.victim_mobile ? offender.victim_mobile : "",
                victim_validate_ph_no: offender.victim_mobile ? offender.victim_mobile : "",
                case_number: offender.case_number ? offender.case_number : "",
                case_id: offender.case_id ? offender.case_id : "",
                SSN: offender.SSN, sex: offender.sex, race: offender.race,
                ethnicity: offender.ethnicity, offender_type: offender.offender_type ? (offender.offender_type + '') : '',
                date_of_birth: offender.date_of_birth,
                height: offender.height,
                weight: offender.weight,
                curfew_from: datevalidation ? curfew_from : null,
                curfew_to: datevalidation ? curfew_to : null,
                curfew_time: datevalidation ? offender.curfew_time : null,
                //filter_times: datevalidation ? filter_times : null,


            }
        case OffendersDetailsActionTypes.OFFENDER_DETAILS_PAGE_RESET:
            var offender = action.payload;
            return {
                ...state, ...INITIAL_STATE
            }
        case OffendersDetailsActionTypes.OFFENDERS_DETAILS_REQUEST_FAIL:
            toast.error(action.payload, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
            return { ...state, loading: false, historyLocationloading: false }

        case OffendersDetailsActionTypes.OFFENDERS_HISTORY_LOCATIONS_REQUEST_FAIL:
            toast.error(action.payload, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });

            return { ...state, historyLocationloading: false }


        case OffendersDetailsActionTypes.OFFENDERS_DETAILS_PAGE_RESET:
            return {
                ...state, ...INITIAL_STATE,
                location_today_date: todaydate(),
                location_initial_date: locationfromMindate(),
                location_from_date: past7thdaydate(),
                location_to_date: todaydate(),
                home_zone: { radius: '', lat: '', lng: '', address: '' },
                work_zone: { radius: '', lat: '', lng: '', address: '' },
                restrict_zone: { radius: '', lat: '', lng: '', address: '' }
            }

        case OffendersDetailsActionTypes.ADD_OFFENDERS_DETAILS_REQUEST_SUCCESS:


            // window.$('#add_edit_offender').modal('hide');
            return {
                ...state, ...INITIAL_STATE, is_added: true,
                submit_success: true,
            }


        case OffendersDetailsActionTypes.DELETE_OFFENDERS_REQUEST_SUCCESS:
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

        case OffendersDetailsActionTypes.UPDATE_OFFENDERS_DETAILS_REQUEST_SUCCESS:
            toast.success(action.payload.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });

            // window.$('#add_edit_offender').modal('hide');
            return {
                ...state, ...INITIAL_STATE,
                submit_success: true,
                is_updated: true
            }

        case OffendersDetailsActionTypes.SET_OFFENDER_DETAILS:
            const val = action.payload.value;
            return {
                ...state,
                [action.payload.name]: val
            }


        case OffendersDetailsActionTypes.OFFENDERS_LOCATION_HISTORY_REQUEST_SUCCESS:
            let data = action.payload;
            data = _.reverse(data);
            let offenderhistory = [];
            if (false && data) {
                data.forEach((item, index) => {
                    offenderhistory.push({ lat: parseFloat(item.gps_loc_lat), lng: parseFloat(item.gps_loc_long) });
                    // offenderhistory.push(<MarkerWithInfoBox location={item} />);
                });
            }

            return {
                ...state,
                location_history: offenderhistory,
                location_history_data: data,
                loading: false,
                historyLocationloading: false
            }

        case OffendersDetailsActionTypes.OFFENDERS_LOCATION_HISTORY_CLICK_TO_VIEW_INFO_BOX:

            return {
                ...state,
                loading: false,
                clicked_location: action.payload
            }

        case OffendersDetailsActionTypes.SET_OFFENDERS_LOCATION_HISTORY_FROM_TO:
            if (action.payload.name == 'location_from_date') {
                return {
                    ...state,
                    location_from_date: action.payload.value,
                }

            } else if (action.payload.name == 'location_to_date') {
                return {
                    ...state,
                    location_to_date: action.payload.value,
                }
            } else if (action.payload.name == 'curfew_from') {
                let from_date = action.payload.value;
                let filter_times = filterTimes(from_date);
                let curfew_time = diffdate(from_date, state.curfew_to);
                if (curfew_time && curfew_time <= 0) {
                    curfew_time = '';
                    from_date = null

                    toast.error("Curfew From Time Should be Greater than To Time", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                    });
                }
                return {
                    ...state,
                    curfew_from: from_date, curfew_time: curfew_time, filter_times: filter_times
                }

            } else if (action.payload.name == 'curfew_to') {
                let to_date = action.payload.value;
                let curfew_time = diffdate(state.curfew_from, to_date);
                let filter_times = filterTimes(to_date);
                if (curfew_time && curfew_time <= 0) {
                    curfew_time = '';
                    to_date = null;
                    toast.error("Curfew From Time Should be Greater than To Time", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                    });
                }
                return {
                    ...state,
                    curfew_to: to_date, curfew_time: curfew_time, filter_times: filter_times
                }
            }



        case OffendersDetailsActionTypes.SET_OFFENDER_LOCATION:
            let add = action.payload; //.substring(0, 10)
            return {
                ...state,
                offender_location_address: add
            }


        case OffendersDetailsActionTypes.OFFENDERS_DETAILS_POPUP_BOX_ERROR_MESSAGE:
            return {
                ...state,
                popup_msg: action.payload
            }

        case OffendersDetailsActionTypes.PERIMETER_INITIALIZATION:
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


        case OffendersDetailsActionTypes.SET_LOCATION:
            if (state.perimeters == '1') {
                state.home_zone.lat = action.payload.lat;
                state.home_zone.lng = action.payload.lng;
                state.home_zone.address = action.payload.address;
                return {
                    ...state,
                    location_center: action.payload.address,
                    home_zone: state.home_zone,
                    location_data_update: action.payload.address
                }
            } else if (state.perimeters == '2') {
                state.work_zone.lat = action.payload.lat;
                state.work_zone.lng = action.payload.lng;
                state.work_zone.address = action.payload.address;
                return {
                    ...state,
                    location_center: action.payload.address,
                    work_zone: state.work_zone,
                    location_data_update: action.payload.address
                }
            } else if (state.perimeters == '3') {
                state.restrict_zone.lat = action.payload.lat;
                state.restrict_zone.lng = action.payload.lng;
                state.restrict_zone.address = action.payload.address;
                return {
                    ...state,
                    location_center: action.payload.address,
                    restrict_zone: state.restrict_zone,
                    location_data_update: action.payload.address
                }
            } else {
                return
            }

        case OffendersDetailsActionTypes.ONCHANGE_PERIMETER:
            if (action.payload == '1') {
                return {
                    ...state,
                    perimeter_size: state.home_zone.radius,
                    perimeters: action.payload,
                    location_center: state.home_zone.address
                }
            } else if (action.payload == '2') {
                return {
                    ...state,
                    perimeter_size: state.work_zone.radius,
                    perimeters: action.payload,
                    location_center: state.work_zone.address
                }
            } else if (action.payload == '3') {
                return {
                    ...state,
                    perimeter_size: state.restrict_zone.radius,
                    perimeters: action.payload,
                    location_center: state.restrict_zone.address
                }
            } else {
                return
            }

        case OffendersDetailsActionTypes.OFFENDER_SET_NAV_FROM:
            return { ...state, nav_from: action.payload }

        case OffendersDetailsActionTypes.UPDATE_PIC_INFO:

            return { ...state, image_url: action.payload.image_url, loading: false }

        case OffendersDetailsActionTypes.UPDATE_CURFEW_TIME_REQUEST_SUCCESS:
            toast.success(action.payload.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
            return { ...state, loading: false }

        default: return state;
    }
}




