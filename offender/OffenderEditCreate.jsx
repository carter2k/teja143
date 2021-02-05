import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Header from '../commons/Header'
import Search from '../commons/Search'
import Footer from '../commons/Footer'
import {
    setdata, setPerimeter, onchangePerimeterType, addoffender, getoffender,
    set_group_id, errormsg, page_refresh, editoffender, getgoogleplaces, getgoogleaddress, uploadpic, uploadpicfetch,
    updatecurfewTime, setdates
} from '../redux/actions/OffenderDetailsActions';
import {
    checkUserNameExist, checkEmailExist, checkPhoneNumberExist,
    setvalidationemaildata, setvalidationphonedata, resetvalidatedata,
    checkVictimPhoneNumberExist, checkVictimExist
} from '../redux/actions/ValidateActions';
import { getalloffenders } from '../redux/actions/OffendersActions';
import { getallbracelets, bracelet_page_refresh } from '../redux/actions/BraceletsActions';
import { getallprecincts } from '../redux/actions/PrecinctActions';
import usa_states from '../DUMMY_DATA/usa_states.json'
import { MENU, URL, BAND_STATUS } from '../helpers/Constans';
import { connect } from 'react-redux';
import { validate_OffendersForm, getBase64, heightvalidation } from '../utils/validation';
import Map from '../maps/Map';
import config from '../../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GooglePlacesAutoComplete from '../maps/GooglePlacesAutoComplete';
import Loader from '../commons/Loading';
import PhoneInput from 'react-phone-input-2';
import DeleteOffender from './DeleteOffender';
import { getallsupervisors } from '../redux/actions/SupervisorActions';
import DatePicker from "react-datepicker";
import {
    dataformat, todaydate, dateTost, filter_country_code,
    requestdataformat24, diffdate, dhms, requestdataformatUTC, convertMS
} from "../helpers/globalHelpers/Utils";
const GOOGLE_MAP_API_KEY = config.GOOGLE_MAP_API_KEY;


const google_map_url = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;


class OffenderEditCreate extends Component {
    constructor(props) {
        super(props)
        this.props.page_refresh();
        this.props.bracelet_page_refresh(true);
        this.props.resetvalidatedata();
    }

    render() {

        var { error, loading,
            bracelet_id, first_name, last_name, address, city, u_state, zipcode, email, phone1, phone2, phone3, mobile, group_id,
            supervisor, precinct_id, victim_first_name, victim_last_name, perimeters, is_create, nav_from, image_url, sex,
            perimeter_size, supervisors, precincts, bracelets, date_of_birth, offender,
            phone_validate_msg, victim_phone_validate_msg, email_validate_msg, username_validate_msg,
            victim_fname, victim_lname, victim_mobile, case_number, case_id,
            curfew_from, curfew_to, curfew_time, location_today_date, location_initial_date, offender_id,
            SSN, race, ethnicity, offender_type, height, weight, filter_times } = this.props;
        var usa_states_data = [];
        var supervisor_list = [];
        var precincts_list = [];
        var bracelets_data = [];

        usa_states_data.push(<option key="state" value="">Select</option>);
        usa_states.forEach((item, index) => {
            usa_states_data.push(
                <option key={index} value={item.abbreviation}>{item.abbreviation}</option>
            )
        });

        supervisor_list.push(<option key="emp" value=''>Select</option>)
        supervisors.forEach((item, index) => {
            supervisor_list.push(
                <option key={index} value={item.id}>{item.fname}</option>
            )
        });

        precincts_list.push(<option key="emp1" value=''>Select</option>)
        precincts.forEach((item, index) => {
            precincts_list.push(
                <option key={index} value={item.id}>{item.precinct_name}</option>
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
        var t_st = convertMS(curfew_time);
        console.log("filter_times", filter_times)

        // race = race ? race.trim() : race;
        return (
            <div>
                {loading && <Loader />}
                <Header />
                <ToastContainer />
                <DeleteOffender parentProps={this.props} />
                <div className="breadcrumb_talitrix">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div style={{ fontSize: '19px' }}>
                                    <i class="fa fa-home"></i><span><Link to={URL.NAV_HOME} style={{ color: 'black' }}>&nbsp; Home&nbsp;</Link></span>
                                    {offender_id ? <><span><i class="fa fa-angle-double-right"></i></span><span><a style={{ color: 'black' }}>&nbsp; Edit Offender</a></span></>
                                        : <><span><i class="fa fa-angle-double-right"></i></span><span><a style={{ color: 'black' }}>&nbsp; Add Offender</a></span></>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="main_content py-5">
                    <div className="container">
                        <section className="header_controls mb-3">
                            <div className="row align-items-center">
                                <div className="col-md-6">
                                    <h4 className="text-uppercase">{offender_id ? 'Edit Offender' : 'Add Offender'}</h4>
                                </div>
                                <div className="col text-right">
                                    {/*       {!is_create && <div className="btn-group bordered_btn_grp" role="group"><button className="btn btn-light" data-toggle="modal" data-target="#delete_item" type="button">x</button></div>}
                               */}  </div>
                            </div>
                        </section>
                    </div>
                    <div className="container">
                        <section className="header_controls">
                            <div className="row align-items-center">

                                {BAND_STATUS && <div className="col-md-12">
                                    <form className="form_section py-4">
                                        <div className="form-group row mb-0">
                                            <div className="col-sm-4">
                                                <h5>Bracelet Info</h5>
                                            </div>
                                            <div className="col-sm-4">
                                                <select className="form-control" value={bracelet_id} ref="bracelet_id" name="bracelet_id" onChange={this.handleChange} id="bracelet_id" >
                                                    {bracelets_data}
                                                </select>

                                            </div>
                                        </div>
                                    </form>
                                </div>}

                                <div className="col-md-12">
                                    <form className="form_section py-3">
                                        <div className="form-group row mb-0">


                                            <div className="col-sm-4">  <h5>Offender Info</h5></div>
                                            <div className="col-sm-4">
                                                <div className="form-group"><label className="font-size-14">First Name</label><input className="form-control" type="text" value={first_name} ref="first_name" name="first_name" onChange={this.handleChange} id="first_name" /></div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group"><label className="font-size-14">Last Name</label><input className="form-control" value={last_name} ref="last_name" name="last_name" onChange={this.handleChange} id="last_name" type="text" /></div>
                                            </div>

                                            <div className="col-sm-4"></div>
                                            <div className="col-sm-8">
                                                <div className="form-group"><label className="font-size-14">Address</label><input value={address} ref="address" name="address" onChange={this.handleChange} className="form-control" type="text" /></div>
                                            </div>

                                            <div className="col-sm-4"></div>
                                            <div className="col-sm-4">
                                                <div className="form-group"><label className="font-size-14">City</label><input className="form-control" type="text" value={city} ref="city" name="city" onChange={this.handleChange} /></div>
                                            </div>
                                            <div className="col-sm-2">
                                                <div className="form-group"><label className="font-size-14">State</label>
                                                    <select className="form-control" value={u_state} ref="u_state" name="u_state" onChange={this.handleChange} >
                                                        {usa_states_data}
                                                    </select></div>
                                            </div>
                                            <div className="col-sm-2">
                                                <div className="form-group"><label className="font-size-14">Zipcode</label><input className="form-control" type="number" value={zipcode} ref="zipcode" name="zipcode" onChange={this.handleChange} /></div>
                                            </div>

                                            <div className="col-sm-4"></div>
                                            <div className="col-sm-4">
                                                <div className="form-group"><label className="font-size-8">Email</label>
                                                    <input className="form-control" type="text" value={email} ref="email" name="email" onChange={this.handleEmailExist} />
                                                    <p className="text-primary">{email_validate_msg}</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group"><label className="font-size-14">Phone</label>
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



                                            <div className="col-sm-4"></div>
                                            <div className="col-sm-4">
                                                <div className="form-group" ><label className="font-size-14">Social Security</label><input className="form-control" type="text" value={SSN} ref="SSN" name="SSN" onChange={this.handleChange} /></div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group date-picker-ht"><label className="font-size-14">Date Of Birth</label>
                                                    <DatePicker
                                                        selected={dob}
                                                        className="form-control w-100"
                                                        onChange={(date) => this.handleDateToChange(date)}
                                                        maxDate={location_today_date}
                                                        placeholderText="dd/mm/yyyy"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-sm-4"></div>
                                            <div className="col-sm-4">
                                                <div className="form-group" ><label className="font-size-14">Race</label>
                                                    <select className="form-control" value={race} ref="race" name="race" onChange={this.handleChange} id="race" >
                                                        <option value='' >Select</option>
                                                        <option value='American Indian or Alaska Native' >American Indian or Alaska Native</option>
                                                        <option value='Asian'>Asian</option>
                                                        <option value='Black or African American'>Black or African American</option>
                                                        <option value='Native Hawaiian or Other Pacific Islander'>Native Hawaiian or Other Pacific Islander</option>
                                                        <option value='White'>White</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group"><label className="font-size-14">Sex</label>
                                                    <select className="form-control" value={sex} ref="sex" name="sex" onChange={this.handleChange} >
                                                        <option key="select" value="0">Select</option>
                                                        <option key="male" value="male">Male</option>
                                                        <option key="female" value="female">Female</option>
                                                    </select></div>
                                            </div>

                                            <div className="col-sm-4"></div>
                                            <div className="col-sm-4">
                                                <div className="form-group" ><label className="font-size-14">Height (ft)</label>
                                                    <input className="form-control" type="text" value={height} ref="height" name="height" onChange={this.handleChange} />
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group"><label className="font-size-14">Weight (pounds)</label>
                                                    <input className="form-control" type="number" value={weight} ref="weight" name="weight" onChange={this.handleChange} />
                                                </div>
                                            </div>

                                            <div className="col-sm-4"></div>
                                            <div className="col-sm-4">
                                                <div className="form-group"><label className="font-size-14">Supervisor</label>
                                                    <select className="form-control" value={supervisor} ref="supervisor" name="supervisor" onChange={this.handleChange} >
                                                        {supervisor_list}
                                                    </select></div>

                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group"><label className="font-size-14">Offenders</label>
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
                                                    </select></div>

                                            </div>

                                        </div>


                                    </form>

                                </div>


                                <div className="col-md-12">
                                    <form className="form_section py-3">
                                        <div className="form-group row mb-0">
                                            <div className="col-sm-4">
                                                <h5>Location Perimeter</h5>
                                            </div>
                                            <div className="col-sm-8 down_arrow">
                                                <Map
                                                    center={{ lat: 40.64, lng: -73.96 }}
                                                    zoom={12}
                                                    dynamickeyrequired={true}
                                                    googleMapURL={google_map_url}
                                                    loadingElement={<div style={{ height: `100%` }} />}
                                                    containerElement={<div style={{ height: `400px` }} />}
                                                    mapElement={<div style={{ height: `100%` }} />}
                                                />


                                                <div class="d-flex mt-4">
                                                    <div class="d-flex map_dtl_list align-items-center mr-4"><img class="mr-3" src="assets/img/brd_map.svg" />
                                                        <p class="mb-0 font-weight-bold font-size-14">Location Zone Home</p>
                                                    </div>
                                                    <div class="d-flex map_dtl_list align-items-center mr-4"><img class="mr-3" src="assets/img/double_brd_map.svg" />
                                                        <p class="mb-0 font-weight-bold font-size-14">Location Zone Work</p>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>

                                        <div className="form-group row mb-0">

                                            <div className="col-sm-4"></div>
                                            <div className="col-sm-8 mt-3">
                                                <div className="border-top-dark my-4"></div>
                                                <div className="col-sm-6 p-0 mt-3">
                                                    <select className="form-control" value={perimeters} ref="perimeters" name="perimeters" onChange={this.handleChange} id="perimeters" >
                                                        <option value='1' >EDIT HOME PERIMETER</option>
                                                        <option value='2'>EDIT WORK PERIMETER</option>

                                                    </select>
                                                </div>


                                                <div className="form-group"><label className="font-size-14">Location Center(Center of Perimeter)</label>
                                                    <GooglePlacesAutoComplete />
                                                </div>


                                                <div className="form-group"><label className="font-size-14">Size of Perimeter</label>
                                                    <input className="form-control" type="number" value={perimeter_size} ref="perimeter_size" name="perimeter_size" onChange={this.handleChange} /></div>
                                            </div>
                                            <div className="col-sm-4"  ></div>
                                            <div className="col-sm-8" style={{ borderTop: "1px solid rgb(222, 226, 240)" }}>
                                                <div className="d-flex align-items-center">
                                                    <div className="img_circle">
                                                        {image_url ? (
                                                            <img src={image_url} />
                                                        ) : (
                                                                <img src="assets/img/p_pic.png" />
                                                            )}
                                                    </div>
                                                    <div class="mb-1">
                                                        <div>
                                                            <input
                                                                type="file"
                                                                id="user_group_logo"
                                                                class="custom-file-input"
                                                                onChange={this.onChangeHandler}
                                                                name="user_group_logo"
                                                                accept="image/*"
                                                            />
                                                            <div class="text-center">
                                                                <label id="user_group_label" for="user_group_logo">
                                                                    <i class="fa fa-upload"></i> Choose profile pic...
                              </label>
                                                                <p className="text-primary">
                                                                    Image should be max 1 MB
                              </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-4"></div>
                                            <div className="col-sm-8 mt-3">
                                                <div className="text-right"><button className="btn btn-primary btn-theme" type="button" onClick={() => this.createOffender()}>Submit</button></div>
                                            </div>
                                        </div>
                                    </form>

                                </div>


                                {offender_id && <div class="col-md-12 curfew-sec">
                                    <form class="form_section py-3">
                                        <div class="form-group row mb-0">
                                            <div class="col-sm-4">
                                                <h5>Curfew</h5>
                                            </div>
                                            <div className="col-sm-8">
                                                <div className="row">
                                                    <div className="col-sm-7">
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <div className="form-group">
                                                                    <label className="font-size-14">Curfew From Date</label>
                                                                    <DatePicker
                                                                        selected={curfew_from}
                                                                        excludeOutOfBoundsTimes
                                                                        className="form-control"
                                                                        onChange={date => this.handleDateFromChange(date)}
                                                                        showTimeSelect
                                                                        excludeTimes={[]}
                                                                        timeFormat="p"
                                                                        timeIntervals={15}
                                                                        dateFormat="Pp"
                                                                        minDate={location_today_date}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <div className="form-group">
                                                                    <label className="font-size-14">Curfew To Date</label>
                                                                    <DatePicker
                                                                        selected={curfew_to}
                                                                        excludeOutOfBoundsTimes
                                                                        className="form-control w-100"
                                                                        onChange={date => this.handleCurfewDateToChange(date)}
                                                                        showTimeSelect
                                                                        excludeTimes={[]}
                                                                        timeFormat="p"
                                                                        timeIntervals={15}
                                                                        dateFormat="Pp"
                                                                        minDate={curfew_from ? curfew_from : location_today_date}
                                                                    />
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>

                                                    <div className="col-sm-2">

                                                    </div>
                                                    <div className="col-sm-3">
                                                        <button onClick={() => this.submit_cufew_time()} className="btn btn-primary btn-theme mt-4 ml-4 btn-sm btn-dark">Submit</button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-4"></div>
                                            <div className="col-sm-8">
                                                {t_st && ('Curfew Time: ')}  <b>  {t_st}  </b>
                                            </div>


                                        </div>
                                    </form>
                                </div>}

                            </div>

                        </section>
                    </div>
                </section>

                <Footer />
            </div>
        )
    }


    filterPassedTime(time) {
        console.log("ddtime", time)
        const currentDate = new Date();
        const selectedDate = new Date(time);
        return currentDate.getTime() < selectedDate.getTime();
    }

    componentDidMount() {
        var offender_id = this.props.match.params.offender_id;
        const dataObject = {
            search_by_string: "", search_by_alphabet: "",
            page_no: 1, page_limit: 0
        }
        if (offender_id) {
            var getoffenderinfo = { offender_id: offender_id };
            this.props.getoffender(getoffenderinfo);
        }
        this.props.getSupervisors(dataObject);
    }

    componentDidUpdate(prevProps, prevState) {
        // check whether client has 
        const { submit_success, offender_id, bracelet_id } = this.props;
        if (prevProps.offender_id !== offender_id) {
            const braceletdataObject = {
                search_by_string: "", search_by_alphabet: "",
                page_no: 1, page_limit: 100, group_id: '0'
            }
            if (offender_id) {
                this.props.getallbracelets(braceletdataObject, bracelet_id ? bracelet_id : 'new');
            }
        }
        if (submit_success) {
            setTimeout(() => {
                this.props.history.goBack();
            }, 1000);
        }
    }

    onChangeHandler = event => {
        var props = this.props;
        let file = event.target.files[0];

        if (file && file.size > 1 * 1024 * 1024) {
            toast.error("Profile Pic Should not be more than 1MB", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
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
            console.log('Error: ', error);
        };

    }


    handleChange = (e) => {
        var data = { name: e.target.name, value: e.target.value }

        if (e.target.name == 'perimeter_size') {
            var pinfo = { radius: e.target.value }
            this.props.setPerimeter(pinfo);
        } else if (e.target.name == 'perimeters') {
            this.props.onchangePerimeterType(e.target.value);
        } else if (e.target.name == 'zipcode') {
            console.log("zipcodee", e.target.value.length, e.target.value)
            if (e.target.value.length <= 5) {
                this.props.setdata(data)
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
        } else if (e.target.name == "height") {

            data.value = heightvalidation(data.value);
            if (data.value !== false) {
                this.props.setdata(data)
            }

        } else {
            this.props.setdata(data)
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

    handleVictimPhoneChange = (value, country, event) => {
        const { victim_validate_ph_no, mobile } = this.props;
        if (event && event.target && event.target.name) {
            var data = { name: event.target.name, value: value ? '+' + value : '' };
            this.props.setdata(data);
            if (victim_validate_ph_no != data.value) {
                this.props.checkVictimPhoneNumberExist(data)
            } else {
                this.props.checkVictimExist("");
            }
        }
    };

    handleEmailExist = (e) => {
        const { validate_email_no } = this.props;
        var data = { name: e.target.name, value: e.target.value }
        this.props.setdata(data)
        console.log("check val", validate_email_no, data.value)
        if (validate_email_no != data.value) {
            this.props.checkEmailExist(data)
        } else {

            this.props.setvalidationemaildata("");
        }
    }

    geoplaces = (e) => {
        this.props.getgoogleplaces(e.target.value);
    }




    handleDateToChange = (date) => {
        console.log("date", date)
        if (date) {
            var data = { name: "date_of_birth", value: date };
            data.value = dateTost(date);
            this.props.setdata(data);
        }
    };


    handleDateFromChange = (date) => {
        var data = { name: "curfew_from", value: date }
        this.props.setdates(data);
    }

    handleCurfewDateToChange = (date) => {
        var data = { name: "curfew_to", value: date }
        this.props.setdates(data);
    }
    submit_cufew_time() {
        var { offender_id, id, curfew_from, curfew_to, curfew_time
        } = this.props;
        curfew_from = requestdataformatUTC(curfew_from);
        curfew_to = requestdataformatUTC(curfew_to)
        let data = {
            offender_id: offender_id,
            curfew_from: curfew_from,
            curfew_to: curfew_to,
            curfew_time: curfew_time + ''//sec
        }
        this.props.updatecurfewTime(data);
    }

    createOffender() {
        const { offender_id, id,
            bracelet_id, first_name, last_name, address, city, u_state, zipcode, email, mobile, phone1, phone2, phone3,
            supervisor, precinct_id, victim_first_name, victim_last_name, email_validate_msg,
            perimeters, home_zone, work_zone, restrict_zone, perimeter_size, nav_from, is_create, image_url,
            victim_fname, victim_lname, victim_mobile, case_number, case_id,
            date_of_birth, sex,
            SSN, race, ethnicity, offender_type, height, weight
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
            offender_type: offender_type,
            email: email,
            date_of_birth: date_of_birth,
            image_url: image_url,
            bracelet_id: bracelet_id,
            home_zone: JSON.stringify(home_zone),
            work_zone: JSON.stringify(work_zone),
            restrict_zone: JSON.stringify(restrict_zone),
            height: height,
            weight: weight
        };

        if (offender_id) {
            data['offender_id'] = offender_id;
            data['status'] = "1";
            data["id"] = id;
            this.props.editoffender(data);
        } else {
            this.props.addoffender(data);
        }

    }

}


const mapStateToProps = state => {
    const { error, loading, group_id, offender_id, submit_success, id,
        bracelet_id, first_name, last_name, address, city, u_state, zipcode, email, phone1, phone2, phone3, mobile,
        supervisor, precinct_id, victim_first_name, victim_last_name, perimeters,
        home_zone, work_zone, restrict_zone, perimeter_size, nav_from, is_create,
        offender_location_lat, offender_location_lng, offender_location_address, image_url,
        validate_ph_no, validate_email_no,
        location_from_date, location_to_date, location_today_date, location_initial_date,
        victim_fname, victim_lname, victim_mobile, case_number, case_id, date_of_birth, sex,
        SSN, race, ethnicity, offender_type, height, weight,
        curfew_from, curfew_to, curfew_time, filter_times
    } = state.offender_details;

    const { supervisors } = state.groups_supervisor;
    const { precincts } = state.groups_precinct;
    const { bracelets } = state.groups_braceltes;
    const { phone_validate_msg, victim_phone_validate_msg, email_validate_msg, username_validate_msg } = state.validate;

    return {
        error, loading, group_id, offender_id, submit_success, id,
        bracelet_id, first_name, last_name, address, city, u_state, zipcode, email, phone1, phone2, phone3, mobile,
        supervisor, precinct_id, victim_first_name, victim_last_name, perimeters,
        home_zone, work_zone, restrict_zone, perimeter_size, nav_from, is_create,
        offender_location_lat, offender_location_lng, offender_location_address, image_url, bracelets,
        supervisors, precincts,
        location_from_date, location_to_date, location_today_date, location_initial_date,
        phone_validate_msg, email_validate_msg, username_validate_msg,
        validate_ph_no, validate_email_no, victim_phone_validate_msg,
        victim_fname, victim_lname, victim_mobile, case_number, case_id, date_of_birth, sex,
        SSN, race, ethnicity, offender_type, height, weight,
        curfew_from, curfew_to, curfew_time, filter_times
    }
};

const mapDispatchToProps = dispatch => {

    return {
        setdata: (input) => {
            dispatch(setdata(input));
        }, setPerimeter: (input) => {
            dispatch(setPerimeter(input));
        }, onchangePerimeterType: (input) => {
            dispatch(onchangePerimeterType(input));
        }, addoffender: (input) => {
            dispatch(addoffender(input));
        }, getoffender: (input) => {
            dispatch(getalloffenders(input));
        }, getallprecincts: (input) => {
            dispatch(getallprecincts(input));
        }, setgroupId: (data) => {
            dispatch(set_group_id(data));
        }, errormsg: (data) => {
            dispatch(errormsg(data));
        }, page_refresh: () => {
            dispatch(page_refresh());
        }, editoffender: (data) => {
            dispatch(editoffender(data));
        }, getoffender: (input) => {
            dispatch(getoffender(input));
        }, getgoogleplaces: (input) => {
            dispatch(getgoogleplaces(input));
        }, getgoogleaddress: (lat, lng) => {
            dispatch(getgoogleaddress(lat, lng));
        }, uploadpic: (img) => {
            dispatch(uploadpic(img));
        }, getallbracelets: (input, filter_id) => {
            dispatch(getallbracelets(input, filter_id));
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
        }, uploadpicfetch: (img) => {
            dispatch(uploadpicfetch(img));
        }, bracelet_page_refresh: (data) => {
            dispatch(bracelet_page_refresh(data));
        }, checkVictimPhoneNumberExist: (data) => {
            dispatch(checkVictimPhoneNumberExist(data));
        }, checkVictimExist: (data) => {
            dispatch(checkVictimExist(data));
        }, getSupervisors: (input) => {
            dispatch(getallsupervisors(input));
        }, updatecurfewTime: (input) => {
            dispatch(updatecurfewTime(input));
        }, setdates: (input) => {
            dispatch(setdates(input));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(OffenderEditCreate);