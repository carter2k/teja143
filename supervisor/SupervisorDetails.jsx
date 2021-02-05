import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Header from '../commons/Header'
import Search from '../commons/Search'
import Footer from '../commons/Footer'
import { getsupervisor, reassignSupervisor, page_refresh } from '../redux/actions/SupervisorDetailsActions';
import { MENU, URL } from '../helpers/Constans';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../commons/Loading';
import { getallsupervisors } from '../redux/actions/SupervisorActions';
import ReAssignSupervisorConfirm from './ReAssginSupervisorConfirm'


class SupervisorDetails extends Component {
  constructor(props) {
    super(props)
    this.props.page_refresh();
  }

  render() {
    const {
      error, loading,
      first_name, last_name, address, city, u_state, zipcode, email, mobile, work_phone, cell_number, home_phone,
      mname, sex, race, date_of_birth, ethnicity, marital_status, SSN, OffendersList,
      precinct_id, precinct_name, precinct_phone, precinct_address, precinct_state, precinct_city, precinct_zip, precinct_email,
      precincts, user, supervisors
    } = this.props;
    let offender_data = [];

    var supervisor_list = [];
    supervisors.forEach((item, index) => {
      supervisor_list.push(
        <option key={index} value={item.id}>{item.fname}</option>
      )
    });

    OffendersList.forEach((item, index) => {
      offender_data.push(
        <div class="col-md-12">
          <form class="form_section py-3">
            <div class="form-group row mb-0">
              <div class="col-sm-3">
                <h5>{index == 0 ? 'Offender' : 'Offender ' + index}</h5>
              </div>

              <div class="col-sm-3">
                <div className="d-flex align-item-center">
                  <div className="img_circle">
                    {item.image_url ? <img src={item.image_url} /> :
                      <img src="assets/img/p_pic.png" />}
                  </div>

                  <p class="font-size-14 pl-3 mb-0">
                    <strong onClick={() => this.redirectTOoffender(item)}>
                      {item.status == 1 ? <a class="text_link">{item.fname} {item.lname}</a> : <a class="text_no_link">{item.fname} {item.lname}</a>}
                    </strong>
                    <br /> {item.mobile} <br /> {item.email}</p>
                </div>
              </div>

              {user && (user.role_id == 2) && <div class="col-sm-3">
                <div className="form-group row mb-0">
                  <h5>Supervisor</h5>
                  <select className="form-control" value={item.parole_officer_id} ref="supervisor" name="supervisor" onChange={(e) => this.handleChange(item, e)} id="search_by_event" >
                    {supervisor_list}
                  </select>
                </div>
              </div>}

              <div className="col-sm-3">
              </div>

            </div>
          </form>
        </div>
      )
    });
    return (
      <div>
        {loading && <Loader />}
        <Header />
        <ToastContainer />
        <ReAssignSupervisorConfirm />
        <div class="breadcrumb_talitrix">
          <div class="container">
            <div class="row">
              <div class="col">
                <div style={{ fontSize: '19px' }}>
                  <i class="fa fa-home"></i><span><Link to={URL.NAV_HOME} style={{ color: 'black' }}>&nbsp; Home&nbsp;</Link></span><span>
                    <i class="fa fa-angle-double-right"></i></span><span><Link to={URL.NAV_SUPERVISORS} style={{ color: 'black' }}>&nbsp; Supervisors&nbsp;</Link></span><span>
                    <i class="fa fa-angle-double-right"></i></span><span><a style={{ color: 'black' }}>&nbsp; Supervisor Details</a></span>
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
                  <h4 class="text-uppercase">{first_name}
                    <button className="btn btn-primary ml-4 btn-sm btn-dark">Supervisor</button>
                  </h4>
                </div>
                <div className="col-md-6 text-right" >
                  {user && (user.role_id == 2) && <button onClick={() => this.redirectto_edit_supervisor()} className="btn btn-primary btn-theme ml-4 btn-sm btn-dark">Edit</button>}
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
                        <h5>Supervisor</h5>
                      </div>

                      <div class="col-sm-3">
                        <p>Mobile: {mobile} <br />{home_phone ? 'Home:' : ''} {home_phone}</p>
                      </div>
                      <div class="col-sm-3">
                        <p>{address}<br />{city} <br /> {u_state}, {zipcode}</p>
                      </div>

                    </div>
                  </form>
                </div>

                {false && <div class="col-md-12">
                  <form class="form_section py-3">
                    <div class="form-group row mb-0">
                      <div class="col-sm-3">
                        <h5>Precinct</h5>
                      </div>
                      <div class="col-sm-3">
                        <p class="font-size-14 mb-0">{precinct_name} <br /> {precinct_phone} <br /> {precinct_email}</p>
                      </div>
                      <div class="col-sm-3">
                        <p class="font-size-14 mb-0"><strong>{precinct_address}</strong> <br />  {precinct_city}, {precinct_state} {precinct_zip}</p>
                      </div>
                    </div>
                  </form>
                </div>}

                {offender_data}
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
    var dataObject = { supervisor_id: supervisor_id };
    this.props.getsupervisor(dataObject);
  }

  redirectto_edit_supervisor() {
    const { id } = this.props;
    if (id) {
      this.props.history.push("/supervisors/" + id + "/edit");
    }
  }

  redirectTOoffender(item) {
    if (item.offender_id && (item.status == 1))
      this.props.history.push("/offenders/" + item.offender_id + "/details");
  }

  handleChange = (offender, e) => {
    const { options, selectedIndex } = e.target;
    var data = { offender: offender, supervisor_id: parseInt(e.target.value), supervisor_name: options[selectedIndex].innerHTML }
    this.props.reassignSupervisor(data);
  }

  componentDidUpdate(prevProps, prevState) {
    // check whether client has 
    const { id, page_reload } = this.props;

    if (prevProps.id !== id) {
      const dataObject = {
        search_by_string: "", search_by_alphabet: "",
        page_no: 1, page_limit: 0
      }
      if (id) {
        this.props.getSupervisors(dataObject);
      }
      if (page_reload) {
        setTimeout(() => {
          this.componentDidMount();
        }, 1000);
      }
    }
  }


}


const mapStateToProps = state => {
  const { error, loading, id,
    first_name, last_name, address, city, u_state, zipcode, email, mobile, work_phone, cell_number, home_phone,
    mname, sex, race, date_of_birth, ethnicity, marital_status, SSN,
    precinct_id, OffendersList, page_reload, dummy_reload_hint,
    precinct_name, precinct_phone, precinct_address, precinct_state, precinct_city, precinct_zip, precinct_email,
  } = state.supervisor_details;

  const { user } = state.auth;
  const { precincts } = state.groups_precinct;
  const { supervisors, page_limit } = state.groups_supervisor;
  return {
    error, loading, id,
    first_name, last_name, address, city, u_state, zipcode, email, mobile, work_phone, cell_number, home_phone,
    mname, sex, race, date_of_birth, ethnicity, marital_status, SSN, OffendersList, dummy_reload_hint,
    precinct_id, precinct_name, precinct_phone, precinct_address, precinct_state, precinct_city, precinct_zip, precinct_email,
    precincts, user, supervisors, page_reload, page_limit

  }
};

const mapDispatchToProps = dispatch => {

  return {
    getsupervisor: (input) => {
      dispatch(getsupervisor(input));
    }, getSupervisors: (input) => {
      dispatch(getallsupervisors(input));
    }, reassignSupervisor: (i) => {
      dispatch(reassignSupervisor(i));
    }, page_refresh: () => {
      dispatch(page_refresh());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SupervisorDetails);