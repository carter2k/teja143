import React, { Component } from 'react'
import { Link, useHistory } from "react-router-dom";
import Header from '../commons/Header'
import Footer from '../commons/Footer'
import { setdata, addsupervisor, set_group_id, validateform, getsupervisor, page_refresh, editsupervisor, uploadpic } from '../redux/actions/SupervisorDetailsActions';
import { checkUserNameExist, checkEmailExist, checkPhoneNumberExist, setvalidationemaildata, setvalidationphonedata, resetvalidatedata } from '../redux/actions/ValidateActions';
import { getallprecincts } from '../redux/actions/PrecinctActions';
import { getallsupervisors } from '../redux/actions/SupervisorActions';
import { dataformat, todaydate, dateTost, filter_country_code } from '../helpers/globalHelpers/Utils';
import usa_states from '../DUMMY_DATA/usa_states.json'
import { MENU, URL } from '../helpers/Constans';
import { validate_supervisorForm } from '../utils/validation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import Loader from '../commons/Loading';
import DeleteSupervisor from './DeleteSupervisor';
import PhoneInput from 'react-phone-input-2';
import DatePicker from "react-datepicker";

class SuperVisorEditCreateDialog extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { error, loading,
            first_name, last_name, address, city, u_state, zipcode, email, mobile, work_phone, cell_number, home_phone,
            mname, sex, race, date_of_birth, ethnicity, marital_status, SSN, nav_from, is_create,
            phone_validate_msg, email_validate_msg, username_validate_msg, popup_msg, image_url, officer_id,offender_id,
            precinct_id, precincts } = this.props;
        var usa_states_data = [];
        usa_states_data.push(<option key="select" value="">Select</option>);
        usa_states.forEach((item, index) => {
            usa_states_data.push(
                <option key={index} value={item.abbreviation}>{item.abbreviation}</option>
            )
        });

        return (
            <>
                <div class="modal fade talitrix_modal" role="dialog" tabindex="-1" id="add_edit_supervisor">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title font-weight-bold">{officer_id ? 'EDIT SUPERVISOR' : 'ADD SUPERVISOR'}</h4><button onClick={() => this.updatedata()} type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-row">
                                        <div class="col-md-6">
                                            <div class="form-group"><label>First Name</label><input id="first_name" ref="first_name" name="first_name" value={first_name} onChange={this.handleChange} class="form-control" type="text" /></div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group"><label>Last Name</label><input id="last_name" ref="last_name" name="last_name" value={last_name} onChange={this.handleChange} class="form-control" type="text" /></div>
                                        </div>

                                    </div>
                                    <div class="form-group"><label>Address</label><input id="address" ref="address" name="address" value={address} onChange={this.handleChange} class="form-control" type="text" /></div>

                                    <div class="form-row">
                                        <div class="col-md-5">
                                            <div class="form-group"><label>City</label><input id="city" ref="city" name="city" value={city} onChange={this.handleChange} class="form-control" type="text" /></div>
                                        </div>
                                        <div class="col-md-3">

                                            <div className="form-group"><label className="font-size-14">State</label>
                                                <select className="form-control" value={u_state} ref="u_state" name="u_state" id="u_state" onChange={this.handleChange} >
                                                    {usa_states_data}
                                                </select></div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group"><label>Zip Code</label><input id="zipcode" ref="zipcode" value={zipcode} name="zipcode" onChange={this.handleChange} class="form-control removeSpinner" type="number" /></div>
                                        </div>
                                    </div>

                                    <div class="form-row" style={{ "border-bottom": "1px solid #dee2e6" }}>
                                        <div class="col-md-6">
                                            <div class="form-group"><label>Email</label>
                                                <input id="email" ref="email" name="email" value={email} onChange={this.handleEmailExist} class="form-control" type="text" />
                                                <p className="text-primary">{email_validate_msg}</p>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div className="form-group"><label className="font-size-14">Phone</label>
                                                <PhoneInput disableCountryCode={true}
                                                    onlyCountries={['us']}
                                                    disableDropdown={true}
                                                    country={'us'}
                                                    placeholder={'(702) 123-4567'}
                                                    className="form-control"
                                                    inputProps={{
                                                        name: 'mobile',
                                                        required: true,
                                                    }}
                                                    value={mobile} ref="mobile" onChange={this.handlePhoneChange} />
                                                <p className="text-primary">{phone_validate_msg}</p>
                                            </div>
                                        </div>

                                    </div>




                                    <div className="col-sm-12">
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


                                </form>
                                <p class="text-danger">{popup_msg}</p>
                                <div class="text-right"><button onClick={() => this.createSupervisor()} class="btn btn-primary btn-theme btn-sm" type="button">Submit</button></div>
                            </div>
                        </div>
                    </div>
                </div></>
        )
    }

    updatedata() {
        // this.props.cleardata();
    }

    handleDateToChange = (date) => {
        if (date) {
            var data = { name: "date_of_birth", value: date }
            data.value = dateTost(date);
            this.props.setdata(data)
        }
    }

    handleChange = (e) => {
        var data = { name: e.target.name, value: e.target.value }
        if (e.target.name == 'zipcode') {
            if (e.target.value.length <= 5) {
                this.props.setdata(data)
            }
        } else {
            this.props.setdata(data)
        }

    }


    createSupervisor() {
        const { error, id,
            first_name, last_name, address, city, u_state, zipcode, email, mobile, work_phone, cell_number, home_phone,
            mname, sex, race, date_of_birth, ethnicity, marital_status, SSN, image_url,
            precinct_id, officer_id, status, profile_pic,

            search_by_string, search_by_alphabet,
            supervisors, page_no, page_limit
        } = this.props;
        var dataObject;
        var errormsg = validate_supervisorForm(this.props);
        if (errormsg) {
            this.props.validateform(errormsg);
            return false;
        }
        var data = {
            "fname": first_name,
            "lname": last_name,
            "mobile": "+1" + filter_country_code(mobile),
            "address": address,
            city: city,
            state: u_state,
            zip: zipcode,
            email: email,
            precinct_id: precinct_id,
            profile_pic: image_url
        };
        if (officer_id) {
            data['officer_id'] = officer_id;
            data['status'] = status;
            this.props.editsupervisor(data);
        } else {
            this.props.addsupervisor(data);

        }

    }

    handlePhoneChange = (value, country, event) => {
        const { validate_ph_no } = this.props;
        if (event && event.target && event.target.name) {
            var data = { name: event.target.name, value: value ? '' + value : '' };
            this.props.setdata(data);
            if (validate_ph_no != data.value) {
                data.value = "+1" + data.value;
                this.props.checkPhoneNumberExist(data)
            } else {
                this.props.setvalidationphonedata("");
            }
        }
    };
    handleEmailExist = (e) => {
        const { validate_email_no } = this.props;
        var data = { name: e.target.name, value: e.target.value }
        this.props.setdata(data)
        if (validate_email_no != data.value) {
            this.props.checkEmailExist(data)
        } else {
            this.props.setvalidationemaildata("");
        }
    }

    onChangeHandler = event => {
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
            props.uploadpic(data);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };

    }

    componentDidUpdate(prevProps, prevState) {
        const { search_by_string, search_by_alphabet,
            supervisors, page_no, page_limit, is_added, is_updated
        } = this.props;
        if (is_added) {
            this.props.setdata({ name: "is_added", value: false });
            let dataObject = {
                search_by_string: "", search_by_alphabet: "",
                page_no: 1, page_limit: page_limit
            }
            this.props.getSupervisors(dataObject);
        } else if (is_updated) {
            this.props.setdata({ name: "is_updated", value: false });
            let dataObject = {
                search_by_string: search_by_string, search_by_alphabet: search_by_alphabet,
                page_no: page_no, page_limit: page_limit
            }
            this.props.getSupervisors(dataObject);
        }
    }
}



const mapStateToProps = state => {
    const { error, loading,
        first_name, last_name, address, city, u_state, zipcode, email, mobile, work_phone, cell_number, home_phone,
        mname, sex, race, date_of_birth, ethnicity, marital_status, SSN,
        precinct_id, id, submit_success, officer_id, status, nav_from, is_create, item_deleted, image_url,
        validate_ph_no, validate_email_no, popup_msg, profile_pic, is_added, is_updated
    } = state.supervisor_details;

    const {
        search_by_string, search_by_alphabet,
        supervisors, page_no, page_limit } = state.groups_supervisor;

    const { precincts } = state.groups_precinct;
    const { phone_validate_msg, email_validate_msg, username_validate_msg } = state.validate;

    return {
        error, loading,
        first_name, last_name, address, city, u_state, zipcode, email, mobile, work_phone, cell_number, home_phone,
        mname, sex, race, date_of_birth, ethnicity, marital_status, SSN, image_url,
        precinct_id, id, precincts, submit_success, officer_id, status, nav_from, is_create,
        phone_validate_msg, email_validate_msg, username_validate_msg, validate_ph_no, validate_email_no, popup_msg, profile_pic,
        is_added, is_updated,

        search_by_string, search_by_alphabet,
        supervisors, page_no, page_limit
    }
};

const mapDispatchToProps = dispatch => {

    return {
        setdata: (input) => {
            dispatch(setdata(input));
        }, addsupervisor: (input) => {
            dispatch(addsupervisor(input));
        }, getallprecincts: (input) => {
            dispatch(getallprecincts(input));
        }, validateform: (msg) => {
            dispatch(validateform(msg));
        }, getsupervisor: (d) => {
            dispatch(getsupervisor(d));
        }, page_refresh: () => {
            dispatch(page_refresh());
        }, editsupervisor: (i) => {
            dispatch(editsupervisor(i));
        }, checkUserNameExist: (st) => {
            dispatch(checkUserNameExist(st));
        }, checkEmailExist: (st) => {
            dispatch(checkEmailExist(st));
        }, checkPhoneNumberExist: (st) => {
            dispatch(checkPhoneNumberExist(st));
        }, setvalidationemaildata: (st) => {
            dispatch(setvalidationemaildata(st));
        }, setvalidationphonedata: (st) => {
            dispatch(setvalidationphonedata(st));
        }, resetvalidatedata: () => {
            dispatch(resetvalidatedata());
        }, uploadpic: (img) => {
            dispatch(uploadpic(img));
        }, getSupervisors: (input) => {
            dispatch(getallsupervisors(input));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SuperVisorEditCreateDialog);