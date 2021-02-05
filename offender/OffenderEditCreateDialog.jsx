import React, { Component } from "react";
import usa_states from "../DUMMY_DATA/usa_states.json";
import {
    setdata,
    setPerimeter,
    onchangePerimeterType,
    addoffender,
    getoffender,
    errormsg,
    page_refresh,
    editoffender,
    getgoogleplaces,
    getgoogleaddress,
    uploadpic,
    uploadpicfetch,
} from "../redux/actions/OffenderDetailsActions";
import {
    checkUserNameExist,
    checkEmailExist,
    checkPhoneNumberExist,
    setvalidationemaildata,
    setvalidationphonedata,
    resetvalidatedata,
    checkVictimPhoneNumberExist,
    checkVictimExist,
} from "../redux/actions/ValidateActions";
import { getallprecincts } from "../redux/actions/PrecinctActions";
import {
    getallbracelets,
    bracelet_page_refresh,
} from "../redux/actions/BraceletsActions";
import {
    dataformat,
    todaydate,
    dateTost, filter_country_code
} from "../helpers/globalHelpers/Utils";
import { ToastContainer, toast } from "react-toastify";
import Map from '../maps/Map';
import "react-toastify/dist/ReactToastify.css";
import { validate_OffendersForm } from "../utils/validation";
import { connect } from "react-redux";
import PhoneInput from "react-phone-input-2";
import DatePicker from "react-datepicker";
import { getalloffenders } from "../redux/actions/OffendersActions";
import GooglePlacesAutoComplete from '../maps/GooglePlacesAutoComplete';
import config from '../../config';
const GOOGLE_MAP_API_KEY = config.GOOGLE_MAP_API_KEY;
const google_map_url = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;

class OffenderEditCreateDialog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            error,
            loading,
            bracelet_id,
            first_name,
            last_name,
            address,
            city,
            u_state,
            zipcode,
            email,
            mobile,
            date_of_birth,
            date,
            supervisor,
            precinct_id,
            victim_first_name,
            victim_last_name,
            perimeters,
            is_create,
            nav_from,
            image_url,
            band,
            perimeter_size,
            supervisors,
            precincts,
            bracelets,
            user_group_logo,
            popup_msg,
            search_by_date,
            offender,
            socialSecurity,
            phone_validate_msg,
            victim_phone_validate_msg,
            email_validate_msg,
            username_validate_msg,
            victim_fname,
            victim_lname,
            victim_mobile,
            case_number,
            case_id,
            SSN, sex, race, ethnicity, offender_type, offender_id
        } = this.props;

        var usa_states_data = [];
        var supervisor_list = [];
        var bracelets_data = [];
        usa_states_data.push(<option key="select" value="">Select</option>);
        usa_states.forEach((item, index) => {
            usa_states_data.push(
                <option key={index} value={item.abbreviation}>
                    {item.abbreviation}
                </option>
            );
        });

        supervisor_list.push(<option key="emp" value=''>Select</option>)
        supervisors.forEach((item, index) => {
            supervisor_list.push(
                <option key={index} value={item.id}>{item.fname}</option>
            )
        });

        bracelets_data.push(<option key="brce" value="">Select</option>);
        bracelets.forEach((item, index) => {
            bracelets_data.push(
                <option key={index} value={item.id}>{item.device_slno}</option>
            )
        });

        var dob = date_of_birth ? dataformat(date_of_birth) : null;
        var location_today_date = todaydate();
        return (
            <>
                <div
                    class="modal fade talitrix_modal"
                    role="dialog"
                    tabindex="-1"
                    id="add_edit_offender"
                >
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title font-weight-bold">
                                    {offender_id ? " EDIT OFFENDER" : "ADD OFFENDER"}
                                </h4>
                                <button
                                    onClick={() => this.updatedata()}
                                    type="button"
                                    class="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>FirstName</label>
                                                <input
                                                    id="first_name"
                                                    ref="first_name"
                                                    name="first_name"
                                                    value={first_name}
                                                    onChange={this.handleChange}
                                                    class="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>LastName</label>
                                                <input
                                                    id="last_name"
                                                    ref="last_name"
                                                    name="last_name"
                                                    value={last_name}
                                                    onChange={this.handleChange}
                                                    class="form-control"
                                                    type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label> Address</label>
                                        <input
                                            id="address"
                                            ref="address"
                                            name="address"
                                            value={address}
                                            onChange={this.handleChange}
                                            class="form-control"
                                            type="text"
                                        />
                                    </div>

                                    <div class="form-row">
                                        <div class="col-md-5">
                                            <div class="form-group">
                                                <label>City</label>
                                                <input
                                                    id="city"
                                                    ref="city"
                                                    name="city"
                                                    value={city}
                                                    onChange={this.handleChange}
                                                    class="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div className="form-group">
                                                <label className="font-size-14">State</label>
                                                <select
                                                    className="form-control"
                                                    value={u_state}
                                                    ref="u_state"
                                                    name="u_state"
                                                    id="u_state"
                                                    onChange={this.handleChange}
                                                >
                                                    {usa_states_data}
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Zip Code</label>
                                                <input
                                                    id="zipcode"
                                                    ref="zipcode"
                                                    value={zipcode}
                                                    name="zipcode"
                                                    onChange={this.handleChange}
                                                    class="form-control removeSpinner"
                                                    type="number"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Email</label>
                                                <input
                                                    id="email"
                                                    ref="email"
                                                    name="email"
                                                    value={email}
                                                    onChange={this.handleEmailExist}
                                                    class="form-control"
                                                    type="text"
                                                />

                                                <p className="text-primary">{email_validate_msg}</p>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div className="form-group">
                                                <label className="font-size-14">Phone</label>
                                                <PhoneInput
                                                    disableCountryCode={true}
                                                    onlyCountries={['us']}
                                                    disableDropdown={true}
                                                    placeholder={'(702) 123-4567'}
                                                    country={"us"}
                                                    className="form-control"
                                                    inputProps={{
                                                        name: "mobile",
                                                        required: true,
                                                    }}
                                                    value={mobile}
                                                    ref="mobile"
                                                    onChange={this.handlePhoneChange}
                                                />
                                                <p className="text-primary">{phone_validate_msg}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="form-row"
                                        style={{ "border-bottom": "1px solid #dee2e6" }}
                                    >
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Band#</label>
                                                <select
                                                    className="form-control"
                                                    value={bracelet_id}
                                                    ref="bracelet_id"
                                                    name="bracelet_id"
                                                    id="bracelet_id"
                                                    onChange={this.handleChange}
                                                >
                                                    {bracelets_data}
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Supervisor</label>

                                                <select
                                                    className="form-control"
                                                    value={supervisor}
                                                    ref="supervisor"
                                                    name="supervisor"
                                                    id="supervisor"
                                                    onChange={this.handleChange}
                                                >
                                                    {supervisor_list}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Social Security#</label>
                                                <input
                                                    id="SSN"
                                                    ref="SSN"
                                                    name="SSN"
                                                    value={SSN}
                                                    onChange={this.handleChange}
                                                    class="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="font-size-14">Date Of Birth</label>
                                                <DatePicker
                                                    selected={dob}
                                                    className="form-control w-100"
                                                    onChange={(date) => this.handleDateToChange(date)}
                                                    maxDate={location_today_date}
                                                    placeholderText="dd/mm/yyyy"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Race</label>
                                                <input
                                                    id="race"
                                                    ref="race"
                                                    name="race"
                                                    value={race}
                                                    onChange={this.handleChange}
                                                    class="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="font-size-14">Sex</label>
                                                <select
                                                    className="form-control"
                                                    value={sex}
                                                    ref="sex"
                                                    name="sex"
                                                    onChange={this.handleChange}
                                                >
                                                    <option key="select" value="0">
                                                        Select
                          </option>
                                                    <option key="male" value="male">
                                                        Male
                          </option>
                                                    <option key="female" value="female">
                                                        Female
                          </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Ethinicity</label>
                                                <input
                                                    id="ethnicity"
                                                    ref="ethnicity"
                                                    name="ethnicity"
                                                    value={ethnicity}
                                                    onChange={this.handleChange}
                                                    class="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        class="form-row"
                                        style={{ "border-bottom": "1px solid #dee2e6" }}
                                    >
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <div class="form-group">
                                                    <label>Offender Type</label>

                                                    <select
                                                        className="form-control"
                                                        value={offender_type}
                                                        ref="offender_type"
                                                        name="offender_type"
                                                        id="offender_type"
                                                        onChange={this.handleChange}>
                                                        <option value="">Select</option>
                                                        <option value="1">Violent Offender</option>
                                                        <option value="2">Sex Offender</option>
                                                        <option value="3">Non Violent Offender</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="col-sm-12" style={{ "border-bottom": "1px solid #dee2e6" }}>
                                        <div className="d-flex align-items-center justify-items-cente">
                                            <div className="img_circle mr-3">
                                                {image_url ? <img src={image_url} /> :
                                                    <img src="assets/img/p_pic.png" />}
                                            </div>
                                            <div class="mb-1">
                                                <div><input type="file" id="user_group_logo" class="custom-file-input" onChange={this.onChangeHandler} name="user_group_logo" accept="image/*" />
                                                    <div class="">
                                                        <label id="user_group_label" for="user_group_logo"><i class="fa fa-upload"></i> Choose profile pic...</label>
                                                        <p className="text-primary">Image should be max 1 MB</p>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-row"
                                        style={{ "margin-bottom": "20px" }}>
                                        <div class="col-md-12">
                                            <Map
                                                center={{ lat: 40.64, lng: -73.96 }}
                                                zoom={12}
                                                dynamickeyrequired={true}
                                                googleMapURL={google_map_url}
                                                loadingElement={<div style={{ height: `100%` }} />}
                                                containerElement={<div style={{ height: `300px` }} />}
                                                mapElement={<div style={{ height: `100%` }} />}
                                            />
                                        </div>
                                    </div>

                                    <div class="form-row"
                                        style={{ "margin-bottom": "20px" }}>
                                        <div class="col-md-12">
                                            <select className="form-control" value={perimeters} ref="perimeters" name="perimeters" onChange={this.handleChange} id="perimeters" >
                                                <option value='1' >EDIT HOME PERIMETER</option>
                                                <option value='2'>EDIT WORK PERIMETER</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="form-row">
                                        <div class="col-md-8">
                                            <div className="form-group"><label className="font-size-14">Location Center(Center of Perimeter)</label>
                                                <GooglePlacesAutoComplete />
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div className="form-group"><label className="font-size-14">Size of Perimeter</label>
                                                <input className="form-control" type="number" value={perimeter_size} ref="perimeter_size" name="perimeter_size" onChange={this.handleChange} /></div>
                                        </div>
                                    </div>


                                </form>
                                <p class="text-danger">{popup_msg}</p>
                                <div class="text-right">
                                    <button
                                        onClick={() => this.createOffender()}
                                        class="btn btn-primary btn-theme btn-sm"
                                        type="button"> Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    onChangeHandler = (event) => {
        var props = this.props;
        let file = event.target.files[0];

        if (file && file.size > 1 * 1024 * 1024) {
            this.props.validateform("Profile Pic Should not be more than 1MB");
            return;
        }

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            let data = reader.result.split(/,(.+)/)[1];
            data = { image: data };
            console.log("pic info", data);
            props.uploadpic(data);
        };
        reader.onerror = function (error) {
            console.log("Error: ", error);
        };
    };

    onFocus = (e) => {
        let val = e.target.value;


    }

    updatedata() {
        // this.props.cleardata();
    }

    handleDateToChange = (date) => {
        if (date) {
            var data = { name: "date_of_birth", value: date };
            data.value = dateTost(date);
            this.props.setdata(data);
        }
    };

    handleChange = (e) => {
        var data = { name: e.target.name, value: e.target.value };
        if (e.target.name == 'perimeter_size') {
            var pinfo = { radius: e.target.value }
            this.props.setPerimeter(pinfo);
        } else if (e.target.name == 'perimeters') {
            this.props.onchangePerimeterType(e.target.value);
        } else if (e.target.name == "zipcode") {
            if (e.target.value.length <= 5) {
                this.props.setdata(data);
            }
        } else if (e.target.name == "SSN") {
            var re = /^-?\d+\.?\d*$/;
            '123'.match(re)
            if (data.value.includes("*")) {
                data.value = "";
                this.props.setdata(data);
            } else if (!data.value.match(re) && data.value) {
                // check isnumber
            } else if (e.target.value.length <= 9) {
                this.props.setdata(data);
            }
        } else {
            this.props.setdata(data);
        }
    };

    handlePhoneChange = (value, country, event) => {
        const { validate_ph_no } = this.props;
        if (event && event.target && event.target.name) {
            var data = { name: event.target.name, value: value ? "" + value : "" };
            this.props.setdata(data);
            if (validate_ph_no != data.value) {
                data.value = "+1" + data.value;
                this.props.checkPhoneNumberExist(data);
            } else {
                this.props.setvalidationphonedata("");
            }
        }
    };

    handleVictimPhoneChange = (value, country, event) => {
        const { victim_validate_ph_no, mobile } = this.props;
        if (event && event.target && event.target.name) {
            var data = { name: event.target.name, value: value ? "" + value : "" };
            this.props.setdata(data);
            if (victim_validate_ph_no != data.value) {
                this.props.checkVictimPhoneNumberExist(data);
            } else {
                this.props.checkVictimExist("");
            }
        }
    };

    handleEmailExist = (e) => {
        const { validate_email_no } = this.props;
        var data = { name: e.target.name, value: e.target.value };
        this.props.setdata(data);
        if (validate_email_no != data.value) {
            this.props.checkEmailExist(data);
        } else {
            this.props.setvalidationemaildata("");
        }
    };

    geoplaces = (e) => {
        this.props.getgoogleplaces(e.target.value);
    };

    createOffender() {
        const {
            offender_id,
            id,
            bracelet_id,
            first_name,
            last_name,
            address,
            city,
            u_state,
            zipcode,
            email,
            mobile,
            date,
            supervisor,
            precinct_id,
            user_group_logo,
            search_by_date,
            home_zone,
            work_zone,
            restrict_zone,
            image_url,
            victim_fname,
            victim_lname,
            victim_mobile,
            case_number,
            case_id, SSN, sex, race, ethnicity, offender_type, date_of_birth
        } = this.props;
        var errormsg = validate_OffendersForm(this.props);
        if (errormsg.status) {
            this.props.errormsg(errormsg.msg);
            return false;
        }
        var data = {
            fname: first_name,
            lname: last_name,
            "mobile": "+1" + filter_country_code(mobile),
            precinct_id: precinct_id,
            parole_officer_id: supervisor,
            address: address,
            city: city,
            state: u_state,
            zip: zipcode,
            race: race,
            sex: sex,
            SSN: SSN,
            ethnicity: ethnicity,
            offender_type: offender_type,
            email: email,
            date_of_birth: date_of_birth,
            image_url: image_url,
            bracelet_id: bracelet_id,
            home_zone: JSON.stringify(home_zone),
            work_zone: JSON.stringify(work_zone),
            restrict_zone: JSON.stringify(restrict_zone),
        };
        console.log("send data", data)
        if (offender_id) {
            data["offender_id"] = offender_id;
            data["status"] = "1";
            data["id"] = id;
            this.props.editoffender(data);
        } else {
            this.props.addoffender(data);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { search_by_string, search_by_alphabet, page_no, page_limit, is_added, is_updated, offender_type_list
        } = this.props;
        if (is_added) {
            this.props.setdata({ name: "is_added", value: false });
            let dataObject = {
                search_by_string: "", search_by_alphabet: "",
                page_no: 1, page_limit: page_limit, offender_type: offender_type_list
            }
            this.props.getalloffenders(dataObject);
        } else if (is_updated) {
            console.log("page_no", page_no);
            this.props.setdata({ name: "is_updated", value: false });
            let dataObject = {
                search_by_string: search_by_string, search_by_alphabet: search_by_alphabet,
                page_no: page_no, page_limit: page_limit, offender_type: offender_type_list
            }
            this.props.getalloffenders(dataObject);
        }
    }
}

const mapStateToProps = (state) => {
    const {
        error,
        loading,
        offender_id,
        submit_success,
        id,
        bracelet_id,
        first_name,
        last_name,
        address,
        city,
        u_state,
        zipcode,
        email,
        phone1,
        phone2,
        phone3,
        mobile,
        date,
        supervisor,
        precinct_id,
        victim_first_name,
        victim_last_name,
        perimeters,
        home_zone,
        work_zone,
        restrict_zone,
        perimeter_size,
        nav_from,
        is_create,
        search_by_date,
        offender_location_lat,
        offender_location_lng,
        offender_location_address,
        image_url,
        validate_ph_no,
        validate_email_no,
        user_group_logo,
        popup_msg,
        victim_fname,
        victim_lname,
        victim_mobile,
        case_number,
        case_id,
        date_of_birth,
        SSN, sex, race, ethnicity, offender_type,
        is_added, is_updated
    } = state.offender_details;
    const { search_by_string, search_by_alphabet, page_no, page_limit } = state.groups_offenders;
    const offender_type_list = state.groups_offenders.offender_type;
    const { supervisors } = state.groups_supervisor;
    const { precincts } = state.groups_precinct;
    const { bracelets } = state.groups_braceltes;
    const {
        phone_validate_msg,
        victim_phone_validate_msg,
        email_validate_msg,
        username_validate_msg,
    } = state.validate;

    return {
        error,
        loading,
        offender_id,
        submit_success,
        id,
        bracelet_id,
        first_name,
        last_name,
        address,
        city,
        u_state,
        zipcode,
        email,
        phone1,
        phone2,
        phone3,
        mobile,
        supervisor,
        precinct_id,
        victim_first_name,
        victim_last_name,
        perimeters,
        home_zone,
        work_zone,
        restrict_zone,
        perimeter_size,
        nav_from,
        is_create,
        date,
        offender_location_lat,
        offender_location_lng,
        offender_location_address,
        image_url,
        bracelets,
        supervisors,
        precincts,
        user_group_logo,
        popup_msg,
        search_by_date,
        phone_validate_msg,
        email_validate_msg,
        username_validate_msg,
        validate_ph_no,
        validate_email_no,
        victim_phone_validate_msg,
        victim_fname,
        victim_lname,
        victim_mobile,
        case_number,
        case_id,
        date_of_birth,
        SSN, sex, race, ethnicity, offender_type,
        is_added, is_updated,
        search_by_string, search_by_alphabet, supervisors, page_no, page_limit, offender_type_list
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setdata: (input) => {
            dispatch(setdata(input));
        },
        setPerimeter: (input) => {
            dispatch(setPerimeter(input));
        },
        onchangePerimeterType: (input) => {
            dispatch(onchangePerimeterType(input));
        },
        addoffender: (input) => {
            dispatch(addoffender(input));
        },
        getalloffenders: (input) => {
            dispatch(getalloffenders(input));
        },
        getallprecincts: (input) => {
            dispatch(getallprecincts(input));
        },
        errormsg: (data) => {
            dispatch(errormsg(data));
        },
        page_refresh: () => {
            dispatch(page_refresh());
        },
        editoffender: (data) => {
            dispatch(editoffender(data));
        },
        getoffender: (input) => {
            dispatch(getoffender(input));
        },
        getgoogleplaces: (input) => {
            dispatch(getgoogleplaces(input));
        },
        getgoogleaddress: (lat, lng) => {
            dispatch(getgoogleaddress(lat, lng));
        },
        uploadpic: (img) => {
            dispatch(uploadpic(img));
        },
        getallbracelets: (input, filter_id) => {
            dispatch(getallbracelets(input, filter_id));
        },
        checkUserNameExist: (st) => {
            dispatch(checkUserNameExist(st));
        },
        checkEmailExist: (st) => {
            dispatch(checkEmailExist(st));
        },
        checkPhoneNumberExist: (st) => {
            dispatch(checkPhoneNumberExist(st));
        },
        setvalidationemaildata: (st) => {
            dispatch(setvalidationemaildata(st));
        },
        setvalidationphonedata: (st) => {
            dispatch(setvalidationphonedata(st));
        },
        resetvalidatedata: () => {
            dispatch(resetvalidatedata());
        },
        uploadpicfetch: (img) => {
            dispatch(uploadpicfetch(img));
        },
        bracelet_page_refresh: (data) => {
            dispatch(bracelet_page_refresh(data));
        },
        checkVictimPhoneNumberExist: (data) => {
            dispatch(checkVictimPhoneNumberExist(data));
        },
        checkVictimExist: (data) => {
            dispatch(checkVictimExist(data));
        },
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OffenderEditCreateDialog);
