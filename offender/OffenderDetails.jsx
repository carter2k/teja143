import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Header from '../commons/Header'
import Search from '../commons/Search'
import Footer from '../commons/Footer'
import moment from 'moment'

import { getoffender, getgoogleaddress, getoffendersLocationHistory, setdates, page_refresh } from '../redux/actions/OffenderDetailsActions';
import Map from '../maps/FunctionalMap';
import { MENU, URL, BAND_STATUS } from '../helpers/Constans';
import { connect } from 'react-redux';
import config from '../../config';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../commons/Loading';
import LocationLoader from '../commons/LocationLoader'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { dateconvert1, currentdate, locationMindate, locationfromMindate, requestdataformat, requestdataformat24, convertMS } from '../helpers/globalHelpers/Utils';
const GOOGLE_MAP_API_KEY = config.GOOGLE_MAP_API_KEY;
const google_map_url = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;


class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.props.page_refresh();
    this.state = {
      markervalue: '',
      startDate: new Date(),
      endDate: new Date(),



    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);

  }


  render() {
    /*     const range = moment().range(this.state.startDate, this.stateendDate) */
    const { error, loading, group_id,
      bracelet_id, first_name, last_name, address, city, u_state, zipcode, email, phone1, phone2, phone3, mobile,
      supervisor, precinct_id, victim_first_name, victim_last_name, perimeters,
      perimeter_size, supervisors, precincts, bracelet_serial_number, image_url,
      location_from_date, location_to_date, location_today_date, location_initial_date,
      supervisor_address, supervisor_cell_number, supervisor_city, supervisor_home_pone,
      supervisor_mobile, supervisor_state, supervisor_work_pone, supervisor_zip,
      supervisor_email, supervisor_name, supervisor_phone,
      precinct_address, precinct_city, precinct_email, precinct_name, precinct_phone, precinct_state, precinct_zip, user,
      victim_fname, victim_lname, victim_mobile, case_number, case_id, location_history_data, historyLocationloading,
      curfew_from, curfew_to, curfew_time
    } = this.props;
    var t_st = convertMS(curfew_time);
    let locationhistory = [];
    location_history_data.forEach((row, index) => {
      locationhistory.push(
        <div className="location_history" onClick={() => this.clickonaddress(row)} >
          <p className="mb-0">{row.address} </p>
          <strong>{requestdataformat(row.time)}</strong>
        </div>
      )
    });

    return (
      <div>
        {loading && <Loader />}
        <Header />
        <ToastContainer />
        <div class="breadcrumb_talitrix">
          <div class="container">
            <div class="row">
              <div class="col">
                <div style={{ fontSize: '19px' }}>
                  <i class="fa fa-home"></i><span><Link to={URL.NAV_HOME} style={{ color: 'black' }}>&nbsp; Home&nbsp;</Link></span><span>
                    <i class="fa fa-angle-double-right"></i></span><span><Link to={URL.NAV_OFFENDERS} style={{ color: 'black' }}>&nbsp; Offenders&nbsp;</Link></span><span>
                    <i class="fa fa-angle-double-right"></i></span><span><a style={{ color: 'black' }}>&nbsp; Offender Details</a></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section class="main_content py-5">
          <div class="container">
            <section class="header_controls mb-3">
              <div class="row align-items-center">
                <div class="col-md-6">
                  <h4 class="text-uppercase">{first_name} {last_name}
                    <button className="btn btn-primary ml-4 btn-sm btn-dark">Offender</button>
                  </h4>
                </div>
                <div className="col-md-6 text-right" >
                  {user && (user.role_id == 2) && <button onClick={() => this.redirectto_edit_offender()} className="btn btn-primary btn-theme ml-4 btn-sm btn-dark">Edit</button>}
                </div>
              </div>
            </section>
          </div>
          <div class="container">
            <section class="header_controls">
              <div class="row align-items-center">
                <div class="col-md-12">
                  <form class="form_section py-3">
                    <div class="form-group row mb-0">
                      <div class="col-sm-3">
                        <div className="img_circle">
                          {image_url ? <img src={image_url} /> :
                            <img src="assets/img/p_pic.png" />}
                        </div>
                      </div>
                      {BAND_STATUS && <div class="col-sm-3">
                        <p className="text-uppercase font-weight-bold mb-0">Bracelet</p>
                        <h4 className="text_underline font-weight-bold">{bracelet_serial_number ? bracelet_serial_number : ""}</h4>
                      </div>}
                      <div class="col-sm-3">
                        <p>{address} <br /> {city} {u_state} {zipcode} <br /> {mobile}</p>
                      </div>

                    </div>
                  </form>
                </div>
                <div class="col-md-12">
                  <form class="form_section py-3">
                    <div class="form-group row mb-0">
                      <div class="col-sm-3">
                        <h5>Supervisor</h5>
                      </div>
                      <div class="col-sm-3">
                        <p class="font-size-14 mb-0"><strong onClick={() => this.redirectTOSupervisor(supervisor)}><a class="text_link">{supervisor_name}</a></strong> <br /> {supervisor_mobile} <br /> {supervisor_email}</p>
                      </div>
                      <div class="col-sm-3">
                        <p class="font-size-14 mb-0"><strong>{supervisor_address}</strong> <br />  {supervisor_city}<br /> {supervisor_state} {supervisor_zip}</p>
                      </div>
                    </div>
                  </form>
                </div>



                {victim_mobile && <div class="col-md-12">
                  <form class="form_section py-3">
                    <div class="form-group row mb-0">
                      <div class="col-sm-3">
                        <h5>Victim</h5>
                      </div>

                      <div class="col-sm-3">
                        <p>{victim_fname} {victim_lname} <br /> {victim_mobile}</p>
                      </div>

                    </div>
                  </form>
                </div>}

                {curfew_from && <div class="col-md-12">
                  <form class="form_section py-3">
                    <div class="form-group row mb-0">
                      <div class="col-sm-3">
                        <h5>Curfew</h5>
                      </div>

                      <div class="col-sm-6">
                        <p>Curfew From: <b>{dateconvert1(curfew_from)}</b>  <br />Curfew To&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<b>{dateconvert1(curfew_to)}</b></p>
                      </div>
                      <div className="col-sm-3">
                        {t_st && ('Curfew Time ')} <br /> <b>  {t_st}  </b>
                      </div>

                    </div>
                  </form>
                </div>}


                <div class="col-md-12 mt-4 down_arrow">
                  <div class="row align-items-center mb-3 offender-search-dates">
                    <div class="col-md-6">
                    </div>
                    <div class="col-md-6 pr-4 text-right d-flex align-items-center justify-content-end">
                      <label className="mb-0 pr-2">From</label>
                      <DatePicker
                        selected={location_from_date}
                        excludeOutOfBoundsTimes
                        className="form-control mr-3 w-100"
                        onChange={date => this.handleDateFromChange(date)}
                        showTimeSelect
                        timeFormat="p"
                        timeIntervals={15}
                        dateFormat="Pp"
                        minDate={location_initial_date}
                        maxDate={location_to_date}
                      />
                      <label className="ml-3 mb-0 pr-2">To</label>
                      <DatePicker
                        selected={location_to_date}
                        excludeOutOfBoundsTimes
                        className="form-control w-100"
                        onChange={date => this.handleDateToChange(date)}
                        showTimeSelect
                        timeFormat="p"
                        timeIntervals={15}
                        dateFormat="Pp"
                        minDate={location_from_date}
                        maxDate={location_today_date}
                      />
                    </div>

                  </div>


                  <div class="row">

                    <div class="col-md-9">

                      <Map
                        center={{ lat: 40.64, lng: -73.96 }}
                        zoom={12}
                        dynamickeyrequired={false}
                        googleMapURL={google_map_url}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `500px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        showmarker={this.state.markervalue}
                      // onClick={ this.clickonaddress()}
                      // onClick={() => this.clickonaddress(this.props.item.id)} 


                      />
                    </div>

                    <div class="col-md-3">
                      <h5>Location History</h5>
                      <div className="offender_location_height">
                        {locationhistory}
                        {historyLocationloading && <LocationLoader />}
                      </div>
                    </div>

                  </div>



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
            </section>
          </div>
        </section>


        <Footer />
      </div>
    )
  }

  componentDidMount() {
    const { location_from_date, location_to_date } = this.props;
    var offender_id = this.props.match.params.offender_id;
    var dataObject = { offender_id: offender_id };
    this.props.getoffender(dataObject);
    //  this.props.clickonaddress()

    var dataObject = { offender_id: offender_id, start_date_time: requestdataformat24(location_from_date), end_date_time: requestdataformat24(location_to_date) };
    this.props.getoffendersLocationHistory(dataObject);

  }

  redirectTOSupervisor(parole_officer_id) {
    if (parole_officer_id)
      this.props.history.push("/supervisors/" + parole_officer_id + "/details");
  }

  clickonaddress(item) {
    // alert(item.id)
    this.setState({ markervalue: item.id })
    // this.props.handleChange(item)
    //this.props.doSomething(item)
  }
  /* 
    handleChange = (i) => {
      const v = this.state.clicked_index;
      this.setState({ clicked_index: i, prev_clicked_index: v, marker_clicked_render: false });
  } */
  componentDidUpdate(prevProps, prevState) {
    // check whether client has 
    const { offender_location_lat, offender_location_lng, offender_location_address } = this.props;

    if (prevProps.offender_location_lat != offender_location_lat && offender_location_lat) {
      //this.props.getgoogleaddress(offender_location_lat, offender_location_lng);
    }
  }
  handleChange(date) {
    this.setState({
      startDate: date
    })
  }
  handleChange1(date) {
    this.setState({
      endDate: date
    })
  }
  datecalc() {
    let { startDate, endDate } = this.state;
    console.log(startDate);
    console.log(endDate);
    let amount = endDate.diff(startDate, 'days');
    /* const diffInMilliseconds = Math.abs(new Date('') - new Date('')); */
    this.setState({
      // ...this.state


      days: amount
    });
  }

  handleDateFromChange = (date) => {
    const { location_from_date, location_to_date } = this.props;
    var offender_id = this.props.match.params.offender_id;
    var data = { name: "location_from_date", value: date }
    var dataObject = { offender_id: offender_id, start_date_time: requestdataformat24(data.value), end_date_time: requestdataformat24(location_to_date) };
    this.props.setdates(data);
    this.props.getoffendersLocationHistory(dataObject);
  }

  handleDateToChange = (date) => {
    const { location_from_date, location_to_date } = this.props;
    var offender_id = this.props.match.params.offender_id;
    var data = { name: "location_to_date", value: date }
    var dataObject = { offender_id: offender_id, start_date_time: requestdataformat24(location_from_date), end_date_time: requestdataformat24(data.value) };
    this.props.setdates(data);
    this.props.getoffendersLocationHistory(dataObject);
  }

  redirectto_edit_offender() {
    const { offender_id } = this.props;
    if (offender_id) {
      this.props.history.push("/offenders/" + offender_id + "/edit");
    }
  }

}
function getDifferenceInDays(startDate, endDate) {
  const diffInMs = Math.abs(endDate - startDate);
  return diffInMs / (1000 * 60 * 60 * 24);

}

const mapStateToProps = state => {
  const { error, loading, group_id, offender_id, offender_lat, offender_location_lat, offender_location_lng, offender_location_address,
    bracelet_id, first_name, last_name, address, city, u_state, zipcode, email, phone1, phone2, phone3, mobile,
    supervisor, precinct_id, victim_first_name, victim_last_name, perimeters,
    home_zone, work_zone, restrict_zone, perimeter_size, bracelet_serial_number, image_url,
    location_from_date, location_to_date, location_today_date, location_initial_date,
    supervisor_address, supervisor_cell_number, supervisor_city, supervisor_email, supervisor_home_pone,
    supervisor_mobile, supervisor_state, supervisor_work_pone, supervisor_zip,
    supervisor_name, supervisor_phone, parole_officer_id,
    precinct_address, precinct_city, precinct_email, precinct_name, precinct_phone, precinct_state, precinct_zip,
    victim_fname, victim_lname, victim_mobile, case_number, case_id, location_history_data, historyLocationloading,
    curfew_from, curfew_to, curfew_time
  } = state.offender_details;
  console.log(getDifferenceInDays)
  const { user } = state.auth;
  return {
    error, loading, group_id, offender_id, offender_lat, offender_location_lat, offender_location_lng, offender_location_address,
    bracelet_id, first_name, last_name, address, city, u_state, zipcode, email, phone1, phone2, phone3, mobile,
    supervisor, precinct_id, victim_first_name, victim_last_name, perimeters,
    home_zone, work_zone, restrict_zone, perimeter_size, bracelet_serial_number, image_url,
    location_from_date, location_to_date, location_today_date, location_initial_date,
    supervisor_address, supervisor_cell_number, supervisor_city, supervisor_email, supervisor_home_pone, parole_officer_id,
    supervisor_mobile, supervisor_name, supervisor_state, supervisor_work_pone, supervisor_zip,
    supervisor_name, supervisor_phone,
    precinct_address, precinct_city, precinct_email, precinct_name, precinct_phone, precinct_state, precinct_zip, user,
    victim_fname, victim_lname, victim_mobile, case_number, case_id, location_history_data, historyLocationloading,
    curfew_from, curfew_to, curfew_time
  }
};

const mapDispatchToProps = dispatch => {

  return {
    getoffender: (input) => {
      dispatch(getoffender(input));
    }, getgoogleaddress: (lat, lng) => {
      dispatch(getgoogleaddress(lat, lng));
    }, getoffendersLocationHistory: (input) => {
      dispatch(getoffendersLocationHistory(input));
    }, setdates: (input) => {
      dispatch(setdates(input));
    }, page_refresh: () => {
      dispatch(page_refresh());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);



