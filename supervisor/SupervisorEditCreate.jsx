import React, { Component } from 'react'
import { Link, useHistory } from "react-router-dom";
import Header from '../commons/Header'
import Footer from '../commons/Footer'
import { setdata, addsupervisor, set_group_id, validateform, getsupervisor, page_refresh, editsupervisor, uploadpic } from '../redux/actions/SupervisorDetailsActions';
import { checkUserNameExist, checkEmailExist, checkPhoneNumberExist, setvalidationemaildata, setvalidationphonedata, resetvalidatedata } from '../redux/actions/ValidateActions';
import { getallprecincts } from '../redux/actions/PrecinctActions';
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


class SupervisorEditCreate extends Component {
    constructor(props) {
        super(props)
        this.props.page_refresh();
        this.props.resetvalidatedata();
    }

    render() {

        const { error, loading,
            group_id,
            first_name, last_name, address, city, u_state, zipcode, email, mobile, work_phone, cell_number, home_phone,
            mname, sex, race, date_of_birth, ethnicity, marital_status, SSN, nav_from, is_create, image_url, officer_id,
            phone_validate_msg, email_validate_msg, username_validate_msg,
            precinct_id, precincts } = this.props;
        var groupDetailsUrl = "/groups/" + group_id + "/details";
        var usa_states_data = [];
        var precincts_list = [];

        usa_states_data.push(<option key="state" value="">Select</option>);
        usa_states.forEach((item, index) => {
            usa_states_data.push(
                <option key={index} value={item.abbreviation}>{item.abbreviation}</option>
            )
        });


        precincts_list.push(<option key="00" value="">Select</option>)
        precincts.forEach((item, index) => {
            precincts_list.push(
                <option key={index} value={item.id}>{item.precinct_name}</option>
            )
        });
        var dob = date_of_birth ? dataformat(date_of_birth) : null;
        var location_today_date = todaydate();

        return (
            <div>
                <Header />
                <ToastContainer />
                <DeleteSupervisor parentProps={this.props} />
                {loading && <Loader />}
                <div className="breadcrumb_talitrix">
                    <div className="container">
                        <div className="row">
                            <div className="col">

                                <div style={{ fontSize: '19px' }}>
                                    <i class="fa fa-home"></i><span><Link to={URL.NAV_HOME} style={{ color: 'black' }}>&nbsp; Home&nbsp;</Link></span>
                                    {is_create ? <><span><i class="fa fa-angle-double-right"></i></span><span><a style={{ color: 'black' }}>&nbsp; Add Supervisor</a></span></>
                                        : <><span><i class="fa fa-angle-double-right"></i></span><span><a style={{ color: 'black' }}>&nbsp; Edit Supervisor</a></span></>}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <section className="main_content py-5">
                    <div className="container">
                        <section className="header_controls mb-4">
                            <div className="row align-items-center">
                                <div className="col-md-6">
                                    <h4 className="text-uppercase">{is_create ? 'Add Supervisor' : 'Edit Supervisor'}</h4>
                                </div>
                                <div className="col text-right">
                                    {!is_create && false && <div className="btn-group bordered_btn_grp" role="group"><button className="btn btn-light" data-toggle="modal" data-target="#delete_item" type="button">Delete</button></div>}
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="container">
                        <section className="header_controls">
                            <div className="row align-items-center">
                                <div className="col-md-12">
                                    <form className="form_section py-4">
                                        <div className="form-group row mb-0">
                                            <div className="col-sm-4">
                                                <h5>Supervisor Info</h5>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group"><label className="font-size-14">First Name</label><input className="form-control" type="text" value={first_name} ref="first_name" name="first_name" onChange={this.handleChange} id="first_name" /></div>
                                            </div>

                                            <div className="col-sm-4">
                                                <div className="form-group"><label className="font-size-14">Last Name</label><input className="form-control" value={last_name} ref="last_name" name="last_name" onChange={this.handleChange} id="last_name" type="text" /></div>
                                            </div>



                                            <div className="col-sm-4"></div>
                                            <div className="col-sm-8">
                                                <div className="form-group"><label className="font-size-9">Address</label><input value={address} ref="address" name="address" onChange={this.handleChange} className="form-control" type="text" /></div>
                                            </div>


                                            <div className="col-sm-4"></div>
                                            <div className="col-sm-3">
                                                <div className="form-group"><label className="font-size-14">City</label><input className="form-control" type="text" value={city} ref="city" name="city" onChange={this.handleChange} /></div>
                                            </div>
                                            <div className="col-sm-2">
                                                <div className="form-group"><label className="font-size-14">State</label>
                                                    <select className="form-control" value={u_state} ref="u_state" name="u_state" onChange={this.handleChange} >
                                                        {usa_states_data}
                                                    </select></div>
                                            </div>
                                            <div className="col-sm-3">
                                                <div className="form-group"><label className="font-size-14">Zipcode</label><input className="form-control" type="number" value={zipcode} ref="zipcode" name="zipcode" onChange={this.handleChange} /></div>
                                            </div>


                                            <div className="col-sm-4"></div>
                                            <div className="col-sm-4">
                                                <div className="form-group"><label className="font-size-14">Email</label>
                                                    <input className="form-control" type="text" value={email} ref="email" name="email" onChange={this.handleEmailExist} />
                                                    <p className="text-primary">{email_validate_msg}</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
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
                                            <div className="col-sm-4"  ></div>
                                            <div className="col-sm-8">
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
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-md-12">
                                    <div className="mt-4 text-right"><button className="btn btn-primary btn-theme" type="button" onClick={() => this.createSupervisor()}>Submit</button></div>
                                </div>
                            </div>
                        </section>
                    </div>
                </section>

                <Footer />
            </div>
        )
    }
    componentDidMount() {
        var supervisor_id = this.props.match.params.supervisor_id;
        if (supervisor_id) {
            var getsupervisorinfo = { supervisor_id: supervisor_id };
            this.props.getsupervisor(getsupervisorinfo);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // check whether client has 
        const { group_id, submit_success, item_deleted } = this.props;
        if (prevProps.group_id !== group_id) {
            const dataObject = {
                search_by_string: "", search_by_alphabet: "",
                page_no: 1, page_limit: 100, group_id: group_id
            }
            if (group_id) {
                this.props.getallprecincts(dataObject);
            }
        }
        if (submit_success) {
            setTimeout(() => {
                this.props.history.goBack();
            }, 1000);
        }
        if (item_deleted) {
            setTimeout(() => {
                this.props.history.push("/groups/" + group_id + "/details");
            }, 1000);
        }

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

        const { error, group_id, id,
            first_name, last_name, address, city, u_state, zipcode, email, mobile, work_phone, cell_number, home_phone,
            mname, sex, race, date_of_birth, ethnicity, marital_status, SSN, image_url,
            precinct_id, officer_id, status,
        } = this.props;


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
            var data = { name: event.target.name, value: value ? '+' + value : '' };
            this.props.setdata(data);
            if (validate_ph_no != data.value) {
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

}




const mapStateToProps = state => {
    const { error, loading, group_id,
        first_name, last_name, address, city, u_state, zipcode, email, mobile, work_phone, cell_number, home_phone,
        mname, sex, race, date_of_birth, ethnicity, marital_status, SSN,
        precinct_id, id, submit_success, officer_id, status, nav_from, is_create, item_deleted,
        validate_ph_no, validate_email_no, image_url
    } = state.supervisor_details;
    const { precincts } = state.groups_precinct;
    const { phone_validate_msg, email_validate_msg, username_validate_msg } = state.validate;
    return {
        error, loading, group_id,
        first_name, last_name, address, city, u_state, zipcode, email, mobile, work_phone, cell_number, home_phone,
        mname, sex, race, date_of_birth, ethnicity, marital_status, SSN,
        precinct_id, id, precincts, submit_success, officer_id, status, nav_from, is_create,
        phone_validate_msg, email_validate_msg, username_validate_msg, validate_ph_no, validate_email_no, image_url

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
        }, setgroupId: (data) => {
            dispatch(set_group_id(data));
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
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SupervisorEditCreate);